import { Website, Card } from "../../../Models/index.js";
import { decrypt } from "../../../configs/EncryptionHandler.js"


// GET /api/export-vault-data
export const exportData = async (req, res) => {
    // try {
    //     Vault.find({ owner: req.user.sub }, 'websiteUrl websiteUname websitePassword', function (err, doc) {
    //         if (err) {
    //             console.log(err);
    //             res.status(404).json({ success: false, msg: "error occured!" });
    //         }
    //         else {
    //             for (let i = 0; i < doc.length; i++) {
    //                 doc[i].websitePassword = decrypt(doc[i].websitePassword);
    //             }
    //             const finalData = JSON.stringify(doc, null, 2);
    //             res.status(200).send(finalData);
    //         }
    //     })
    // } catch (err) {
    //     console.log(err);
    // }
}