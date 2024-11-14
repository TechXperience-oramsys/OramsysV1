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

