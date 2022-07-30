import { Site } from "../../../Models/site.js";
import { decrypt } from "../../../configs/EncryptionHandler.js"


// GET /api/export-vault-data
export const exportData = async (req, res) => {
    try {
        Site.find({ user: req.user.sub }, 'siteUrl uname password', function (err, doc) {
            if (err) {
                console.log(err);
                res.status(404).json({ success: false, msg: "error occured!" });
            }
            else {
                for (let i = 0; i < doc.length; i++) {
                    doc[i].password = decrypt(doc[i].password);
                }
                const finalData = JSON.stringify(doc, null, 2);
                res.status(200).send(finalData);
            }
        })
    } catch (err) {
        console.log(err);
    }
}