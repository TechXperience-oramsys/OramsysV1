"use strict";

const mongoose = require('mongoose');

const WorkFlowSchema = new mongoose.Schema(
  {
    addedBy : { 
        type: String, 
        required: true, 
        default: null 
      },
    stepName: { 
      type: String, 
      required: true, 
      default: null 
    },
    assignedUser: { 
      type: String, 
      default: null 
    },
    userRole: { 
      type: String, 
      required: true, 
      default: null 
    },
    newUser: { 
      type: String, 
      default: null 
    },
    admin: { 
      type: Object, 
      required: true, 
      default: null 
    },
    department: { 
      type: String, 
      default: null 
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("WorkFlow", WorkFlowSchema);
