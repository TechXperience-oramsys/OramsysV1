
const  workflow = require('../controllers/workflow')

var router = require("express").Router();


router.post('/create', workflow.createWorkFlow)
router.get('/getuserFlow', workflow.getWorkflowByUserAndAdmin)

module.exports = router;
