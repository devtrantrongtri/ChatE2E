
import { SignalProtocolStore } from "./signalprotocolStore";
import { createID } from "./CreateID";
import { ServerSignal } from "./type";
import { SessionBuilder, SessionCipher, SignalProtocolAddress } from "@privacyresearch/libsignal-protocol-typescript";


const server = new ServerSignal;
const store1 = new SignalProtocolStore;
const store2 = new SignalProtocolStore;

export const testFunction = async () => {
    const user1 = await createID("user1",store1,server);
    const user2 = await createID("user2",store2,server);
    console.log('Testing testFunction')
    console.log('server: ' , server.users)
    server.users.map((user) => console.log(user));
    console.log('store: ' , store1)
    startSessionEx()
}

const starterMessageBytes = Uint8Array.from([
    0xce, 0x93, 0xce, 0xb5, 0xce, 0xb9, 0xce, 0xac, 0x20, 0xcf, 0x83, 0xce, 0xbf, 0xcf, 0x85,
  ])
  
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
    const ciphertext = await senderSessionCipher.encrypt(starterMessageBytes.buffer)
    console.log("circular ciphertext : ",ciphertext);
    // The message is encrypted, now send it however you like.
    // sendMessage('boris', 'adalheid', ciphertext)
    
  }