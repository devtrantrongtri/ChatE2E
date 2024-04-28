var aesjs = require('aes-js');

export const getDecryptedMessage = (key: Uint8Array, encryptedHex: string) => {
    // trích 16 byte cuối làm khóa khởi tạo.
    const iv = key.slice(-16);
    
    // chuyển hex sang byte
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    

    const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    
    // Mã hóa 
    let decryptedBytes = aesCbc.decrypt(encryptedBytes);
    
    // Tìm padding chứa : (0x00)
    let paddingIndex = decryptedBytes.findIndex((byte: number) => byte === 0);
    
    // Xóa nếu tìm thấy
    if (paddingIndex !== -1) {
        decryptedBytes = decryptedBytes.slice(0, paddingIndex);
    }
    
    // Chuyển sang text (plaintext) 
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    
    return decryptedText;
};
