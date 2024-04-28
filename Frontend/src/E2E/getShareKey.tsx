import { deriveSharedSecret, getPrivateKeyHex } from "./generateKey";

const secp256k1 = require('secp256k1')
var aesjs = require('aes-js');

export  const getSharedKey = async (orderId:any) => {
    console.log("orderId: ", orderId);
    try {
        const response = await fetch(`http://localhost:4041/users/authen`,{credentials: 'include'});
        console.log("data:",response);    
        if (!response.ok) {
            throw new Error('Failed to fetch users authentication');
        }else{
            const data = await response.json();
            const {user} = data;
            console.log("user:",user);
            const {userName, hashPassword} = user;
            console.log("userName:",userName, "hash:",hashPassword);
            const privKey = await getPrivateKeyHex(userName, hashPassword);
            const response2 = await fetch(`http://localhost:4041/users/getInForUser/${orderId}`,{credentials: 'include'});
            if (!response2.ok) {
                throw new Error('Failed to fetch users authentication');
            }else{
                const ortherUser = await response2.json();
                const ortherPublic = Buffer.from(ortherUser.pubKey, 'base64');//Uint8Array.from(ortherUser.pubKey);
                console.log("ortherPublic:",ortherPublic);

                const sharedKey = deriveSharedSecret(privKey,ortherPublic)
                console.log("sharedKey:",sharedKey);
                return sharedKey
            }
        }
    } catch (error) {
        console.log(error)
    }
};