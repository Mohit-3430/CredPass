import express from "express";
import passport from "passport"

import {VaultHome, VaultCreate, VaultCreateIndex, VaultSiteData, VaultDecrypt, VaultEncrypt} from "../controllers/VaultControllers.js"
const router = express.Router();

// All statrting with /api
router.get('/vault-home', passport.authenticate('jwt', {session:false}) ,VaultHome);
router.get('/vault-create', passport.authenticate('jwt', {session:false}) , VaultCreateIndex);

router.get('/vault-data/', passport.authenticate('jwt', {session:false}), VaultSiteData)
router.post('/vault-create', passport.authenticate('jwt', {session:false}) , VaultCreate);
router.post('/vault-decrypt-password', passport.authenticate('jwt', {session:false}), VaultDecrypt)
router.post('/vault-encrypt-password', passport.authenticate('jwt', {session:false}), VaultEncrypt)

export default router;
