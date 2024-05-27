import { SignalProtocolStore } from "./signalprotocolStore";
import { createID } from "./CreateID";
import { ServerSignal } from "./type";
import { EncryptionResultMessageType, SessionBuilder, SessionCipher, SignalProtocolAddress } from "@privacyresearch/libsignal-protocol-typescript";

const server = new ServerSignal;
const store1 = new SignalProtocolStore;
const store2 = new SignalProtocolStore;

export const testFunction = async () => {
    const user1 = await createID("user1", store1, server);
    const user2 = await createID("user2", store2, server);
    console.log('Testing testFunction');
    console.log('server: ', server.users);
    server.users.map((user) => console.log(user));
    console.log('store: ', store1);

    const message1 = "Hello User2!";
    const message2 = "How are you today?";
    const message3 = "i'm ok!";

    const ciphertext1 = await sendEncryptedMessage(store1, server, "user2", message1);
    console.log("Encrypted message 1: ", ciphertext1);
    console.log("store1: ", store1);

    const plaintext1 = await receiveDecryptedMessage(store2, "user1", ciphertext1);
    console.log("Decrypted message 1: ", plaintext1);
    console.log("store2: ", store2);


    const ciphertext2 = await sendEncryptedMessage(store1, server, "user2", message2);
    console.log("Encrypted message 2: ", ciphertext2);
    console.log("store1: ", store1);


    const plaintext2 = await receiveDecryptedMessage(store2, "user1", ciphertext2);
    console.log("Decrypted message 2: ", plaintext2);
    console.log("store2: ", store2);

    const ciphertext3 = await sendEncryptedMessage(store2, server, "user1", message3);
    console.log("Encrypted message 3: ", ciphertext3);
    console.log("store1: ", store2);


    const plaintext3 = await receiveDecryptedMessage(store1, "user2", ciphertext3);
    console.log("Decrypted message 3: ", plaintext3);
    console.log("store2: ", store1);

}

async function sendEncryptedMessage(store : any, server : any, recipientName : any, message : any) {
    const recipientBundle = server.getKeyBundle(recipientName);
    const recipientAddress = new SignalProtocolAddress(recipientName, 1);

    const sessionBuilder = new SessionBuilder(store, recipientAddress);
    await sessionBuilder.processPreKey(recipientBundle);

    const sessionCipher = new SessionCipher(store, recipientAddress);
    const messageBytes = new TextEncoder().encode(message);
    const ciphertext = await sessionCipher.encrypt(messageBytes.buffer);

    return ciphertext;
}

async function receiveDecryptedMessage(store : any, senderName : any, ciphertext : any) {
    const senderAddress = new SignalProtocolAddress(senderName, 1);
    const sessionCipher = new SessionCipher(store, senderAddress);

    const plaintextArrayBuffer = await sessionCipher.decryptPreKeyWhisperMessage(ciphertext.body, 'binary');
    const plaintext = new TextDecoder().decode(new Uint8Array(plaintextArrayBuffer));

    return plaintext;
}
