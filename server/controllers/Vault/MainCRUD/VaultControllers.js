import { Website, Card, User } from "../../../Models/index.js"

// GET api/vault-home
export const VaultGeneral = (req, res) => {
    res.status(201).json({ sucess: true, msg: "Hi There from Vault Home" });
}

// POST api/vault-create
export const VaultCreate = async (req, res) => {
    const { card, website } = req.body;

    if (website) {
        const siteDoc = new Website({
            websiteName: website.websiteName,
            websiteUrl: website.websiteUrl,
            websiteUname: website.websiteUname,
            websitePassword: website.websitePassword,
            owner: req.user.sub,
        })
        try {
            const savedDoc = await siteDoc.save();
            const pushData = {
                item_type: "WEBSITE",
                website_id: savedDoc._id
            }
            const user = await User.findById(req.user.sub)
            user.vault_own.push(pushData);
            user.save()
            res.status(200).json({ sucess: true, msg: "Added" })
        }
        catch (err) {
            console.log(err)
            res.status(401).json({ sucess: false, msg: "An error Ocurred!" })
        }
    }
    else if (card) {
        const cardDoc = new Card({
            cardName: card.cardName,
            cardHolderName: card.cardHolderName,
            cardBrand: card.cardBrand,
            cardNumber: card.cardNumber,
            cardExpirationDate: card.cardExpirationDate,
            cardCVV: card.cardCVV,
            owner: req.user.sub
        })
        try {
            const savedDoc = await cardDoc.save();
            const pushData = {
                item_type: "CARD",
                card_id: savedDoc._id
            }
            const user = await User.findById(req.user.sub)
            user.vault_own.push(pushData);
            user.save();
            res.status(200).json({ sucess: true, msg: "Added" })
        } catch (err) {
            console.log(err)
            res.status(401).json({ sucess: false, msg: "An error Ocurred!" })
        }
    }
}

// GET api/vault-home
export const VaultCreateIndex = (req, res) => {
    res.status(201).json({ sucess: true, msg: "From Create Vault Route" })
}

// GET api/vault-data
export const VaultSiteData = async (req, res) => {

    try {
        const webSites = await Website.find({ owner: req.user.sub });
        const cards = await Card.find({ owner: req.user.sub })
        res.status(200).json({ success: true, websites: webSites, cards: cards, user: req.user.sub })
    } catch (err) {
        console.log(err)
        res.status(404).json({ success: false, msg: "An error Occured" })
    }
}

// PATCH api/record-edit
export const recordEdit = async (req, res) => {
    const siteId = req.params.siteId;
    const updates = req.body;
    const options = { new: true };
    try {
        const site = await Site.findByIdAndUpdate(siteId, updates, options);
        if (!site) throw error;
        res.status(200).send(site);
    } catch (error) {
        res.status(404).json({ "success": false, "msg": "No Record Found" })
    }
}
// DELETE api/record-delete
export const recordDelete = async (req, res) => {
    const recordId = req.params.id;
    try {

        const userDoc = await User.findById(req.user.sub)
        let type = "";
        // console.log(recordId == userDoc.vault_own[0].website_id)

        for (let i = 0; i < userDoc.vault_own.length; i++) {
            if (recordId == userDoc.vault_own[i].website_id) {
                type = "WEBSITE"
                break;
            }
            else if (recordId == userDoc.vault_own[i].card_id) {
                type = "CARD"
                break;
            }
        }

        const date = new Date(Date.now() + 6.048e+8).toISOString();

        if (type === "WEBSITE") {
            const updates = {
                websiteDocExpireAt: date,
                websiteFavorite: false,
                websiteDeleted: true
            }
            const website = await Website.findById(recordId)
            if (!website)
                res.status(404).json({ success: false, msg: "Not found!!" })
            else if (website.websiteDeleted !== true) {
                try {
                    const websiteUpDoc = await Website.findByIdAndUpdate(recordId, updates, { new: true })
                    if (!websiteUpDoc) throw error;
                    res.status(200).json({ "success": true, "msg": "record Will be deleted in 7 days" })
                } catch (error) {
                    res.status(404).json({ "success": false, "msg": "Record Not Found!" })
                }
            }
            else {
                try {
                    const websiteDoc = await Website.findByIdAndDelete(recordId)
                    // todo : Also remove from the user own_vault
                    if (!websiteDoc) throw error;
                    res.status(200).json({ "success": true, "msg": "record is permenatly deleted" })
                }
                catch (error) {
                    res.status(404).json({ "success": false, "msg": "Record Not Found!" })
                }
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}



