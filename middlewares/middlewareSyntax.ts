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
            (req.body.emailPublisher != undefined && req.body.emailPublisher == "") ||
            (req.body.textContent != undefined && req.body.textContent == "") ||
            (req.body.createdAtFrom != undefined && req.body.createdAtFrom == "") ||
            (req.body.createdAtAt != undefined && req.body.createdAtAt == "") ||
            (req.body.idPost != undefined && (req.body.idPost == "" || req.body.idPost.length != 24)) ||
            (req.body.idProduct != undefined &&(req.body.idProduct == "" || req.body.idProduct.length != 24)) ||
            (req.body.emailSender != undefined && req.body.emailSender == "") ||
            (req.body.replyTo != undefined && req.body.replyTo == "") ||
            (req.body.gender != undefined && (req.body.gender == "" || req.body.gender != "Homme" || req.body.gender != "Femme" || req.body.gender != "Autre")) ||
            (req.body.accountType != undefined && (req.body.accountType == "" || req.body.accountType != "eleve" || req.body.accountType != "staff" || req.body.accountType != "association")) ||
            (req.body.status != undefined && req.body.status == "") ||
            (req.body.isBlocked != undefined && req.body.isBlocked == "") ||
            (req.body.lastActivityFrom != undefined && req.body.lastActivityFrom == "") ||
            (req.body.nameProduct != undefined && req.body.nameProduct == "") ||
            (req.body.description != undefined && req.body.description == "") ||
            
            (req.body.priceMin != undefined && (req.body.priceMin == "" || isNaN(req.body.priceMin))) ||
            (req.body.priceMax != undefined && (req.body.priceMax == "" || isNaN(req.body.priceMax))) ||
            (req.body.price != undefined && (req.body.price == "" || isNaN(req.body.price))) ||
            (req.body.availableStockMin != undefined && (req.body.availableStockMin == ""  || isNaN(req.body.availableStockMin))) ||
            (req.body.availableStockMax != undefined && (req.body.availableStockMax == ""  || isNaN(req.body.availableStockMax))) ||
            (req.body.availableStock != undefined && (req.body.availableStock == ""  || isNaN(req.body.availableStock))) ||
            (req.body.nbSellMin != undefined && (req.body.nbSellMin == ""  || isNaN(req.body.nbSellMin))) ||
            (req.body.nbSellMax != undefined && (req.body.nbSellMax == ""  || isNaN(req.body.nbSellMax))) ||
            (req.body.imageURL != undefined && req.body.imageURL == "") ||
            
            (req.body.buyedBy != undefined && req.body.buyedBy == "") ||
            (req.body.numberBill != undefined && req.body.numberBill == "") ||
            (req.body.emailBuyer != undefined && req.body.emailBuyer == "") ||
            (req.body.dateBillMin != undefined && req.body.dateBillMin == "") ||
            (req.body.dateBillMax != undefined && req.body.dateBillMax == "") ||
            
            (req.body.emailWinner != undefined && req.body.emailWinner == "") ||
            (req.body.levelGet != undefined && req.body.levelGet == "") ||

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