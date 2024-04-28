import { randomBytes } from "crypto"
const secp256k1 = require('secp256k1')

// const secp256k1 = require('secp256r1')
var aesjs = require('aes-js');
// generate privKey
// return a random private key bytes
export default function  generateKeyKeyAndSaveToIndexDb (hashPassword:string,userName:string,)  {
    // Sinh khóa ECC 256 bits
    let privKey = generateValidPrivateKey();
    console.log("PrivateKey:",privKey);
    const last16Bytes = getLast16BytesFromHash(hashPassword);
    
    // Mã hóa private key bằng AES 128 CTR (key là 16 ký tự cuối Hashpassword)
    // Lưu vào indexDb.
    
    var key = Array.from(last16Bytes);
   
    // 
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(1));
    var encryptedKeyBytes = aesCtr.encrypt(privKey);
    
    // 
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedKeyBytes);
    // console.log(encryptedHex);

    // Lưu vào indexDb.
    saveEncryptedHexToIndexedDB(userName,encryptedHex)

    // const encrypted = async () =>  await getEncryptedHexFromIndexedDB(userName);
    // encrypted().then(res => {
    //     console.log('Private Key Hash :',res);
    // })
    
}

// =========================== function =========================

// Hàm sinh khóa ngẫu nhiên và kiểm tra tính hợp lệ
function generateValidPrivateKey(): Buffer {
    let privKey: Buffer;
    do {
        privKey = randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privKey));
    return privKey;
}

function getLast16BytesFromHash(hashPassword: any): Buffer {
    const hashBytes = Buffer.from(hashPassword, 'utf8');
    const last16Bytes = Buffer.alloc(16);
    hashBytes.copy(last16Bytes, 0, hashBytes.length - 16);
    return last16Bytes;
}

function saveEncryptedHexToIndexedDB(userName: string, encryptedHex: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        // Mở kết nối với IndexedDB
        const request = indexedDB.open('myDatabase', 1);
        
        // Xử lý sự kiện mở kết nối
        request.onerror = () => {
            reject(new Error('Failed to open connection to IndexedDB'));
        };

        // Xử lý sự kiện nâng cấp cơ sở dữ liệu (nếu cần)
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains('encryptedHexStore')) {
                db.createObjectStore('encryptedHexStore');
            }
        };

        // Xử lý sự kiện thành công khi mở kết nối
        request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            
            // Kiểm tra xem  dữ liệu đã được tạo thành công chưa
            if (!db.objectStoreNames.contains('encryptedHexStore')) {
                reject(new Error('Object store encryptedHexStore not found'));
                return;
            }
            
            // Tiến hành thực hiện giao dịch
            const transaction = db.transaction('encryptedHexStore', 'readwrite');
            const store = transaction.objectStore('encryptedHexStore');
            
            // Thêm encryptedHex vào object store với userName là khóa chính
            const addRequest = store.add(encryptedHex, userName);
            addRequest.onsuccess = () => {
                resolve();
            };
            addRequest.onerror = () => {
                reject(new Error('Failed to add encryptedHex to IndexedDB'));
            };
        };
    });
}


// Hàm lấy encryptedHex từ IndexedDB dựa trên userName
export function getEncryptedHexFromIndexedDB(userName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        // Mở kết nối với IndexedDB
        const request = indexedDB.open('myDatabase', 1);
        
        // Xử lý sự kiện mở kết nối
        request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction('encryptedHexStore', 'readonly');
            const store = transaction.objectStore('encryptedHexStore');
            
            // Lấy encryptedHex từ object store dựa trên userName
            const getRequest = store.get(userName.toString());
            getRequest.onsuccess = () => {
                const encryptedHex: string = getRequest.result;
                if (encryptedHex !== undefined) {
                    resolve(encryptedHex);
                } else {
                    reject(new Error(`EncryptedHex not found in IndexedDB for userName: ${userName}`));
                }
            };
            getRequest.onerror = () => {
                reject(new Error('Failed to get encryptedHex from IndexedDB'));
            };
        };

        // Xử lý sự kiện lỗi khi mở kết nối
        request.onerror = () => {
            reject(new Error('Failed to open connection to IndexedDB'));
        };
    });
}


