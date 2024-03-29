import validator from 'validator'

const middlewareSyntax = (req:any, res:any, next:any) => {
    // empty/invalid sended data case
    function checkSendedValue() {
        return (req.body.email != undefined && String(req.body.email).match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) ||
            (req.body.password != undefined && (req.body.password == "" || req.body.password.length < 8 || req.body.password.length > 50)) ||
            (req.body.newPassword != undefined && (req.body.newPassword == "" || req.body.newPassword.length < 8 || req.body.newPassword.length > 50)) ||
            // User part
            (req.body.firstNameUser != undefined && (req.body.firstNameUser == "" && req.body.firstNameUser.length < 2 && req.body.firstNameUser.length > 25)) ||
            (req.body.lastNameUser != undefined && (req.body.lastNameUser == "" && req.body.lastNameUser.length < 2 && req.body.lastNameUser.length > 25)) ||


            // Admin part
            (req.body.emailPublisher != undefined && validator.isEmail(req.body.emailPublisher) == false) ||
            (req.body.textContent != undefined && req.body.textContent == "") ||
            (req.body.createdAtFrom != undefined && validator.isDate(req.body.createdAtFrom) == false) ||
            (req.body.createdAtAt != undefined && validator.isDate(req.body.createdAtAt) == false) ||
            (req.body.idPost != undefined && validator.isMongoId(req.body.idPost) == false) ||
            (req.body.idProduct != undefined && validator.isMongoId(req.body.idProduct) == false) ||
            (req.body.emailSender != undefined && validator.isEmail(req.body.emailSender)) ||
            (req.body.replyTo != undefined && validator.isEmail(req.body.replyTo)) ||
            (req.body.gender != undefined && (req.body.gender == "" && req.body.gender != "Homme" && req.body.gender != "Femme" && req.body.gender != "Autre")) ||
            (req.body.accountType != undefined && (req.body.accountType == "" && req.body.accountType != "eleve" && req.body.accountType != "staff" && req.body.accountType != "association")) ||
            (req.body.status != undefined && req.body.status == "") ||
            (req.body.isBlocked != undefined && req.body.isBlocked == "") ||
            (req.body.lastActivityFrom != undefined && validator.isDate(req.body.lastActivityFrom) == false) ||
            (req.body.nameProduct != undefined && req.body.nameProduct == "") ||
            (req.body.description != undefined && req.body.description == "") ||


            (req.body.balanceDoomo != undefined && (req.body.balanceDoomo == "" || isNaN(req.body.balanceDoomo))) ||
            (req.body.priceMin != undefined && (req.body.priceMin == "" || isNaN(req.body.priceMin))) ||
            (req.body.priceMax != undefined && (req.body.priceMax == "" || isNaN(req.body.priceMax))) ||
            (req.body.price != undefined && (req.body.price == "" || isNaN(req.body.price))) ||
            (req.body.availableStockMin != undefined && (req.body.availableStockMin == ""  || isNaN(req.body.availableStockMin))) ||
            (req.body.availableStockMax != undefined && (req.body.availableStockMax == ""  || isNaN(req.body.availableStockMax))) ||
            (req.body.availableStock != undefined && (req.body.availableStock == ""  || isNaN(req.body.availableStock))) ||
            (req.body.nbSellMin != undefined && (req.body.nbSellMin == ""  || isNaN(req.body.nbSellMin))) ||
            (req.body.nbSellMax != undefined && (req.body.nbSellMax == ""  || isNaN(req.body.nbSellMax))) ||
            (req.body.imageURL != undefined && String(req.body.imageURL).match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/) == null) ||
            
            (req.body.buyedBy != undefined && validator.isEmail(req.body.buyedBy) == false) ||
            (req.body.numberBill != undefined && isNaN(req.body.numberBill)) ||
            (req.body.emailBuyer != undefined && validator.isEmail(req.body.emailBuyer) == false) ||
            (req.body.dateBillMin != undefined && validator.isDate(req.body.dateBillMin) == false) ||
            (req.body.dateBillMax != undefined && validator.isDate(req.body.dateBillMax) == false) ||
            
            (req.body.emailWinner != undefined && validator.isEmail(req.body.emailWinner) == false) ||
            (req.body.levelGet != undefined && isNaN(req.body.levelGet)) ||

            (req.body.haveReport != undefined && req.body.haveReport == "")
    }





    
    if (checkSendedValue()) {

        res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
        res.status(403).json(
            {
                error: true,
                message: "Une ou plusieurs données sont erronées"
            });
    }
    else {
        //console.log("success data !")
        next();
    }
};



// Exports all the functions
export { middlewareSyntax }