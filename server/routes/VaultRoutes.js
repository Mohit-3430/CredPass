import express from "express";
import passport from "passport"

import {VaultHome, VaultCreate, VaultCreateIndex, VaultSiteData, VaultDecrypt, VaultEncrypt, recordDelete, recordEdit} from "../controllers/VaultControllers.js"
const router = express.Router();

// All statrting with /api
router.get('/vault-home', passport.authenticate('jwt', {session:false}) ,VaultHome);
router.get('/vault-create', passport.authenticate('jwt', {session:false}) , VaultCreateIndex);

router.get('/vault-data/', passport.authenticate('jwt', {session:false}), VaultSiteData)
router.post('/vault-create', passport.authenticate('jwt', {session:false}) , VaultCreate);
router.post('/vault-decrypt-password', passport.authenticate('jwt', {session:false}), VaultDecrypt);
router.post('/vault-encrypt-password', passport.authenticate('jwt', {session:false}), VaultEncrypt);
router.patch('/record-edit/:siteId', passport.authenticate('jwt', {session:false}), recordEdit);
router.delete('/record-delete/:siteId', passport.authenticate('jwt', {session:false}), recordDelete);

export default router;
