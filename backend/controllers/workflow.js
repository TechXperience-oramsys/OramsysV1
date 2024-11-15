// controller/workFlowController.js
"use strict";

const WorkFlow = require('../models/workflow'); // Adjust the path if needed
const Transaction = require('../models/transaction/transaction')
const nodemailer = require('nodemailer');
const Details = require('../models//transaction/transactionDetails');
const DocumentFlow = require('../models/transaction/transactionDocumentFlow');
const Facility = require('../models/transaction/transactionFacility');
const FundFlow = require('../models/transaction/transactionFundFlow');
const KeyParties = require('../models/transaction/transactionKeyParties');  // Ensure correct casing here

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "c116604.sgvps.net",
  port: 465,
  auth: {
    user: "notification@techxperience.ng",
    pass: "0ramsys!@#",
  },
});

// POST - Create a new workflow and send an email to the new user
exports.createWorkFlow = async (req, res) => {

  try {
    const { addedBy, stepName, assignedUser, userRole, newUser, admin } = req.body;

    // Create a new instance of the WorkFlow model with data from the request body
    const newWorkFlow = new WorkFlow({
      addedBy,
      stepName,
      assignedUser,
      userRole,
      newUser,
      admin
    });

    // Save the new workflow to the database
    const savedWorkFlow = await newWorkFlow.save();

    // Send an email to the new user
    const mailOptions = {
      from: 'notification@techxperience.ng', // Sender's email address
      to: newUser,                           // Email address of the new user
      subject: 'Welcome to the Workflow System',
      text: `Hello, ${newUser}!
        
        You have been assigned a new workflow step: ${stepName}.
        Please log in to the system to view more details.
      
        Thank you!
        Workflow Management Team`,

      // HTML version of the email
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p>Hello, ${newUser}!</p>
            <p>You have been assigned a new workflow step: <strong>${stepName}</strong>.</p>
            <p>Please log in to the system to view more details.</p>
            <a href="https://yourapp.com/login" 
               style="
                 display: inline-block;
                 padding: 10px 20px;
                 font-size: 16px;
                 color: #ffffff;
                 background-color: #4CAF50;
                 text-decoration: none;
                 border-radius: 5px;
                 margin-top: 20px;
               ">
              Login Now
            </a>
            <p>Thank you!<br />Workflow Management Team</p>
          </div>
        `
    };


    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // Even if the email fails, respond with the saved workflow data
        return res.status(201).json({
          workflow: savedWorkFlow,
          emailSent: false,
          emailError: error.message
        });
      }
      console.log('Email sent:', info.response);
      res.status(201).json({
        workflow: savedWorkFlow,
        emailSent: true
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating workflow", error });
  }
};


exports.getWorkflowByUserAndAdmin = async (req, res) => {
  try {
    const { assignedUser, addedBy } = req.query;

    // Step 1: Check if both assignedUser and addedBy are provided
    if (!assignedUser || !addedBy) {
      return res.status(400).json({ message: "Both assignedUser and addedBy are required" });
    }

    // Step 2: Find the workflow document
    const workflowDocument = await WorkFlow.findOne({ assignedUser, addedBy });
    if (!workflowDocument) {
      return res.status(404).json({ message: "Workflow document not found" });
    }

    // Step 3: Fetch all transaction documents for this workflow, autopopulated
    const transactionDocuments = await Transaction.find({ admin: addedBy })
      .populate({
        path: 'details',
        model: 'TransactionDetails',
        populate: [
          {
            path: 'productDetails.name',
            model: 'Product' // Replace with your actual model name
          },
          {
            path: 'shippingOptions.countryOfOrigin',
            model: 'Countries',
          },
          {
            path: 'shippingOptions.shippingCompany',
            model: 'Entity',
          },
          {
            path: 'shippingOptions.warehouses',
            populate: [
              {
                path: 'warehouseCompany',
                model: 'Entity',

              },
              {
                path: 'warehouse',
                model: 'EntityWarehouse'
              }
            ]
          },
          {
            path: 'shippingOptions.destinationCountry',
            model: 'Countries'
          },
          {
            path: 'shippingOptions.airbaseOfOrigin',
            model: 'AirBase'
          },
          {
            path: 'shippingOptions.destinationAirbase',
            model: 'Port'
          }
        ]
      })
      .populate({
        path: 'keyParties',
        model: 'TransactionKeyParties',
        populate: [
          {
            path: 'parties.type',  // Assuming 'type' refers to a model like 'PartyType'
            model: 'EntityRoles',
          },
          {
            path: 'parties.name',  // Assuming 'name' is a reference to the 'User' model
            model: 'Entity',
          },
        ]
      })
      .populate({
        path: 'documentFlow',
        model: 'TransactionDocumentFlow',
        // populate: {
        //   path: 'document',  // Example if document flow has nested references
        //   model: 'DocumentDetails'
        // }
      })
      .populate({
        path: 'facility',
        model: 'TransactionFacility',
        // populate: {
        //   path: 'location',
        //   model: 'FacilityLocation'  // Populate any nested fields if needed
        // }
      })
      .populate({
        path: 'fundFlow',
        model: 'TransactionFundFlow',
        populate: [
          {
            path: 'lettersOfCredit.applicant',
            model: 'Entity',  // Assuming applicant is a User
          },
          {
            path: 'lettersOfCredit.issuingBank',
            model: 'Entity', // Assuming issuingBank is a Bank

          },
          {
            path: 'lettersOfCredit.beneficiary',
            model: 'Entity',
          },
          {
            path: 'lettersOfCredit.advisingBank',
            model: 'Entity',
          },
          {
            path: 'lettersOfCredit.negotiatingBank',
            model: 'Entity',
          },
          {
            path: 'lettersOfCredit.secondBeneficiary',
            model: 'Entity',
          },
          {
            path: 'lettersOfCredit.reimbursingBank',
            model: 'Entity',
          },
          {
            path: 'paymentOrigin',
            model: 'Countries', // Assuming paymentOrigin refers to a Transaction model
          },
          {
            path: 'beneficiary',
            model: 'Entity', // Assuming beneficiary is a User

          }
        ]
      })

      .populate({
        path: 'userId',  // Populate the user details
        model: 'User',
        select: 'name email' // Example of selecting only specific fields from the User model
      });

    // Step 4: Handle no transaction documents found
    if (!transactionDocuments || transactionDocuments.length === 0) {
      return res.status(404).json({ message: "No transaction documents found" });
    }

    // Return combined workflow and autopopulated transaction data
    return res.json({
      workflowDocument,
      transactionDocuments  // Automatically populated
    });

  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateModel = async (req, res) => {
  const { _id, type, userEmail, flowName } = req.body;

  if (!_id || !type || !userEmail || !flowName) {
    return res.status(400).json({ error: "Missing _id, type, userEmail, or flowName in request body." });
  }

  let model;
  switch (type) {
    case 'facility':
      model = Facility;
      break;
    case 'documentFlow':
      model = DocumentFlow;
      break;
    case 'keyParties':
      model = KeyParties;
      break;
    case 'details':
      model = Details;
      break;
    case 'fundFlow':
      model = FundFlow;
      break;
    default:
      return res.status(400).json({ error: "Invalid type provided." });
  }

  try {
    // Update flowVerified to true
    const updatedDocument = await model.findByIdAndUpdate(_id, { flowVerified: true }, { new: true });
    if (!updatedDocument) {
      return res.status(404).json({ error: "Document not found." });
    }

    // Send email notification
    const mailOptions = {
      from: 'notification@techxperience.ng',
      to: userEmail,
      subject: 'Flow Verification Notification',
      text: `Hello,

The flow "${flowName}" has been successfully verified.

Best regards,
Your Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: "Error sending email notification." });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Flow verified and email sent to user.', updatedDocument });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during the update process." });
  }
};

