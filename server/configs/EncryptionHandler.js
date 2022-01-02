import dotenv from "dotenv";
dotenv.config();

import Cryptr from "cryptr"

const key = process.env.CRYPTO_SECRET
const cryptr = new Cryptr(key);

export const encrypt = inputPassword => {

    return  cryptr.encrypt(inputPassword);
}

export const decrypt = outputPassword =>{
    
    return cryptr.decrypt(outputPassword);
}

