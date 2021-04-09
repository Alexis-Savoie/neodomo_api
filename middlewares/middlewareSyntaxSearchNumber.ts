const middlewareSyntaxSearchNumber = (req: any, res: any, next: any) => {
    // empty/invalid sended data case
    function checkSendedValue() {
        return (req.body.priceMin != undefined && (req.body.priceMin == "" || isNaN(req.body.priceMin))) ||
            (req.body.priceMax != undefined && (req.body.priceMax == "" || isNaN(req.body.priceMax))) ||
            (req.body.availableStockMin != undefined && (req.body.availableStockMin == "" || isNaN(req.body.availableStockMin))) ||
            (req.body.availableStockMax != undefined && (req.body.availableStockMax == "" || isNaN(req.body.availableStockMax))) ||
            (req.body.nbSellMin != undefined && (req.body.nbSellMin == "" || isNaN(req.body.nbSellMin))) ||
            (req.body.nbSellMax != undefined && (req.body.nbSellMax == "" || isNaN(req.body.nbSellMax)))
    }
    function ifPositiveOrZero() {
        return req.body.priceMin != undefined && parseInt(req.body.priceMin) < 0 ||
            req.body.priceMax != undefined && parseInt(req.body.priceMax) < 0 ||
            req.body.availableStockMin != undefined && parseInt(req.body.availableStockMin) < 0 ||
            req.body.availableStockMax != undefined && parseInt(req.body.availableStockMax) < 0 ||
            req.body.nbSellMin != undefined && parseInt(req.body.nbSellMin) < 0 ||
            req.body.nbSellMax != undefined && parseInt(req.body.nbSellMax) < 0
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
        if (ifPositiveOrZero()) {
            res.setHeader("Content-Type", "application/json"); // Typage de la data de retour
            res.status(403).json(
                {
                    error: true,
                    message: "Une ou plusieurs données sont erronées"
                });
        }
        else {
            next();
        }
        
    }
};



// Exports all the functions
export { middlewareSyntaxSearchNumber }