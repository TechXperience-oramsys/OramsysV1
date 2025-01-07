"use strict";

var router = require("express").Router();

const httpStatus = require("http-status");
const Joi = require("joi");
const APIResponse = require("../helpers/APIResponse");
const transactionController = require("../controllers/transaction");
const { decodeToken } = require("../utils/jwt.helper");

router.get('/get-ports', Validate, transactionController.getPorts);
router.get('/get', Validate, transactionController.getAll);
router.get('/getById/:id', Validate, transactionController.getById);
router.post('/add', Validate, transactionController.create);
router.post('/details', Validate, transactionController.saveDetails);
router.put('/details/:id', Validate, transactionController.updateDetails)
router.post('/key-party', Validate, transactionController.saveKeyParties);
router.put('/key-party/:id', Validate, transactionController.updateKeyParties);
router.post('/document-flow', Validate, transactionController.saveDocumentFlow);
router.put('/document-flow/:id', Validate, transactionController.updateDocumentFlow);
router.post('/fund-flow', Validate, transactionController.saveFundFlow);
router.put('/fund-flow/:id', Validate, transactionController.updateFundFlow);
router.post('/facility', Validate, transactionController.saveFacility);
router.put('/facility/:id', Validate, transactionController.updateFacility);
router.post('/edit/:id', Validate, transactionController.edit);
router.get('/termSheet/:id',Validate, transactionController.download);
router.post('/uploadTermSheet',Validate, transactionController.uploadTermSheet);



function verifyToken(req, res, next) {
    try {
        const bearer = req.header('Authorization');
        if (!bearer) {
            res.status(401).send(`No token given.`)
            return false
        }

        const tokens = decodeToken(bearer)
        if (!tokens || tokens.length < 2) {
            res.status(401).send(`Expect bearer token.`)
            return false
        } else {
            return true
        }
    } catch (e) {
        console.log(e)
        Sentry.captureException(e)
        return res.status(401).send(`Invalid input or token.`)
    }
}
function Validate(req, res, next) {
    if (verifyToken(req, res, next)) {
        return next();
    }
}

module.exports = router;    