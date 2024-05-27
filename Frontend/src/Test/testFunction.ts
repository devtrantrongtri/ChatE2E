
import { SignalProtocolStore } from "./signalprotocolStore";
import { createID } from "./CreateID";
import { ServerSignal } from "./type";
import { EncryptionResultMessageType, SessionBuilder, SessionCipher, SignalProtocolAddress } from "@privacyresearch/libsignal-protocol-typescript";


const server = new ServerSignal;
const store1 = new SignalProtocolStore;
const store2 = new SignalProtocolStore;
let ciphertext : any
export const testFunction = async () => {
    const user1 = await createID("user1",store1,server);
    const user2 = await createID("user2",store2,server);
    console.log('Testing testFunction')
    console.log('server: ' , server.users)
    server.users.map((user) => console.log(user));
    console.log('store: ' , store1)
    startSessionEx()
    console.log("plaintext: " , secretMessage1)
}

const starterMessageBytes = Uint8Array.from([
    0xce, 0x93, 0xce, 0xb5, 0xce, 0xb9, 0xce, 0xac, 0x20, 0xcf, 0x83, 0xce, 0xbf, 0xcf, 0x85,
  ])
  const secretMessage1 = new TextDecoder().decode(new Uint8Array(starterMessageBytes))
  
  const startSessionEx = async () => {
    // giả định khóa lấy từ server cho boris
    const borisBundle = server.users[1].data;
    // giả địa chỉ cho address
    const borisAddress = new SignalProtocolAddress('user2',1);
    const recipientAddress = borisAddress;

    // build session
    const sessionBuilder = new SessionBuilder(store1,recipientAddress);
    await sessionBuilder.processPreKey(borisBundle)
    // Now we can encrypt a messageto get a MessageType object
    const senderSessionCipher = new SessionCipher(store1, recipientAddress)
    ciphertext = await senderSessionCipher.encrypt(starterMessageBytes.buffer)
    console.log("circular ciphertext : ",ciphertext);

    // The message is encrypted, now send it however you like.
    // sendMessage('boris', 'adalheid', ciphertext)

    
  }
  export const testD = async () =>  {
    // giả định khóa lấy từ server cho boris
    const borisBundle = server.users[1].data;
    // giả địa chỉ cho address
    const borisAddress = new SignalProtocolAddress('user2',1);
    const recipientAddress = borisAddress;
    const address = new SignalProtocolAddress('user2',1)
    const senderSessionCipher = new SessionCipher(store2, address)
    let plaintext: ArrayBuffer;   
    plaintext = await senderSessionCipher.decryptPreKeyWhisperMessage(ciphertext.body, 'binary')
    const secretMessage = new TextDecoder().decode(new Uint8Array(plaintext))
    console.log("plaintext : ",secretMessage);
  }
