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

export function saveToStore(userName: string, KeyBundle: KeyData): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const request = indexedDB.open('Group', 3); // Opening the database

        request.onerror = () => {
            reject(new Error('Failed to open connection to IndexedDB'));
        };

        // Ensure the correct object store is created
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains('KeyBundle')) { // Ensure the store is named correctly
                db.createObjectStore('KeyBundle'); // Create the store if it does not exist
            }
        };

        request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            
            // Check if the correct store exists when opening the connection
            if (!db.objectStoreNames.contains('KeyBundle')) {
                reject(new Error('Object store KeyBundle not found'));
                return;
            }
            
            // Proceed with adding data to the correct object store
            const transaction = db.transaction('KeyBundle', 'readwrite');
            const store = transaction.objectStore('KeyBundle');
            const addRequest = store.add(KeyBundle, userName);

            addRequest.onsuccess = () => {
                resolve();
            };
            // addRequest.onerror = () => {
            //     reject(new Error('Failed to add KeyBundle to IndexedDB'));
            // };
        };
    });
}


export function getFromStore(userName: string): Promise<KeyData> {
    return new Promise<KeyData>((resolve, reject) => {
        // Mở kết nối với IndexedDB
        const request = indexedDB.open('Group', 3);
        
        // Xử lý sự kiện mở kết nối
        request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction('KeyBundle', 'readonly');
            const store = transaction.objectStore('KeyBundle');
            
            // Lấy encryptedHex từ object store dựa trên userName
            const getRequest = store.get(userName.toString());
            getRequest.onsuccess = () => {
                const encryptedHex: KeyData = getRequest.result;
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