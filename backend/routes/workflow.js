
const  workflow = require('../controllers/workflow')

var router = require("express").Router();


router.post('/create', workflow.createWorkFlow)


module.exports = router;
