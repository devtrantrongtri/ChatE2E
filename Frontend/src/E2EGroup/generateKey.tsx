import * as libsignal from '@privacyresearch/libsignal-protocol-typescript'
import { getFromStore, saveToStore } from './store';
import { SignalProtocolStore } from './SignalProtocolStore';

interface KeyPairType {
    pubKey: ArrayBuffer;
    privKey: ArrayBuffer;
}

interface SignedPublicPreKeyType {
    keyId: number;
    publicKey: ArrayBuffer;
    signature: ArrayBuffer;
}

interface PreKeyType {
    keyId: number;
    publicKey: ArrayBuffer;
}

interface BeginData {
    registrationId: number;
    identityKeyPair: KeyPairType;
    preKey: PreKeyType;
    signedPreKey: SignedPublicPreKeyType;
}

interface StoreKeyBundle {
    registrationId: number;
    identityKey: ArrayBuffer;
    signedPreKey: SignedPublicPreKeyType;
    oneTimePreKeys: PreKeyType[];
}

interface KeyData {
    beginData: BeginData;
    storeKeyBundle: StoreKeyBundle;
}

// const store = new SignalProtocolStore();

export const generateKeyGroup = async (username: string) => {
    const registrationId = libsignal.KeyHelper.generateRegistrationId();
    const identityKeyPair = await libsignal.KeyHelper.generateIdentityKeyPair();
    const preKey = await libsignal.KeyHelper.generatePreKey(registrationId);
    const signedPreKey = await libsignal.KeyHelper.generateSignedPreKey(identityKeyPair, registrationId);

    const publicSignedPreKey: libsignal.SignedPublicPreKeyType = {
        keyId: registrationId,
        publicKey: signedPreKey.keyPair.pubKey,
        signature: signedPreKey.signature
    };

    const publicPreKey: libsignal.PreKeyType = {
        keyId: preKey.keyId,
        publicKey: preKey.keyPair.pubKey
    };

    const data: KeyData = {
        beginData: {
            registrationId,
            identityKeyPair: {
                pubKey: identityKeyPair.pubKey,
                privKey: identityKeyPair.privKey
            },
            preKey: {
                keyId: preKey.keyId,
                publicKey: preKey.keyPair.pubKey
            },
            signedPreKey: {
                keyId: signedPreKey.keyId,
                publicKey: signedPreKey.keyPair.pubKey,
                signature: signedPreKey.signature
            }
        },
        storeKeyBundle: {
            registrationId,
            identityKey: identityKeyPair.pubKey,
            signedPreKey: publicSignedPreKey,
            oneTimePreKeys: [publicPreKey],
        }
    };

    // // Save the data to the SignalProtocolStore
    // store.put('identityKey', identityKeyPair);
    // store.put('registrationId', registrationId);
    // store.put(`25519KeypreKey${preKey.keyId}`, preKey.keyPair);
    // store.put(`25519KeysignedKey${signedPreKey.keyId}`, signedPreKey.keyPair);

    // Save the store to IndexedDB
    await saveToStore(username, data);

    return {
        registrationId,
        identityKeyPair,
        preKey,
        signedPreKey,
        username,
        pubKey: identityKeyPair.pubKey,
        privKey: identityKeyPair.privKey,
    };
};











/*
import * as libsignal from '@privacyresearch/libsignal-protocol-typescript'
import { getFromStore, saveToStore } from './store';
import { SignalProtocolStore } from './SignalProtocolStore';
interface KeyPairType {
    pubKey: ArrayBuffer;
    privKey: ArrayBuffer;
}

interface SignedPublicPreKeyType {
    keyId: number;
    publicKey: ArrayBuffer;
    signature: ArrayBuffer;
}

interface PreKeyType {
    keyId: number;
    publicKey: ArrayBuffer;
}

interface BeginData {
    registrationId: number;
    identityKeyPair: KeyPairType;
    preKey: PreKeyType;
    signedPreKey: SignedPublicPreKeyType;
}

interface StoreKeyBundle {
    registrationId: number;
    identityKey: ArrayBuffer;
    signedPreKey: SignedPublicPreKeyType;
    oneTimePreKeys: PreKeyType[];
}

interface KeyData {
    beginData: BeginData;
    storeKeyBundle: StoreKeyBundle;
}
const store = new SignalProtocolStore();
export const generateKeyGroup = async (username : string) => {
    const registrationId = libsignal.KeyHelper.generateRegistrationId();
    const identityKeyPair = await libsignal.KeyHelper.generateIdentityKeyPair();
    const preKey = await libsignal.KeyHelper.generatePreKey(registrationId);
    const signedPreKey = await libsignal.KeyHelper.generateSignedPreKey(identityKeyPair, registrationId);
    // save to store
    const publicSignedPreKey : libsignal.SignedPublicPreKeyType = {
        keyId : registrationId, // thay thế cho signedPrekeyId
        publicKey : signedPreKey.keyPair.pubKey, // thay th
        signature : signedPreKey.signature
    }
    
    const publicPreKey : libsignal.PreKeyType = {
        keyId : preKey.keyId, 
        publicKey : preKey.keyPair.pubKey
    }


    const data : KeyData = {
        beginData: {
            registrationId,
            identityKeyPair: {
                pubKey: identityKeyPair.pubKey,
                privKey: identityKeyPair.privKey
            },
            preKey: {
                keyId: preKey.keyId,
                publicKey: preKey.keyPair.pubKey
            },
            signedPreKey: {
                keyId: signedPreKey.keyId,
                publicKey: signedPreKey.keyPair.pubKey,
                signature: signedPreKey.signature
            }
        },
        storeKeyBundle : {
            registrationId,
            identityKey : identityKeyPair.pubKey,
            signedPreKey : publicSignedPreKey, 
            oneTimePreKeys : [publicPreKey],
        }
    }
    await saveToStore(username,data );




    // get from store
    // const dataFromIndexDb = await getFromStore(username); 
    



    
    // console.log("KeyBundle :",dataFromIndexDb);
    return {
        registrationId,
        identityKeyPair,
        preKey,
        signedPreKey,
        username,
        pubKey: identityKeyPair.pubKey,
        privKey: identityKeyPair.privKey,
    }
};


*/ 