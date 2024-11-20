
const  workflow = require('../controllers/workflow')

var router = require("express").Router();


router.post('/create', workflow.createWorkFlow)
router.get('/getuserFlow', workflow.getWorkflowByUserAndAdmin)
router.patch('/update', workflow.updateModel)
router.get('/getWorkFlow', workflow.getWorkflowsByAddedBy)
router.patch('/updateWorkFlow', workflow.updateAssignedUser)
router.get('/counts' , workflow.getTransactionCounts)
router.post('/updateNotes' , workflow.updateTransactionWorkflowNotes)

module.exports = router;
