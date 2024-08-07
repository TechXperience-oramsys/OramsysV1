"use strict"

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var Schema = new Schema({
    entityId: { type: String, required: false },
    netProfitMargin: { type: Number, required: false },
    ROE: { type: Number, required: false },
    ROA: { type: Number, required: false },
    operatingCashFlow: { type: Number, required: false },
    debtServiceCoverageRatio: { type: Number, required: false },
    interestCoverageRatio: { type: Number, required: false },
    netGearingRatio: { type: Number, required: false },
    totalDebtToTotalCapital: { type: Number, required: false },
    currentRatio: { type: Number, required: false },
    quickRatio: { type: Number, required: false },
    cashFlowBeforeFinancingSales: { type: Number, required: false },
    isDeleted: { type: Boolean, required: true, default: false },
}, {
    timestamps: true
})

Schema.index({ name: "text" })

Schema.statics.createEntityFinancial = async function () {
    return await this.Save()
}

Schema.statics.getAll = async function () {
    return await this.find({ isDeleted: false }).sort({ name: 1 }).exec();
}
Schema.statics.getAllBySearch = async function (search) {
    return await this.find({ name: { $in: [new RegExp(`.*${search}.*`, 'gi')] }, isDeleted: false }).sort({ name: 1 });
}

Schema.statics.getById = async function (id) {
    return await this.findOne({ _id: id, isDeleted: false }).exec();
}

Schema.statics.updateEntityFinancial = async function (data, id) {
    return await this.findOneAndUpdate({
        _id: id
    }, {
        $set: data
    }, {
        new: true
    })
}

Schema.statics.deleteEntityFinancial = async function (id) {
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

Schema.statics.getEntityFinancialFromArrayOfIds = async function (ids) {
    return await this.find({
        '_id': { $in: ids }
    }).select("name")

}

module.exports = mongoose.model("EntityFinancial", Schema)