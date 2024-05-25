import { KeyHelper, PreKeyType, SignedPublicPreKeyType } from "@privacyresearch/libsignal-protocol-typescript"
import { SignalProtocolStore } from "./signalprotocolStore"
import { getRandomValues, randomInt } from "crypto";
import { getRandomInt } from "./utils/getRandom";
    // store.put('registrationId', registrationId);
    // store.put(`25519KeypreKey${preKey.keyId}`, preKey.keyPair);
    // store.put(`25519KeysignedKey${signedPreKey.keyId}`, signedPreKey.keyPair);
export const createID = async (name: string, store: SignalProtocolStore,server : any) => {
    const registrationId = KeyHelper.generateRegistrationId()
    // storeSomewhereSafe(`registrationID`, registrationId)
    store.put(`registrationID`, registrationId);
  
    const identityKeyPair = await KeyHelper.generateIdentityKeyPair()
    // storeSomewhereSafe('identityKey', identityKeyPair)
    store.put(`identityKey`, identityKeyPair);
  
    const baseKeyId = getRandomInt(1,1000000)
    const preKey = await KeyHelper.generatePreKey(baseKeyId)
    store.storePreKey(`${baseKeyId}`, preKey.keyPair)
  
    const signedPreKeyId = getRandomInt(1,1000000)

    const signedPreKey = await KeyHelper.generateSignedPreKey(identityKeyPair, signedPreKeyId)
    store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair)
  
    // Now we register this with the server or other directory so all users can see them.
    // You might implement your directory differently, this is not part of the SDK.
  
    const publicSignedPreKey: SignedPublicPreKeyType = {
      keyId: signedPreKeyId,
      publicKey: signedPreKey.keyPair.pubKey,
      signature: signedPreKey.signature,
    }
  
    const publicPreKey: PreKeyType = {
      keyId: preKey.keyId,
      publicKey: preKey.keyPair.pubKey,
    }
  
    server.storeKeyBundle(name, {
      registrationId,
      identityPubKey: identityKeyPair.pubKey,
      signedPreKey: publicSignedPreKey,
      oneTimePreKeys: [publicPreKey],
    })

  }