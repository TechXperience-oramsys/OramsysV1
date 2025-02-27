"use strict";

const transaction = require("../models/transaction/transaction");
const transactionDetails = require("../models/transaction/transactionDetails");
const transactionKeyParties = require("../models/transaction/transactionKeyParties");
const transactionDocumentFlow = require("../models/transaction/transactionDocumentFlow");
const transactionFundFlow = require("../models/transaction/transactionFundFlow");
const transactionFacility = require("../models/transaction/transactionFacility");
const user = require("../models/user");
const superAdmin = require("../models/superAdmin");
const httpStatus = require("http-status");
const APIResponse = require("../helpers/APIResponse");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const makeTermSheet = require("../utils/makeTermSheet");

class transactionController {
  async getPorts(req, res, next) { }

  // async create(req, res, next) {
  //     let body = req.body;
  //     const newTransaction = {
  //         type: body.type,
  //         userId: body.userId,
  //         lenders: body.lenders,
  //         borrower_Applicant: body.borrower_Applicant,
  //         admin: body.admin
  //     };
  //     try {
  //         const model = new transaction(newTransaction);
  //         const saveResponse = await model.save();
  //         return res.status(httpStatus.OK).json(new APIResponse(saveResponse, 'Transaction created successfully.', httpStatus.OK));
  //     } catch (e) {
  //         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse({}, 'Error creating transaction', httpStatus.INTERNAL_SERVER_ERROR, e));
  //     }
  // }

  // async saveDetails(req, res, next) {
  //     let detail = req.body.detail;
  //     try {
  //         if (detail) {
  //             if (detail.pricingDetails.pricingHedgingStatus) {
  //                 detail = {
  //                     ...detail,
  //                     transactionId: req.params.id
  //                 };
  //             } else {
  //                 delete detail.pricingDetails.pricingCounterParty;
  //                 detail = {
  //                     ...detail,
  //                     transactionId: req.params.id
  //                 };
  //             }
  //             const transactionDetailsModel = new transactionDetails(detail);
  //             const transactionDetailsResponse = await transactionDetailsModel.save();
  //             await transaction.updateTransaction({ details: transactionDetailsResponse._id }, req.params.id);
  //             return res.status(httpStatus.OK).json(new APIResponse(transactionDetailsResponse, 'Transaction details saved successfully.', httpStatus.OK));
  //         }
  //     } catch (e) {
  //         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse({}, 'Error saving transaction details', httpStatus.INTERNAL_SERVER_ERROR, e));
  //     }
  // }

  // async saveKeyParties(req, res, next) {
  //     let keyParties = req.body.keyParties;
  //     try {
  //         if (keyParties.keyParties.length) {
  //             let keyParty = keyParties.keyParties.map(element => element);
  //             let element = {
  //                 parties: keyParty,
  //                 transactionId: req.params.id,
  //                 relatedParties: keyParties?.relatedParties
  //             };
  //             const transactionKeyPartiesModel = new transactionKeyParties(element);
  //             const transactionKeyPartiesResponse = await transactionKeyPartiesModel.save();
  //             await transaction.updateTransaction({ keyParties: transactionKeyPartiesResponse._id }, req.params.id);
  //             return res.status(httpStatus.OK).json(new APIResponse(transactionKeyPartiesResponse, 'Transaction key parties saved successfully.', httpStatus.OK));
  //         }
  //     } catch (e) {
  //         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse({}, 'Error saving transaction key parties', httpStatus.INTERNAL_SERVER_ERROR, e));
  //     }
  // }

  // async saveDocumentFlow(req, res, next) {
  //     let documentFlow = req.body.documentFlow;
  //     try {
  //         if (documentFlow) {
  //             documentFlow = {
  //                 ...documentFlow,
  //                 transactionId: req.params.id
  //             };
  //             const transactionDocumentFlowModel = new transactionDocumentFlow(documentFlow);
  //             const transactionDocumentFlowResponse = await transactionDocumentFlowModel.save();
  //             await transaction.updateTransaction({ documentFlow: transactionDocumentFlowResponse._id }, req.params.id);
  //             return res.status(httpStatus.OK).json(new APIResponse(transactionDocumentFlowResponse, 'Transaction document flow saved successfully.', httpStatus.OK));
  //         }
  //     } catch (e) {
  //         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse({}, 'Error saving transaction document flow', httpStatus.INTERNAL_SERVER_ERROR, e));
  //     }
  // }

