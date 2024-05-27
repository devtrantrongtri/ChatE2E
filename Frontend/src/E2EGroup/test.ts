import { SessionBuilder, SessionCipher, SignalProtocolAddress } from "@privacyresearch/libsignal-protocol-typescript";
import { getFromStore } from "./store";
import { SignalProtocolStore } from "./SignalProtocolStore";
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


const sender = '22H1120144'
const receipient = '22H1120145'
const text = "Stay safe home!";
const textBytes = new TextEncoder().encode(text); // Using TextEncoder which defaults to UTF-8
const starterMessageBytes = Uint8Array.from(
  textBytes
);
// Initialize the custom Signal Protocol store
const adiStore = new SignalProtocolStore();
console.log('adis',adiStore)

const test = async () => {
  console.log('Testing')
  const dataReceipient  = await getFromStore(receipient); 
  const dataSender = await getFromStore(sender); 
  // console.log('data of receipient: ' , dataReceipient)
  console.log(starterMessageBytes); 

  // Building a session 
  await startSessionWith(receipient);

}

const startSessionWith = async (receipientName : string) => {
  const receipientBundle = await getFromStore(receipientName);
        if (!receipientBundle) {
            console.error("No recipient bundle found for:", receipientName);
            return;
        }
    
  console.log("receipientBundle : " , receipientBundle)
  const recipientAddress = new SignalProtocolAddress(receipientName, 1);
  console.log("borisAddress :",recipientAddress.toString());
  const sessionBuilder = new SessionBuilder(adiStore, recipientAddress);
  console.log("sessionBuilder : " , sessionBuilder);
  await sessionBuilder.processPreKey(receipientBundle.storeKeyBundle);
  console.log("sessionBuilder : " , sessionBuilder);

} 






export default test