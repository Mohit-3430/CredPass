import {Site} from "../Models/site.js"
import {encrypt, decrypt} from "../configs/EncryptionHandler.js"

// GET api/vault-home
export const VaultHome = (req, res) =>{
    res.status(201).json({sucess:true, msg:"Hi There from Vault Home"});
}

// POST api/vault-create
export const VaultCreate = async(req, res) =>{
    const {siteName, uname, password } = req.body;
    
    const encryptedPassword = encrypt(password);

    const site = new Site({
        siteName: siteName,
        uname: uname,
        password: encryptedPassword
        // iv : encryptedPassword.iv
    });
    
    try {
        await site.save();
        await Site.findOneAndUpdate({siteName: siteName}, { user : req.user.sub})
        res.status(200).json({sucess:true, msg : "Added"})
    }catch (err) {
        res.status(401).json({sucess:false, msg:"An error Ocurred!"})
        console.log(err)
    }
}

// GET api/vault-home
export const VaultCreateIndex = (req, res)=>{
    res.status(201).json({sucess:true, msg:"From Create Vault Route"})
}

// GET api/vault-data
export const VaultSiteData = async (req, res) =>{
    
    try {
        const sites = await Site.find({user : req.user.sub}).lean();
        // console.log(sites)
        res.status(200).json({success:true, sites: sites, user:req.user.sub})
    } catch (err) {
        res.status(404).json({success:false, msg:"An error Occured"})
    } 
}

// POST api/vault-decrypt-password
export const VaultDecrypt = (req, res) =>{
    try{
        let password = req.body.siteObj.password;
        res.send(decrypt(password))
    } catch {
        
    }
}

// POST api/vault-encrypt-password
export const VaultEncrypt = (req, res) =>{
    try{
        let password = req.body.siteObj.password;
        res.send(encrypt(password))
    } catch {
           
    }
}

// PATCH api/record-edit
export const recordEdit = async(req, res) =>{
    const siteId = req.params.siteId;
    const updates = req.body;
    const options = {new:true};
    try {
        const site = await Site.findByIdAndUpdate(siteId, updates, options);
        if(!site) throw error;
        res.status(200).send(site);
    } catch (error) {
        res.status(404).json({"success":false, "msg":"No Record Found"})
    }
}
// DELETE api/record-delete
export const recordDelete = async (req, res) =>{
    const siteId = req.params.siteId;

    try {
        const site = await Site.findByIdAndDelete(siteId)
        if(!site) throw error;
        res.status(200).json({"success":true, "msg":"record deleted!"})
    } catch (error) {
        res.status(404).json({"success":false, "msg":"Record Not Found!"})   
    }
}