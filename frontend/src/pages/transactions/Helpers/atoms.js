// atoms.js
import { atom } from 'jotai';

//     TRANSACTION DETAILS STATE ----------------------------------------------------------------------------
export const productDetailsAtom = atom({
    nature: "",
    type: "",
    commodityType: "",
    commoditySubType: "",
    name: "",
    quantity: "",
    metric: "",
    unit: "",
    quality: "",
});

export const contractDetailsAtom = atom({
    currency: "",
    value: "",
    contractDate: "",
    expiryDate: "",
    conditionsOfContract: "",
    descriptionOfContract: "",
});

export const shippingOptionsAtom = atom({
    countryOfOrigin: "",
    portOfOrigin: "",
    airbaseOfOrigin: "",
    shipmentDate: "",
    shipmentMode: "",
    shipmentTerms: "",
    shippedWeights: "",
    destinationCountry: "",
    destinationPort: "",
    destinationAirbase: "",
    shipmentFrequency: "",
    warehouseRequired: false,
    warehouses: [],
    shippingCompany: "",
})

export const transShipmentAtom = atom({
    tranShipmentRequired: false,
    street: "",
    city: "",
    country: "",
    transShipmentQuantity: "",
    transShipmentDate: "",
})

export const pricingDetailsAtom = atom({
    pricingType: "",
    pricingAmount: "",
    pricingUnit: "",
    previousDayClosingAmount: "",
    pricingFormula: "",
    pricingHedgingStatus: false,
    pricingHedgingMethod: "",
    pricingCounterParty: "",
})
export const borrowerApplicantAtom = atom("");
export const lendersAtom = atom("");

export const shippingCompanyAtom = atom([])
export const hedgingPartyAtom = atom("")
export const hedgingStatusAtom = atom(false)
export const warehouseStatusAtom = atom(false)

export const productNameAtom = atom([])
export const countriesAtom = atom([])
export const counterPartyOptionAtom = atom([])
export const shippingCompanyOptionAtom = atom([])
export const borrowerOptionAtom = atom([])
export const lenderOptionAtom = atom([])
export const wareHouseIdAtom = atom("")
export const errorAtom = atom({})
export const selectedProductAtom = atom("")
export const editIdAtom = atom("")
export const portsOptionsAtom = atom([])
export const originCountryAtom = atom([])


// --------------KEY PARTIES  ----------------------------------------------------------------

export const tableDataAtom = atom([])
export const rowEditDataAtom = atom('')
export const relatedPartyDetailsAtom = atom([{
    'party_relation': '', 'buyer': '', 'shipper': '', 'upload_evidence':  [{}]
}])
export const keyPartiesAtom = atom([{
    'party_relation': '', 'buyer': '', 'shipper': '', 'upload_evidence': [{}]
}])
export const relationAtom = atom();
export const apiFetchedAtom = atom(false);
export const namesAtom = atom([])
export const buyersAtom = atom([])
export const partiesDataAtom = atom([])

//      ---------------- DOCUMENT FLOW  ------------------------------

export const documentFlowAtom = atom({
    _id: "",
    documentRemittance: "",
    details: ""
})

//      ---------------- FUND FLOW  ------------------------------
export const fundFlowAtom = atom({
    _id: "",
    contractCurrency: "",
    contractValue: "",

    paymentMethod: "",
    openAccount: "",

    paymentDate: "",
    terms: "",
    paymentOrigin: "",
    beneficiary: "",
    additonalCharges: false,

    payer: "",
    dutiesCurrency: "",
    dutiesValue: "",
    taxesCurrency: "",
    taxesValue: "",
    certificationCurrency: "",
    certificationValue: "",
    leviesCurrency: "",
    leviesValue: "",
})

export const contractDetailAtom = atom({
    curency: "",
    value: ""
})
export const selectedNameAtom = atom('')
export const countryAtom = atom([])
export const beneficiaryAtom = atom([])
export const lettersOfCreditAtom = atom([])

export const showTextEditorAtom = atom(false)
export const editeRowDataAtom = atom({})

// ------------------- FACILITY ------------------------

export const facilityAtom = atom({
    representations: [],
    _id: "",
    interestPeriod: "",
    baseRate: "",
    currency: "",
    interestRate: "",
    interestRateType: "",
    interestPaymentDate: "",
    rePaymentCurrency: "",
    tenor: "",
    managementFee: "",
    currencyHedge: false,
    workingCapital: "",
    disbursementMechanism: "",
    securityUndertaking: "",
    controlAccounts: "",
    documentation: "",
    specifyDocumentation: "",
    conditionsPrecedent: [],
    conditionsSubsequent: [],
    borrowerAffirmativeCovenants: [],
    financialCovenants: [],
    informationCovenants: [],
    assignments: "",
    taxationDuties: "",
    expenses: "",
    approvals: "",
    governingLaw: "",
    jurisdiction: "",
    forceMajeure: "",
    loanPurposeValidity: false,
    cancellationFee: "",
    loanPurposeReason: "",

    drawdownFee: "",
    commitmentFee: "",
    lateInterestCharges: "",
    prePayment: "",
    type: "",
    specifyFacilityType: "",
    amount: "",
    loanPurposJustification: "",
    finalMaturity: "",
    availabilityPeriod: "",
    repayment: "",
    transactionStructure: "",
    permittedAccounts: "",
    eventsOfDefault: [],
    miscellaneousProvisions: "",
    generalUndertakings: [],
    margin: "",
    agencyFee: "",
    defaultInterest: "",
    liborRate: "",
    sofrRate: "",
    otherRate: "",
    admin: ""
})

export const currencyHedgeDetailsModalAtom = atom(false)
export const addSourceOfRepaymentAtom = atom(false)
export const typeAtom = atom("")
export const addCurrencyHedgeAtom = atom([])
export const sourceOfRepaymentAtom = atom([])
export const securityDocumentsAtom = atom([{
    type: "",
    name: "",
    file: ""
}])


// Entities


export const detailsAtom = atom({
    _id: '',
    name: '',
    country: '',
    registrationNumber: '',
    dateOfIncorporation: '',
    sector: '',
    subSector: '',
    mainActivity: '',
})
export const billingAddressAtom = atom({
    _id: '',
    type: 'Biling',
    flatNumber: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    postcode: '',
    state: '',
    city: '',
    billingCountryCode: '',
    country: '',
    mobile: '',
    telephone: '',
    fax: '',
    email: '',
})
export const shippingAddressAtom = atom({
    _id: '',
    type: 'Shipping',
    flatNumber: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    postcode: '',
    shippingCountryCode: '',
    state: '',
    city: '',
    country: '',
    mobile: '',
    telephone: '',
    fax: '',
    email: '',
})
export const countryDataAtom = atom([])
export const sectorAtom = atom([])

// USER
export const userAtom = atom({
    name: "",
    email: "",
    department: "",
    profile: "",
    createdBy: "",
});