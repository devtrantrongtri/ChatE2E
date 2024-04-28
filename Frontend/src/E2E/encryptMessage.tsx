var aesjs = require('aes-js');

export const getEncryptedMessage = (key:Uint8Array,message:string) =>{
    // The initialization vector (must be 16 bytes)
    const iv = key.slice(-16);
    let text = message;

    const textBytes = aesjs.utils.utf8.toBytes(text);
    // Tính số byte cần thêm vào để đảm bảo text là bội của 16.
    const blockSize = 16;
    const padding = blockSize - (textBytes.length % blockSize);
    // tạo mảng, và thêm vào các bit 0
    const paddedTextBytes = new Uint8Array(textBytes.length + padding);
    paddedTextBytes.set(textBytes);
    // thêm vào các bit 0
    for (let i = textBytes.length; i < paddedTextBytes.length; i++) {
        paddedTextBytes[i] = 0;
    }
    const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    const encryptedBytes = aesCbc.encrypt(paddedTextBytes);
    // To print or store the binary data, you may convert it to hex
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex

}