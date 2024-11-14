"use strict"

const mongoose = require('mongoose');
const { text } = require('pdfkit');
var Schema = mongoose.Schema

var Parties = new Schema({
    type: { type: Schema.Types.ObjectId, ref: "EntityRoles", required: false, default: null },
    name: { type: Schema.Types.ObjectId, ref: "Entity", required: false, default: null }
})

var uploadEvidence = new Schema({
    type: { type: String, required: false, default: null },
    name: { type: String, required: false, default: null },
    file: { type: String, required: false, default: null },
});


var relatedParties = new Schema({
    party_relation: { type: String, required: false, default: null },
    buyer: { type: String, required: false, default: null },
    shipper: { type: String, required: false, default: null },
    upload_evidence: { type: [uploadEvidence], required: false },
});


var Schema = new Schema({
    transactionId: { type: String, required: true, default: null },
    parties: { type: [Parties], required: false },
    relatedParties: { type: [relatedParties], required: false },
    flowVerified : { type: Boolean, required: true, default: false },
}, {
    timestamps: true
})

Schema.index({ name: "text" })

Schema.statics.createTransactionKeyParties = async function () {
    return await this.Save()
}

Schema.statics.getAll = async function () {
    return await this.find({ isDeleted: false }).populate('countryOfBirth').sort({ name: 1 }).exec();
}
Schema.statics.getAllBySearch = async function (search) {
    return await this.find({ name: { $in: [new RegExp(`.*${search}.*`, 'gi')] }, isDeleted: false }).sort({ name: 1 });
}

Schema.statics.getById = async function (id) {
    return await this.findOne({ _id: id, isDeleted: false }).populate('countryOfBirth').exec();
}

Schema.statics.updateTransactionKeyParties = async function (data, id) {
    return await this.findOneAndUpdate({
        _id: id
    }, {
        $set: data
    }, {
        new: true
    })
}

Schema.statics.deleteTransactionKeyParties = async function (id) {
    return await this.findOneAndUpdate({
        _id: id
    }, {
        $set: {
            isDeleted: true
        }
    }, {
        new: true
    })

}

Schema.statics.getTransactionKeyPartiesFromArrayOfIds = async function (ids) {
    return await this.find({
        '_id': { $in: ids }
    }).select("name")

}

module.exports = mongoose.model("TransactionKeyParties", Schema)  