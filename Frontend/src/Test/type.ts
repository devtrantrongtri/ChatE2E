import { PreKeyType, SignedPublicPreKeyType } from "@privacyresearch/libsignal-protocol-typescript";


interface userData {
    name : string;
    data : DeviceType;
}

interface KeyBundle {
    registrationId : number,
    identityPubKey : ArrayBuffer,
    signedPreKey : SignedPublicPreKeyType,
    oneTimePreKeys : PreKeyType<ArrayBuffer>
}
export interface DeviceType<T = ArrayBuffer> {
    identityKey: T;
    signedPreKey: SignedPublicPreKeyType<T>;
    preKey?: PreKeyType<T>;
    registrationId?: number;
}
export class ServerSignal {
    users: userData[] = [];

    storeKeyBundle(name: string, keyBundle: KeyBundle): void {
        // Find the index of the user in the array
        const userIndex = this.users.findIndex(user => user.name === name);

        // If the user exists, update their key bundle
        if (userIndex !== -1) {
            this.users[userIndex].data.identityKey = keyBundle.identityPubKey;
            this.users[userIndex].data.preKey = keyBundle.oneTimePreKeys;
            this.users[userIndex].data.registrationId = keyBundle.registrationId;
            this.users[userIndex].data.signedPreKey = keyBundle.signedPreKey;
        } else {
            // If the user does not exist, add them to the array
            const data1 : DeviceType = {
                identityKey: keyBundle.identityPubKey,
                signedPreKey: keyBundle.signedPreKey,
                preKey: keyBundle.oneTimePreKeys,
                registrationId: keyBundle.registrationId
            }
            this.users.push({
                name: name,
                data: data1
            });
        }
    }
}