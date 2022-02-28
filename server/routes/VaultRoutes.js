import express from "express";

import {VaultHome, VaultCreate, VaultCreateIndex, VaultSiteData, VaultDecrypt, VaultEncrypt, recordDelete, recordEdit, deleteFullVault, deleteAccount} from "../controllers/VaultControllers.js"
const router = express.Router();

// All statrting with /api
router.get('/vault-home', VaultHome);
router.get('/vault-create', VaultCreateIndex);

router.get('/vault-data/', VaultSiteData)
router.post('/vault-create', VaultCreate);
router.post('/vault-decrypt-password', VaultDecrypt);
router.post('/vault-encrypt-password', VaultEncrypt);
router.patch('/record-edit/:siteId', recordEdit);
router.delete('/record-delete/:siteId', recordDelete);
router.delete('/delete-all-vault', deleteFullVault);
router.delete('/delete-account', deleteAccount);

export default router;
