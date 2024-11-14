// controller/workFlowController.js
"use strict";

const WorkFlow = require('../models/workflow'); // Adjust the path if needed
const Transaction = require('../models/transaction/transaction')
const nodemailer = require('nodemailer');
// const TransactionDetails = require('../models/TransactionDetails');
// const TransactionDocumentFlows = require('../models/TransactionDocumentFlows');
// const TransactionFacilities = require('../models/TransactionFacilities');
// const TransactionFundFlows = require('../models/TransactionFundFlows');
// const TransactionKeyParties = require('../models/TransactionKeyParties');  // Ensure correct casing here

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
    if (!assignedUser || !addedBy) {
      return res.status(400).json({ message: "Both assignedUser and addedBy are required" });
    }

    // Step 1: Find the workflow document
    const workflowDocument = await WorkFlow.findOne({ assignedUser, addedBy });
    if (!workflowDocument) {
      return res.status(404).json({ message: "Workflow document not found" });
    }

    // Step 2: Find the related transaction documents and populate fields
    const transactionDocuments = await Transaction.find({
      admin: addedBy,  // Matching the admin to get multiple documents
    })
      .populate('userId')  // Populate all fields of the user
      .populate('details')
      .populate('documentFlow')
      .populate('facility')
      .populate('fundFlow')
      .populate({
        path: 'keyParties',
        model: 'TransactionKeyParties'  // Ensure this model name is correct
      });

    console.log(transactionDocuments);  // Log to see all populated transaction documents

    if (!transactionDocuments || transactionDocuments.length === 0) {
      return res.status(404).json({ message: "No transaction documents found" });
    }

    // Return combined workflow and populated transaction data
    return res.json({
      workflowDocument,
      transactionDocuments  // Return an array of transaction documents
    });

  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