exports.getWorkflowsByAddedBy = async (req, res) => {
  const { addedBy } = req.query;

  if (!addedBy) {
    return res.status(400).json({ error: "The 'addedBy' query parameter is required." });
  }

  try {
    const workflows = await WorkFlow.find({ addedBy });
    res.status(200).json(workflows);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching workflows." });
  }
};


exports.updateAssignedUser = async (req, res) => {
  const { _id, assignedUser, userRole, stepName } = req.body; // Extract fields from the request body
console.log(req.body , 'body is here');

  if (!_id || !assignedUser || !userRole || !stepName) {
    return res.status(400).json({ 
      error: "The '_id', 'assignedUser', 'userRole', and 'stepName' fields are required." 
    });
  }

  try {
    // Find the document by _id and update the specified fields
    const updatedWorkflow = await WorkFlow.findByIdAndUpdate(
      _id,
      { assignedUser, userRole, stepName },
      { new: true } // Return the updated document
    );

    if (!updatedWorkflow) {
      return res.status(404).json({ error: "Workflow not found." });
    }

    res.status(200).json({ 
      message: "Workflow updated successfully.", 
      updatedWorkflow 
    });
  } catch (error) {
    res.status(500).json({ 
      error: "An error occurred while updating the workflow." 
    });
  }
};