  // async saveFundFlow(req, res, next) {
  //     let fundFlow = req.body.fundFlow;
  //     try {
  //         if (fundFlow) {
  //             if (fundFlow.additonalCharges) {
  //                 fundFlow = {
  //                     ...fundFlow,
  //                     transactionId: req.params.id
  //                 };
  //             } else {
  //                 delete fundFlow.payer;
  //                 fundFlow = {
  //                     ...fundFlow,
  //                     transactionId: req.params.id
  //                 };
  //             }
  //             const transactionFundFlowModel = new transactionFundFlow(fundFlow);
  //             const transactionFundFlowResponse = await transactionFundFlowModel.save();
  //             await transaction.updateTransaction({ fundFlow: transactionFundFlowResponse._id }, req.params.id);
  //             return res.status(httpStatus.OK).json(new APIResponse(transactionFundFlowResponse, 'Transaction fund flow saved successfully.', httpStatus.OK));
  //         }
  //     } catch (e) {
  //         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse({}, 'Error saving transaction fund flow', httpStatus.INTERNAL_SERVER_ERROR, e));
  //     }
  // }

  // async saveFacility(req, res, next) {
  //     let facility = req.body.facility;
  //     try {
  //         if (facility) {
  //             facility = {
  //                 ...facility,
  //                 transactionId: req.params.id
  //             };
  //             const transactionFacilityModel = new transactionFacility(facility);
  //             const transactionFacilityResponse = await transactionFacilityModel.save();
  //             await transaction.updateTransaction({ facility: transactionFacilityResponse._id }, req.params.id);
  //             return res.status(httpStatus.OK).json(new APIResponse(transactionFacilityResponse, 'Transaction facility saved successfully.', httpStatus.OK));
  //         }
  //     } catch (e) {
  //         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse({}, 'Error saving transaction facility', httpStatus.INTERNAL_SERVER_ERROR, e));
  //     }
  // }

