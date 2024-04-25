import { randomBytes } from "crypto"
const secp256r1 = require('secp256r1')
var aesjs = require('aes-js');
// generate privKey
// return a random private key bytes
export default function  generateKeyKeyAndSaveToIndexDb (hashPassword:string,userName:string,)  {
    // Sinh khóa ECC 256 bits
    let privKey = generateValidPrivateKey();

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

    const encrypted = async () =>  await getEncryptedHexFromIndexedDB(userName);
    encrypted().then(res => {
        console.log('Private Key Hash :',res);
    })
    
}

// =========================== function =========================

// Hàm sinh khóa ngẫu nhiên và kiểm tra tính hợp lệ
function generateValidPrivateKey(): Buffer {
    let privKey: Buffer;
    do {
        privKey = randomBytes(32);
    } while (!secp256r1.privateKeyVerify(privKey));
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