export async function getPublicKeyHex(userName: string, hashPassword: string) {
    const encryptedKeyHex = await getEncryptedHexFromIndexedDB(userName);
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedKeyHex);   
    const last16Bytes = getLast16BytesFromHash(hashPassword);
    const key = Array.from(last16Bytes);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(1));
    const decryptedKeyBytes = aesCtr.decrypt(encryptedBytes);
    console.log("Private key test:",decryptedKeyBytes);
    // console.log("getPublicKeyByte:","encryptedKeyHex:",encryptedKeyHex ,"publicKeyBytes:" , decryptedKeyBytes)
    const pubKey = secp256k1.publicKeyCreate(Buffer.from(decryptedKeyBytes));
    return pubKey
}
export async function getPrivateKeyHex(userName: string, hashPassword: string): Promise<Uint8Array> {
    const encryptedKeyHex = await getEncryptedHexFromIndexedDB(userName);
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedKeyHex);   
    const last16Bytes = getLast16BytesFromHash(hashPassword);
    const key = Array.from(last16Bytes);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(1));
    const priKeyByte = aesCtr.decrypt(encryptedBytes);
    console.log("Private key test:",priKeyByte);
    return priKeyByte
}

// Hàm tạo khóa chung từ public key B và private key A
// own and order phải là Uint8Array
export function deriveSharedSecret(ownPrivKey:Uint8Array, otherPubKey:Uint8Array) {
    const sharedSecret = secp256k1.ecdh(otherPubKey, ownPrivKey)
    return sharedSecret
  }






// // Example usage:

// // // generate key pairs for each user

// const userA = {
//     privKey: new Uint8Array([117, 100, 117, 84, 190, 184, 212, 12, 22, 150, 92, 113, 20, 40, 51, 254, 93, 243, 68, 121, 182, 64, 250, 143, 186, 203, 112, 110, 228, 77, 157, 146]),
//     pubKey: new Uint8Array([2, 39, 211, 141, 143, 114, 192, 92, 126, 124, 45, 62, 72, 16, 159, 59, 28, 110, 219, 230, 8, 106, 250, 69, 189, 233, 14, 100, 12, 193, 163, 119, 26])
// }
// const userB = {
//     privKey: new Uint8Array([169, 20, 9, 55, 206, 191, 130, 61, 98, 201, 96, 146, 9, 200, 45, 69, 157, 144, 29, 138, 77, 100, 17, 146, 15, 247, 105, 124, 148, 42, 188, 34]),
//     pubKey: new Uint8Array([2, 216, 247, 115, 223, 132, 76, 71, 206, 244, 203, 239, 184, 119, 252, 63, 53, 3, 225, 199, 83, 90, 145, 92, 85, 212, 212, 222, 118, 71, 135, 23, 167])
// }

// // // derive the shared secrets
// const sharedSecretA = deriveSharedSecret(userA.privKey, userB.pubKey)
// const sharedSecretB = deriveSharedSecret(userB.privKey, userA.pubKey)


// console.log('Shared Secret A:', sharedSecretA)
// console.log('Shared Secret B:', sharedSecretB)

// // Check if the shared secrets are the same
// console.log('Shared secrets match:', sharedSecretA.toString('hex') === sharedSecretB.toString('hex'))
// export function generateSharedKey() {
//     // Tạo khóa chung
//     // PublicKey của client B và PrivateKey của client A
//     const publicKeyB = Buffer.from([3, 138, 57, 30, 44, 32, 197, 215, 120, 169, 230, 125, 29, 105, 162, 236, 33, 115, 165, 108, 102, 49, 33, 91, 152, 86, 188, 157, 189, 237, 107, 139, 90]);
//     const privateKeyA = Buffer.from([92, 116, 108, 137, 112, 20, 208, 56, 106, 111, 24, 241, 169, 45, 17, 101, 188, 224, 149, 211, 104, 167, 37, 5, 92, 248, 10, 229, 166, 175, 89, 63]);
//     console.log(publicKeyB,"and Private A:", privateKeyA);    
//     // const publicKeyA = Buffer.from([2, 146, 250, 99, 110, 223, 94, 49, 253, 4, 66, 233, 248, 155, 147, 74, 0, 58, 162, 247, 137, 79, 186, 67, 207, 218, 33, 35, 230, 106, 80, 70, 131]);
//     // const privateKeyB = Buffer.from([147, 68, 82, 3, 106, 7, 219, 189, 174, 134, 110, 124, 10, 134, 4, 84, 141, 133, 195, 162, 135, 33, 42, 36, 71, 46, 203, 13, 68, 24, 8, 120]);
//     // const sharedKey = secp256r1.ecdh(publicKeyB, privateKeyA);
//     const sharedKey = secp256k1.ecdh(publicKeyB,privateKeyA)
//     // const sharedKey = secp256r1.ecdh(publicKeyA, privateKeyB);
//     // Trả về khóa chung
//     console.log("generateSharedKey:",sharedKey);
//     return sharedKey;
// }