  async saveDetails(req, res, next) {
    const { detail } = req.body;
    const { id } = req.params;

    console.log('Transaction ID in the backend:', id)
    try {
      if (detail) {
        detail.transactionId = mongoose.Types.ObjectId(id);

        if (!detail.pricingDetails.pricingHedgingStatus) {
          delete detail.pricingDetails.pricingCounterParty;
        }
        // detail.transactionId = req.params.id;
        const transactionDetailsModel = new transactionDetails(detail);
        const transactionDetailsResponse = await transactionDetailsModel.save();
        await transaction.updateTransaction(
          { details: transactionDetailsResponse._id }, id
        );
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              transactionDetailsResponse,
              "Transaction details saved successfully.",
              httpStatus.OK
            )
          );
      }
    } catch (e) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error saving transaction details",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }

  async updateDetails(req, res, next) {
    const { details } = req.body;
    const { id } = req.params;
    try {
      if (details) {
        await transactionDetails.updateTransactionDetail(details, id)
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              transactionDetails,
              "Transaction details updated successfully.",
              httpStatus.OK
            )
          );
      }
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error updating transaction details",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );

    }
  }

  async saveKeyParties(req, res, next) {
    const { keyParties } = req.body;
    try {
      if (keyParties && keyParties.keyParties.length) {
        const element = {
          parties: keyParties.keyParties,
          transactionId: req.params.id,
          relatedParties: keyParties.relatedParties,
        };
        const transactionKeyPartiesModel = new transactionKeyParties(element);
        const transactionKeyPartiesResponse =
          await transactionKeyPartiesModel.save();
        await transaction.updateTransaction(
          { keyParties: transactionKeyPartiesResponse._id },
          req.params.id
        );
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              transactionKeyPartiesResponse,
              "Transaction key parties saved successfully.",
              httpStatus.OK
            )
          );
      }
    } catch (e) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error saving transaction key parties",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }

  async updateKeyParties(req, res, next) {
    try {
      const parties = req.body;
      const { id } = req.params;
      if (parties) {
        await transactionKeyParties.updateTransactionKeyParties(parties, id)
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              transactionDetails,
              "Transaction key parties details updated successfully.",
              httpStatus.OK
            )
          );
      }

    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error updating Transaction key parties details!",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }

  async saveDocumentFlow(req, res, next) {
    const { documentFlow } = req.body;
    try {
      if (documentFlow) {
        documentFlow.transactionId = req.params.id;
        const transactionDocumentFlowModel = new transactionDocumentFlow(
          documentFlow
        );
        const transactionDocumentFlowResponse =
          await transactionDocumentFlowModel.save();
        await transaction.updateTransaction(
          { documentFlow: transactionDocumentFlowResponse._id },
          req.params.id
        );
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              transactionDocumentFlowResponse,
              "Transaction document flow saved successfully.",
              httpStatus.OK
            )
          );
      }
    } catch (e) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error saving transaction document flow",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }

  async updateDocumentFlow(req, res, next) {
    try {
      const data = req.body
      const id = req.params
      if (data) {
        await transactionDocumentFlow.updateTransactionDocumentFlow(data, data._id)
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              transactionDetails,
              "Transaction Document Flow updated successfully.",
              httpStatus.OK
            )
          );
      }
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error updating Transaction Document Flow!",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }

  async saveFundFlow(req, res, next) {
    const { fundFlow } = req.body;
    try {
      if (fundFlow) {
        if (!fundFlow.additonalCharges) {
          delete fundFlow.payer;
        }
        fundFlow.transactionId = req.params.id;
        const transactionFundFlowModel = new transactionFundFlow(fundFlow);
        const transactionFundFlowResponse =
          await transactionFundFlowModel.save();
        await transaction.updateTransaction(
          { fundFlow: transactionFundFlowResponse._id },
          req.params.id
        );
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              transactionFundFlowResponse,
              "Transaction fund flow saved successfully.",
              httpStatus.OK
            )
          );
      }
    } catch (e) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error saving transaction fund flow",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }

  async updateFundFlow(req, res, next) {
    try {
      const data = req.body
      const id = req.params.id
      if (data) {
        await transactionFundFlow.updateTransactionFundFlow(data, id)
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              transactionDetails,
              "Transaction Fund Flow updated successfully.",
              httpStatus.OK
            )
          );
      }
    } catch (error) {

      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error updating Transaction Fund Flow!",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }

  async saveFacility(req, res, next) {
    const { facility } = req.body;
    try {
      if (facility) {
        facility.transactionId = req.params.id;
        const transactionFacilityModel = new transactionFacility(facility);
        const transactionFacilityResponse =
          await transactionFacilityModel.save();
        await transaction.updateTransaction(
          { facility: transactionFacilityResponse._id },
          req.params.id
        );
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              transactionFacilityResponse,
              "Transaction facility saved successfully.",
              httpStatus.OK
            )
          );
      }
    } catch (e) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error saving transaction facility",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }

  async updateFacility(req, res, next) {
    try {
      const data = req.body
      const id = req.params.id
      if (data) {
        await transactionFacility.updateTransactionFacility(data, id)
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              transactionDetails,
              "Transaction Facility details updated successfully.",
              httpStatus.OK
            )
          );
      }
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error updating Transaction Facility details!",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }

  async create(req, res, next) {
    let body = req.body;
    let detail = req.body.detail;
    let keyParties = req.body.keyParties;
    let documentFlow = req.body.documentFlow;
    let fundFlow = req.body.fundFlow;
    let facility = req.body.facility;

    console.log("keyparties----------------------", keyParties);

    let updateData = {};
    const newTransaction = {
      type: body.type,
      createdBy: body.userId, // Assign userId to createdBy
      lenders: body.lenders,
      borrower_Applicant: body.borrower_Applicant,
      admin: body.admin,
      workFlowSteps: []
    };
    try {
      const model = new transaction(newTransaction);
      const saveResponse = await model.save();
      if (detail) {
        if (detail.pricingDetails.pricingHedgingStatus) {
          detail = {
            ...detail,
            transactionId: saveResponse._id,
          };
        } else {
          delete detail.pricingDetails.pricingCounterParty;
          detail = {
            ...detail,
            transactionId: saveResponse._id,
          };
        }
        const transactionDetailsModel = new transactionDetails(detail);
        const transactionDetailsResponse = await transactionDetailsModel.save();
        updateData = {
          ...updateData,
          details: transactionDetailsResponse._id,
        };
      }
      console.log("---keyParties.length----", keyParties.keyParties.length);
      if (keyParties.keyParties.length) {
        let keyParty = [];
        for (let i = 0; i < keyParties.keyParties.length; i++) {
          let element = keyParties.keyParties[i];
          keyParty.push(element);
        }
        let element = {
          parties: keyParty,
          transactionId: saveResponse._id,
          relatedParties: keyParties?.relatedParties,
        };

        const transactionKeyPartiesModel = new transactionKeyParties(element);
        const transactionKeyPartiesResponse =
          await transactionKeyPartiesModel.save();

        updateData = {
          ...updateData,
          keyParties: transactionKeyPartiesResponse._id,
        };
        console.log("---updateData----", updateData);
      }
      if (documentFlow) {
        documentFlow = {
          ...documentFlow,
          transactionId: saveResponse._id,
        };
        const transactionDocumentFlowModel = new transactionDocumentFlow(
          documentFlow
        );
        const transactionDocumentFlowResponse =
          await transactionDocumentFlowModel.save();
        updateData = {
          ...updateData,
          documentFlow: transactionDocumentFlowResponse._id,
        };
      }
      if (fundFlow) {
        if (fundFlow.additonalCharges) {
          fundFlow = {
            ...fundFlow,
            transactionId: saveResponse._id,
          };
        } else {
          delete fundFlow.payer;
          fundFlow = {
            ...fundFlow,
            transactionId: saveResponse._id,
          };
        }

        const transactionFundFlowModel = new transactionFundFlow(fundFlow);
        const transactionFundFlowResponse =
          await transactionFundFlowModel.save();
        updateData = {
          ...updateData,
          fundFlow: transactionFundFlowResponse._id,
        };
      }
      if (facility) {
        facility = {
          ...facility,
          transactionId: saveResponse._id,
        };
        const transactionFacilityModel = new transactionFacility(facility);
        const transactionFacilityResponse =
          await transactionFacilityModel.save();
        updateData = {
          ...updateData,
          facility: transactionFacilityResponse._id,
        };
      }

      const Transaction = await transaction.updateTransaction(
        updateData,
        saveResponse._id
      );
      if (Transaction) {
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              Transaction,
              "Transaction added successfully.",
              httpStatus.OK
            )
          );
      } else {
        await transaction.deleteTransaction(saveResponse._id);
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json(
            new APIResponse(
              {},
              "Error adding transaction",
              httpStatus.INTERNAL_SERVER_ERROR,
              e
            )
          );
      }
    } catch (e) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error adding transaction",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }

  async edit(req, res, next) {
    let body = req.body;
    let id = req.params.id;
    let userId = req.params.userId;
    let detail = req.body.detail;
    let keyParties = req.body.keyParties;
    let documentFlow = req.body.documentFlow;
    let fundFlow = req.body.fundFlow;
    let facility = req.body.facility;

    let updateData = {
      lenders: body.lenders,
      borrower_Applicant: body.borrower_Applicant,
    };
    try {
      const alreadyExist = await transaction.getById(id);
      if (!alreadyExist) {
        return res
          .status(httpStatus.OK)
          .json(new APIResponse({}, "Transaction not found", httpStatus.OK));
      } else {
        if (detail) {
          const transactionDetailsResponse =
            await transactionDetails.updateTransactionDetail(
              detail,
              detail._id
            );

          updateData = {
            ...updateData,
            details: transactionDetailsResponse._id,
          };
        }
        if (keyParties && keyParties.keyParties.length) {
          let keyParty = [];
          for (let i = 0; i < keyParties.keyParties.length; i++) {
            let element = keyParties.keyParties[i];
            keyParty.push(element);
          }
          let element = {
            parties: keyParty,
            relatedParties: keyParties?.relatedParties,
          };
          console.log("element keyparties", element);
          const transactionKeyPartiesResponse =
            await transactionKeyParties.updateTransactionKeyParties(
              element,
              keyParties._id
            );
          console.log("element keyparties", transactionKeyPartiesResponse);
          updateData = {
            ...updateData,
            keyParties: transactionKeyPartiesResponse._id,
          };
        }
        if (documentFlow) {
          const transactionDocumentFlowResponse =
            await transactionDocumentFlow.updateTransactionDocumentFlow(
              documentFlow,
              documentFlow._id
            );
          updateData = {
            ...updateData,
            documentFlow: transactionDocumentFlowResponse._id,
          };
        }
        if (fundFlow) {
          const transactionFundFlowResponse =
            await transactionFundFlow.updateTransactionFundFlow(
              fundFlow,
              fundFlow._id
            );
          updateData = {
            ...updateData,
            fundFlow: transactionFundFlowResponse._id,
          };
        }
        if (facility) {
          if (facility._id) {
            const transactionFacilityResponse =
              await transactionFacility.updateTransactionFacility(
                facility,
                facility._id
              );
            updateData = {
              ...updateData,
              facility: transactionFacilityResponse._id,
            };
          } else {
            delete facility._id;
            facility = {
              ...facility,
              transactionId: id,
            };
            const transactionFacilityModel = new transactionFacility(facility);
            const transactionFacilityResponse =
              await transactionFacilityModel.save();
            updateData = {
              ...updateData,
              facility: transactionFacilityResponse._id,
            };
          }
        }
        updateData = {
          ...updateData,
          lenders: body.lenders,
          borrower_Applicant: body.borrower_Applicant,
        };
        const updatedTransaction = await transaction.updateTransaction(
          updateData,
          alreadyExist._id
        );
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              updatedTransaction,
              "Transaction updated successfully.",
              httpStatus.OK
            )
          );
      }
    } catch (e) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error updating transaction",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }

  async getAll(req, res, next) {
    let userId = req.query.id;
    try {
      let transactions = [];
      if (userId === "all") {
        transactions = await transaction.find().populate("createdBy", "name"); // Populate createdBy with name
      } else {
        if (req.query.role.toLowerCase() === "user") {
          let adminId = req.query.adminId;
          transactions = await transaction.find({ createdBy: userId, admin: adminId }).populate("createdBy", "name");
        } else {
          transactions = await transaction.find({ createdBy: req.query.id }).populate("createdBy", "name");
        }
      }

      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(
            transactions,
            "Transactions fetched successfully.",
            httpStatus.OK
          )
        );
    } catch (e) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error fetching transactions",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }

  async getById(req, res, next) {
    let id = req.params.id;
    try {
        let Transaction = await transaction.findById(id).populate("createdBy", "name"); // Populate createdBy with name
        if (Transaction) {
            return res
                .status(httpStatus.OK)
                .json(
                    new APIResponse(
                        Transaction,
                        "Transaction fetched successfully.",
                        httpStatus.OK
                    )
                );
        } else {
            return res
                .status(httpStatus.OK)
                .json(
                    new APIResponse(
                        {},
                        "Transaction not found.",
                        httpStatus.OK
                    )
                );
        }
    } catch (e) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new APIResponse(
                    {},
                    "Error fetching transaction",
                    httpStatus.INTERNAL_SERVER_ERROR,
                    e
                )
            );
    }
}

  async download(req, res, next) {
    try {
      let id = req.params.id;
      let data;
      const finedTransaction = await transaction.getById(id);
      // console.log(finedTransaction, "finedTransaction")
      if (finedTransaction && finedTransaction.termSheetURL) {
        data = finedTransaction.termSheetURL;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="TermSheet.pdf"');
        const buffer = Buffer.from(data, 'utf8')
        // console.log(buffer, "buffer")
        const stringData = buffer.toString('base64');
        // console.log(stringData);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="TermSheet.pdf"');
        // res.setHeader('Content-Length', buffer.length);
        // Send the binary data as a PDF response
        res.send(buffer);
        // res.send(data);
      } else {
        console.log('this is else part 2 ');
        // const User = await user.getById(finedTransaction.userId)
        // const SuperAdmin = await superAdmin.getById(finedTransaction.userId)
        // const financer = User.name ?? SuperAdmin.name
        let doc = new PDFDocument({ bufferPages: true });
        let buffers = [];
        doc.on("data", buffers.push.bind(buffers));
        makeTermSheet(doc, finedTransaction);
        // makeTermSheet(doc, finedTransaction,financer)
        doc.on("end", async () => {
          let pdfData = Buffer.concat(buffers);
          const filePath = `files/TermSheet-${id}.pdf`;
          fs.writeFile(filePath, pdfData, async function (err) {
            if (err) {
              console.log(err);
            } else {
              try {
                console.log("File Created");
                data = fs.readFileSync(
                  path.join(__dirname, `../files/TermSheet-${id}.pdf`),
                  "base64",
                  function (err, content) {
                    return content;
                  }
                );
                // Set the correct headers for downloading the file
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename="TermSheet.pdf"');

                return res
                  .status(httpStatus.OK)
                  .json(
                    new APIResponse(
                      { data: data },
                      "TermSheet downloaded successfully.",
                      httpStatus.OK
                    )
                  );
              } catch (e) {
                console.log(e);
              }
            }
          });
        });
      }
    } catch (e) {
      console.log(
        "-----------------------catch-------------------------------------",
        e
      );
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error in downloading TermSheet",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }




  // async download(req, res, next) {
  //   console.log(req, 'request');
  //   try {
  //     let id = req.params.id;
  //     const finedTransaction = await transaction.getById(id);

  //     if (finedTransaction && finedTransaction.termSheetURL) {
  //       // Read PDF file directly and send as binary data
  //       const pdfPath = path.resolve(__dirname, `../files/TermSheet-${id}.pdf`);
  //       const pdfData = fs.readFileSync(pdfPath);

  //       res.setHeader('Content-Type', 'application/pdf');
  //       res.setHeader('Content-Disposition', 'attachment; filename="TermSheet.pdf"');
  //       return res.send(pdfData);
  //     } else {
  //       let doc = new PDFDocument({ bufferPages: true });
  //       let buffers = [];
  //       doc.on("data", buffers.push.bind(buffers));

  //       makeTermSheet(doc, finedTransaction);
  //       doc.on("end", () => {
  //         const pdfData = Buffer.concat(buffers);

  //         res.setHeader('Content-Type', 'application/pdf');
  //         res.setHeader('Content-Disposition', 'attachment; filename="TermSheet.pdf"');
  //         res.send(pdfData);
  //       });
  //       doc.end();
  //     }
  //   } catch (e) {
  //     console.error("Error in downloading TermSheet:", e);
  //     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
  //       new APIResponse({}, "Error in downloading TermSheet", httpStatus.INTERNAL_SERVER_ERROR, e)
  //     );
  //   }
  // }

  async uploadTermSheet(req, res, next) {
    try {
      let body = req.body;
      let id = body._id;
      const updateTransaction = await transaction.updateTransaction(
        { termSheet: "Signed", termSheetURL: body.termSheetUrl },
        id
      );
      const updatedTransaction = await transaction.getById(id);
      // const data = fs.readFileSync(path.join(__dirname, '../files/TermSheet.docx'), 'base64', function (err, content) {
      //     return content;
      // });
      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(
            updatedTransaction,
            "TermSheet uploaded successfully.",
            httpStatus.OK
          )
        );
    } catch (e) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error in uploading TermSheet",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }
}
var exports = (module.exports = new transactionController());
