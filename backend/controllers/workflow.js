// controller/workFlowController.js
"use strict";

const WorkFlow = require('../models/workflow'); // Adjust the path if needed
const nodemailer = require('nodemailer');

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
