import React, { useCallback, useEffect, useRef, useState } from "react"
import { Col, Row, Button, Form, InputGroup } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from "react-router-dom"
import AddWareHouseModal from "../../component/Modal/AddWareHouseModal"
import AddInsuranceModal from "../../component/Modal/AddInsuranceModal"
import MaterialTable from "material-table"
import { useDispatch, useSelector } from "react-redux"
import { productGetAction } from "../../redux/actions/productAction"
import { countrieAction } from "../../redux/actions/countrieAction"
import { CurrencyOptions } from "../../helper/common"
import { entityGetAction } from "../../redux/actions/entityAction"
import { transactionDataAction } from "../../redux/actions/transactionDataAction"
import moment from "moment"
import { airPortsAction, portsAction } from "../../redux/actions/portsAction"
import LoadingSpinner from "../../component/LoadingSpinner";
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import Select from 'react-select';
import { useAtom } from 'jotai';
import { productDetailsAtom, contractDetailsAtom, borrowerApplicantAtom, lendersAtom, shippingOptionsAtom, transShipmentAtom, pricingDetailsAtom, shippingCompanyAtom, hedgingPartyAtom, hedgingStatusAtom, warehouseStatusAtom, productNameAtom, countriesAtom, counterPartyOptionAtom, borrowerOptionAtom, lenderOptionAtom, wareHouseIdAtom, errorAtom, editIdAtom, selectedProductAtom, portsOptionsAtom, originCountryAtom, shippingCompanyOptionAtom } from '../transactions/Helpers/atoms';
import AuthStorage from "../../helper/AuthStorage"
import STORAGEKEY from "../../config/APP/app.config"


const DetailsTransaction = ({ hendelNext, onHide, show, transactionType, signalCounterParty, signalShippingCompany, signalWarehouseCompany, signalWarehouseStatus, signalContract, signalBorrower, signalLender, transaction_id, signalPricingHedgingStatus }) => {
    const navigate = useNavigate()
    let numberReg = /^[0-9\b]+$/;
    const [isLoading, setIsLoading] = useState(true);

    const [lenders, setLenders] = useAtom(lendersAtom)

    const [borrower_Applicant, setBorrower_Applicant] = useAtom(borrowerApplicantAtom)

    const [productDetails, setProductDetails] = useAtom(productDetailsAtom);

    const [contractDetails, setContractDetails] = useAtom(contractDetailsAtom);

    const [shippingOptions, setShippingOptions] = useAtom(shippingOptionsAtom)

    const [transShipmentOptions, setTransShipmentOptions] = useAtom(transShipmentAtom)

    const [pricingDetails, setPricingDetails] = useAtom(pricingDetailsAtom)

    const [loading, setLoading] = useState(false)
    const [shipping_company, setShippingCompany] = useAtom(shippingCompanyAtom)
    const [hedging_party, setHedgingParty] = useAtom(hedgingPartyAtom)
    const [hedging_status, setHedgingStatus] = useAtom(hedgingStatusAtom)
    const [warehouse_status, setWarehouseStatus] = useAtom(warehouseStatusAtom)

    const [addWarehouseModal, setAddWarehouseModal] = useState(false)
    const [addInsuranceModal, setAddInsuranceModal] = useState(false)
    const location = useLocation()
    const productType = location?.state[1]?.type
    const isView = location.state[2]?.isView
    const dispatch = useDispatch()
    const [productName, setProductName] = useAtom(productNameAtom)
    const [showTextEditModal, setShowTextEditModal] = useState(false)
    const [type, setType] = useState("")
    const [selectedName, setSelectedName] = useState("")
    const [countries, setcountries] = useAtom(countriesAtom)
    const [sendModalData, setSendModalData] = useState("")
    const [counterPartyOption, setCounterPartyOption] = useAtom(counterPartyOptionAtom)
    const [shippingCompanyOption, setShippingCompanyOption] = useAtom(shippingCompanyOptionAtom)
    const [borrowerOption, setBorrowerOption] = useAtom(borrowerOptionAtom)
    const [lenderOption, setLenderOption] = useAtom(lenderOptionAtom)
    const [wareHouseId, setWareHouseId] = useAtom(wareHouseIdAtom)
    const [error, setError] = useAtom(errorAtom)
    const [selectedProduct, setSelectedProduct] = useAtom(selectedProductAtom)
    const [editId, setEditId] = useAtom(editIdAtom)
    const [portsOptions, setPortsOptions] = useAtom(portsOptionsAtom)
    const [originCountry, setOriginCountry] = useAtom(originCountryAtom)
    // const [airPort, setAirPort] = useState([])

    const productData = useSelector((state) => state.product.product)
    const country = useSelector((state) => state.countryData.country)
    const entityData = useSelector((state) => state.entityData.entity)
    const loginData = useSelector((state) => state.login.login)
    console.log('LOGIN DATA', loginData)
    console.log('ENTITY DATA', entityData)
    // const getTransactionByIdData = useSelector(
    //     (state) => state.transactionData.getTransactionById
    // )
    const ports = useSelector((state) => state.ports.port)
    const airBase = useSelector((state) => state.airPorts.airPort)
    const [activeOnChange, setActiveOnChange] = useState('');
    const [apiCalled, setApiCalled] = useState(true);
    useEffect(() => {
        dispatch(productGetAction("all"))
        dispatch(countrieAction("all"))
        dispatch(entityGetAction("Company"))
    }, [])

    useEffect(() => {
        if (
            shippingOptions.shipmentMode === "SEA" &&
            countries.length > 0 &&
            ports?.data &&
            ports.data.length > 0
        ) {
            if (shippingOptions.countryOfOrigin) {
                let tempData = countries.find(
                    (el) => el?._id === shippingOptions.countryOfOrigin
                )?.name
                ports.data[0].country === tempData && setOriginCountry(ports.data)
            }
            if (shippingOptions.destinationCountry) {
                let tempData = countries.find(
                    (el) => el?._id === shippingOptions.destinationCountry
                )?.name
                ports.data[0].country === tempData && setPortsOptions(ports.data)
            }
        } else if (
            shippingOptions.shipmentMode === "AIR" &&
            countries.length > 0 &&
            airBase?.data &&
            airBase.data.length > 0
        ) {
            if (shippingOptions.countryOfOrigin) {
                let tempData = countries.find(
                    (el) => el?._id === shippingOptions.countryOfOrigin
                )?.name
                airBase.data[0].country === tempData && setOriginCountry(airBase.data)
            }
            if (shippingOptions.destinationCountry) {
                let tempData = countries.find(
                    (el) => el?._id === shippingOptions.destinationCountry
                )?.name
                airBase.data[0].country === tempData && setPortsOptions(airBase.data)
            }
        }
    }, [ports, airBase, countries, shippingOptions])

    useEffect(() => {
        console.log('=======airBase', airBase.data)
    }, [airBase])

    useEffect(() => {
        console.log('=======portsOptions', portsOptions)
    }, [portsOptions])

    const setPorts = (country) => {

        console.log('setPorts shippingOptions.shipmentMode', shippingOptions.shipmentMode);
        if (shippingOptions.shipmentMode === "SEA") {
            dispatch(portsAction(country))
        } else if (shippingOptions.shipmentMode === "AIR") {
            dispatch(airPortsAction(country))
        }
        setActiveOnChange('origin')
        // setApiCalled(false)
    }

    const setDestinationPorts = (country) => {
        if (shippingOptions.shipmentMode === "SEA") {
            dispatch(portsAction(country))
        } else if (shippingOptions.shipmentMode === "AIR") {
            dispatch(airPortsAction(country))
        }
        setActiveOnChange('destination')
        // setApiCalled(false)
    }

    useEffect(() => {
        if (shippingOptions.countryOfOrigin) {
            setPorts(
                countries.find((item) => item._id === shippingOptions.countryOfOrigin)
                    ?.name
            )
        }
        if (shippingOptions.destinationCountry) {
            setPorts(
                countries.find(
                    (item) => item._id === shippingOptions.destinationCountry
                )?.name
            )
        }
    }, [shippingOptions.countryOfOrigin, shippingOptions.destinationCountry])


    useEffect(() => {

        console.log('active on change', activeOnChange);

    }, [activeOnChange])

    useEffect(() => {
        let entityDetails = []
        if (entityData && entityData.data) {
            console.log('Entity DATA', entityData)

            entityData.data.forEach((ele) => {
                ele.roles.forEach(roleDetail => {
                    if (roleDetail.roleId?.roleName == "Hedge Counterparty") {
                        var temp = {
                            label: ele?.details?.name,
                            value: ele._id
                        }
                        entityDetails.push(temp)
                    } else {
                        var temp = {
                            label: ele?.details?.givenName,
                            value: ele._id
                        }
                    }
                })
            })
        }
        setCounterPartyOption(entityDetails)
        console.log("TAG HEDGE COUNTERPARTY", counterPartyOption)
    }, [entityData])

    useEffect(() => {
        let shipDetails = []
        if (entityData && entityData.data) {

            entityData.data.forEach((ele) => {
                ele.roles.forEach(roleDetail => {
                    if (roleDetail.roleId?.roleName == "Shipping Company") {
                        var temp = {
                            label: ele?.details?.name,
                            value: ele._id,
                        }
                        shipDetails.push(temp)
                    } else {
                        var temp = {
                            label: ele?.details?.givenName,
                            value: ele._id
                        }
                        // shipDetails.push(temp)
                    }
                })
            })
        }
        setShippingCompanyOption(shipDetails)
        console.log("TAG WAREHOUSE", shippingCompanyOption)
    }, [entityData])

    useEffect(() => {
        let getBuyer = []
        if (entityData && entityData.data) {

            entityData.data.forEach((ele) => {
                ele.roles.forEach(roleDetail => {
                    if (roleDetail.roleId?.roleName == "Buyer" || roleDetail.roleId?.roleName == "Seller") {
                        var temp1 = {
                            label: ele?.details?.name,
                            value: ele._id
                        }
                        getBuyer.push(temp1)
                    } else {
                        var temp1 = {
                            label: ele?.details?.givenName,
                            value: ele._id
                        }
                    }
                })
            })
        }
        setBorrowerOption(getBuyer)
        console.log("TAG BORROWER", borrowerOption, borrower_Applicant)
    }, [entityData])

    // useEffect(() => {
    //     let bankRole = []
    //     if (entityData && entityData.data) {

    //         entityData.data.map((ele) => {
    //             ele.roles.map(role => {
    //                 if (role.roleId?.roleName == "Bank") {
    //                     var temp = {
    //                         label: ele?.details?.name,
    //                         value: ele._id
    //                     }
    //                     bankRole.push(temp)
    //                 } else {
    //                     var temp = {
    //                         label: ele?.details?.givenName,
    //                         value: ele._id
    //                     }
    //                 }
    //             })
    //         })
    //     }
    //     setLenderOption(bankRole)
    //     console.log("TAG LENDER", lenderOption)
    // }, [entityData])
    JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData))
    // useEffect(() => {
    //     let bankRole = [];

    //     if (entityData && entityData.data) {
    //         entityData.data.forEach((ele) => {
    //             ele.roles.forEach((roleDetail) => {
    //                 // Check if loginData.data.admin matches entityData.data.details.entityId
    //                 if (loginData?.data?.admin === ele?.details?.entityId) {
    //                     // If there's a match, set lenderOption to the entityData.data.details.name
    //                     setLenderOption([{ label: ele?.details?.name, value: ele._id }]);
    //                 } else {
    //                     if (roleDetail.roleId?.roleName === "Bank") {
    //                         var temp = {
    //                             label: ele?.details?.name,
    //                             value: ele._id
    //                         };
    //                         bankRole.push(temp);
    //                     } else {
    //                         var temp = {
    //                             label: ele?.details?.givenName,
    //                             value: ele._id
    //                         };
    //                         bankRole.push(temp);
    //                     }
    //                 }
    //             });
    //         });

    //         // Only set lenderOption if there's no match found and bankRole is populated
    //         if (!loginData?.data.admin || !entityData.data.some(ele => loginData.data.admin === ele?.details?.entityId)) {
    //             setLenderOption(bankRole);
    //         }
    //     }

    //     console.log("TAG LENDER", lenderOption);
    // }, [entityData, loginData]);

    useEffect(() => {
        let bankRole = [];
        let lendersArray = [];
        const storedLoginData = JSON.parse(AuthStorage.getStorageData(STORAGEKEY.userData));
        const adminId = storedLoginData?.admin;

        if (entityData && entityData.data) {
            entityData.data.forEach((ele) => {
                ele.roles.forEach((roleDetail) => {
                    // Check if adminId matches entityData.data.details.entityId
                    if (adminId === ele?.details?.entityId) {
                        // If there's a match, set lenderOption to the entityData.data.details.name
                        setLenders(ele?.details?.name);
                    } else {
                        if (roleDetail.roleId?.roleName === "Bank") {
                            var temp = {
                                label: ele?.details?.name,
                                value: ele._id
                            };
                            bankRole.push(temp);
                        } else {
                            var temp = {
                                label: ele?.details?.givenName,
                                value: ele._id
                            };
                            bankRole.push(temp);
                        }
                    }
                });
            });

            // Only set lenderOption if there's no match found and bankRole is populated
            if (!adminId || !entityData.data.some(ele => adminId === ele?.details?.entityId)) {
                setLenderOption(bankRole);
            }


        }

        console.log("TAG LENDER", lenderOption);
    }, [entityData]);



    useEffect(() => {
        if (productType === "Physical") {
            setProductDetails({ ...productDetails, nature: "Physical" })
        } else {
            setProductDetails({ ...productDetails, nature: "Non-Physical" })
        }
    }, [productType])



    useEffect(() => {
        if (productName.length > 0 && productDetails.name) {
            setProductDetails({
                ...productDetails,
                metric: productName.find((ele) => ele._id === productDetails.name)?.matric,
                unit: productName.find((ele) => ele._id === productDetails.name)?.unit
            })
        }
    }, [productDetails.name, productName])

    useEffect(() => {
        if (country && country.data) {
            setcountries(country.data)
        }
    }, [country])

    const transactionDetail = useCallback(async (id) => {
        if (id) {
            await ApiGet(`transaction/getById/${id}`)
                .then((getTransactionByIdData) => {
                    let resp = getTransactionByIdData.data;
                    let respProductDetails = getTransactionByIdData.data.details.productDetails;
                    console.log('CHECK ALL DATA', getTransactionByIdData.data)
                    console.log(respProductDetails, 'prductings')

                    console.log('frm borooowed', getTransactionByIdData.data?.borrower_Applicant)
                    if (getTransactionByIdData && getTransactionByIdData.data) {
                        setEditId(getTransactionByIdData.data?.details?._id)
                        setBorrower_Applicant(getTransactionByIdData.data?.borrower_Applicant)
                        setLenders(getTransactionByIdData.data?.lenders)
                        setProductDetails({
                            nature: respProductDetails?.nature,
                            type: respProductDetails?.type,
                            commodityType:
                                respProductDetails?.commodityType,
                            commoditySubType:
                                respProductDetails
                                    ?.commoditySubType,
                            name: respProductDetails?.name?._id,
                            quantity:
                                respProductDetails?.quantity,
                            metric: respProductDetails?.metric,
                            unit: respProductDetails?.unit,

                            quality: getTransactionByIdData.data?.details?.productDetails?.quality,
                        })
                        // setProductDetails({
                        //      commoditySubType: getTransactionByIdData.data?.details?.productDetails
                        //         ?.commoditySubType
                        // })

                        setContractDetails({
                            currency:
                                getTransactionByIdData.data?.details?.contractDetails?.currency,
                            value: getTransactionByIdData.data?.details?.contractDetails?.value,
                            contractDate:
                                getTransactionByIdData.data?.details?.contractDetails?.contractDate &&
                                moment(
                                    getTransactionByIdData.data?.details?.contractDetails?.contractDate
                                ).format("YYYY-MM-DD"),
                            expiryDate:
                                getTransactionByIdData.data?.details?.contractDetails?.expiryDate &&
                                moment(
                                    getTransactionByIdData.data?.details?.contractDetails?.expiryDate
                                ).format("YYYY-MM-DD"),
                            conditionsOfContract:
                                getTransactionByIdData.data?.details?.contractDetails
                                    ?.conditionsOfContract,
                            descriptionOfContract:
                                getTransactionByIdData.data?.details?.contractDetails
                                    ?.descriptionOfContract,
                        })

                        setShippingCompany(getTransactionByIdData.data?.details?.shippingOptions
                            ?.shippingCompany?.details?.name)

                        setShippingOptions({
                            shipmentDate:
                                getTransactionByIdData.data?.details?.shippingOptions?.shipmentDate &&
                                moment(
                                    getTransactionByIdData.data?.details?.shippingOptions?.shipmentDate
                                ).format("YYYY-MM-DD"),
                            shipmentMode:
                                getTransactionByIdData.data?.details?.shippingOptions?.shipmentMode,
                            shipmentTerms:
                                getTransactionByIdData.data?.details?.shippingOptions?.shipmentTerms,
                            shippedWeights:
                                getTransactionByIdData.data?.details?.shippingOptions?.shippedWeights.toLocaleString(),
                            countryOfOrigin:
                                getTransactionByIdData.data?.details?.shippingOptions?.countryOfOrigin
                                    ?._id,
                            portOfOrigin:
                                getTransactionByIdData.data?.details?.shippingOptions?.portOfOrigin
                                    ?._id,
                            airbaseOfOrigin:
                                getTransactionByIdData.data?.details?.shippingOptions?.airbaseOfOrigin
                                    ?._id,
                            destinationCountry:
                                getTransactionByIdData.data?.details?.shippingOptions
                                    ?.destinationCountry?._id,
                            destinationPort:
                                getTransactionByIdData.data?.details?.shippingOptions?.destinationPort
                                    ?._id,
                            destinationAirbase:
                                getTransactionByIdData.data?.details?.shippingOptions
                                    ?.destinationAirbase?._id,
                            shipmentFrequency:
                                getTransactionByIdData.data?.details?.shippingOptions
                                    ?.shipmentFrequency,
                            warehouseRequired:
                                getTransactionByIdData.data?.details?.shippingOptions
                                    ?.warehouseRequired,
                            shippingCompany: getTransactionByIdData.data?.details?.shippingOptions
                                ?.shippingCompany?._id,
                            warehouses:
                                getTransactionByIdData.data?.details?.shippingOptions?.warehouses?.forEach(
                                    (item) => {
                                        return {
                                            warehouse: {
                                                value: item?.warehouse?._id,
                                                label: item?.warehouse?.name,
                                            },
                                            warehouseCompany: {
                                                value: item?.warehouseCompany?._id,
                                                label: item?.warehouseCompany?.details?.name,
                                            },
                                        }
                                    }
                                ),

                        })
                        setWarehouseStatus(getTransactionByIdData.data?.details?.shippingOptions
                            ?.warehouseRequired)

                        setTransShipmentOptions({
                            tranShipmentRequired:
                                getTransactionByIdData.data?.details?.transShipmentOptions
                                    ?.tranShipmentRequired,
                            street:
                                getTransactionByIdData.data?.details?.transShipmentOptions?.street,
                            city: getTransactionByIdData.data?.details?.transShipmentOptions?.city,
                            country:
                                getTransactionByIdData.data?.details?.transShipmentOptions?.country
                                    ?._id,
                            transShipmentQuantity:
                                getTransactionByIdData.data?.details?.transShipmentOptions
                                    ?.transShipmentQuantity,
                            transShipmentDate:
                                getTransactionByIdData.data?.details?.transShipmentOptions
                                    ?.transShipmentDate &&
                                moment(
                                    getTransactionByIdData.data?.details?.transShipmentOptions
                                        ?.transShipmentDate
                                ).format("YYYY-MM-DD"),
                        })

                        setPricingDetails({
                            pricingType:
                                getTransactionByIdData.data?.details?.pricingDetails?.pricingType,
                            pricingAmount:
                                getTransactionByIdData.data?.details?.pricingDetails?.pricingAmount.toLocaleString(),
                            pricingUnit:
                                getTransactionByIdData.data?.details?.pricingDetails?.pricingUnit,
                            previousDayClosingAmount:
                                getTransactionByIdData.data?.details?.pricingDetails
                                    ?.previousDayClosingAmount,
                            pricingFormula:
                                getTransactionByIdData.data?.details?.pricingDetails?.pricingFormula,
                            pricingHedgingStatus:
                                getTransactionByIdData.data?.details?.pricingDetails
                                    ?.pricingHedgingStatus,
                            pricingHedgingMethod:
                                getTransactionByIdData.data?.details?.pricingDetails
                                    ?.pricingHedgingMethod,
                            pricingCounterParty:
                                getTransactionByIdData.data?.details?.pricingDetails
                                    ?.pricingCounterParty?._id,
                        })
                        setHedgingParty(getTransactionByIdData.data?.details?.pricingDetails
                            ?.pricingCounterParty?.details?.name)
                        setHedgingStatus(getTransactionByIdData.data?.details?.pricingDetails
                            ?.pricingHedgingStatus)

                        if (respProductDetails.commoditySubType != undefined) {
                            let product = [];
                            productData.data.forEach((item) => {
                                // if (item.commodity_sub_type == respProductDetails.commoditySubType) {
                                //     product.push(item);
                                // }
                                if (item.category == respProductDetails.commodityType) {
                                    product.push(item);
                                }
                            })
                            setProductName(product);
                        } else {
                            if (productData && productData.data) {
                                setProductName(productData.data)
                            }
                        }
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (transaction_id) {
            transactionDetail(transaction_id);
        }
    }, [transaction_id]);


    useEffect(() => {

        if (productDetails.commoditySubType != undefined) {
            let product = []
            productData.data.forEach((item) => {
                console.log('item', item);
                console.log('productDetails', productDetails);
                // if (item.commodity_sub_type == productDetails.commoditySubType) {
                //     product.push(item);
                // }
                if (item.category == productDetails.commodityType) {
                    product.push(item);
                }
            })
            setProductName(product);
        } else {
            if (productData && productData.data) {
                setProductName(productData.data)
            }
        }
    }, [productData])

    const hadleChangeModal = (e) => {
        setContractDetails({ ...contractDetails, [e.name]: e.value })
    }

    let options = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ]

    const productTypesOption = ["Commodity"];
    //     { value: 'Commodity', label: 'Commodity' },
    //     { value: 'Other', label: 'Other' },
    // ]

    const commodityTypeOption = ["Hard", "Energy", "Soft"];
    //     { value: 'Hard', label: 'Hard' },
    //     { value: 'Energy', label: 'Energy' },
    //     { value: 'Soft', label: 'Soft' },
    // ]

    const commoditySubTypeOption =
        productDetails.commodityType === "Hard"
            ? ["Metal"]
            : productDetails.commodityType === "Energy"
                ? ["Energy"]
                : productDetails.commodityType === "Soft"
                    ? ["Agricultural"]
                    : []

    const metricOptions = ["Tonnes", "KG", "Barrels", "Carat", "Bales", "Gallons"]

    const productQualityOption = [
        { value: "Exchange traded", label: "Exchange traded" },
        { value: "Non Exchange traded", label: "Non Exchange traded" },
    ]

    const shipmentModeOptions = ["AIR", "LAND", "SEA"]
    //     { value: "AIR", label: "AIR" },
    //     { value: "LAND", label: "LAND" },
    //     { value: "SEA", label: "SEA" },
    // ]

    const portOfOriginOptions = ["Mumbai", "Chennai", "Kolkata", "Cochin"]

    const shipmentTermsOptions = [
        { value: "Free on Board  (FOB)", label: "Free on Board  (FOB)" },
        { value: "Cost Insurance and Freight (CIF)", label: "Cost Insurance and Freight (CIF)" },
        { value: "Cost and Freight (CFR)", label: "Cost and Freight (CFR)" },
        { value: "Free Alongside Ship (FAS)", label: "Free Alongside Ship (FAS)" },
    ]

    const shipmentFrequencyOptions = [
        "Not Applicable",
        "One-Off",
        "Daily",
        "Weekly",
        "Monthly",
        "Quaterly",
        "Bi-Annually",
        "Yearly",
    ]

    const hedgingMethodOption = [
        "Futures",
        "Options",
        "SWAPS",
        "Forwards",
        "Other",
    ]

    const portData = [
        "RAS AL KHAIMAH",
        "RUWAIS",
        "SHARJAH",
        "ZURKU ISLAND",
        "BOST",
        "CHAKCHARAN",
        "DARWAZ",
    ]

    let warehouseRequiredOptions = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ]

    const pricingTypeOption = ["Firm fixed price", "Price to be fixed"]

    const pricingFormulaOption = [
        "To be negotiated",
        "Reference to Exchange Price",
        "Other",
    ]

    const handleChnage = (e, name, type) => {
        if (type === "productDetails") {
            if (name === "quantity") {
                if (e.target.value === '' || e.target.value) {
                    setProductDetails({ ...productDetails, [name]: e.target.value })
                }
            }
        }
        else if (type === "contractDetails") {
            if (name === "value") {
                if (e.target.value === '' || e.target.value) {
                    setContractDetails({ ...contractDetails, [name]: e.target.value })
                }
            }
        }
        else if (type === "shippingOptions") {
            if (name === "shippedWeights") {
                if (e.target.value === '' || e.target.value) {
                    setShippingOptions({ ...shippingOptions, [name]: e.target.value })
                }
            }
        }
        else if (type === "transShipmentOptions") {
            if (name === "transShipmentQuantity") {
                if (e.target.value === '' || e.target.value) {
                    setTransShipmentOptions({ ...transShipmentOptions, [name]: e.target.value })

                }
            }
        }
        else if (type === "pricingDetails") {
            if (name === "pricingAmount" || name === "previousDayClosingAmount") {
                if (e.target.value === '' || e.target.value) {
                    setPricingDetails({ ...pricingDetails, [name]: e.target.value })
                }
            }
        }
    }

    const handleChnages = (e) => {
        setContractDetails({
            ...contractDetails,
            [e.target.name]: e.target.value,
        })
    }

    const formateCurrencyValue = (data) => {
        if (data) {
            let value = data.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            // let prefix = CurrencyOptions.find((ele) => ele.label === contractDetails?.currency)?.prefix
            // let suffix = CurrencyOptions.find((ele) => ele.label === contractDetails?.currency)?.suffix
            // return prefix ? (prefix + value) : suffix ? (value + suffix) : value
            return value
        } else {
            return data
        }
    }

    const validation = () => {
        let flag = false
        let error = {}

        if (!borrower_Applicant) {
            flag = true
            error.borrower_Applicant = "Please enter borrower applicant name!"
        }
        // if (!lenders) {
        //     flag = true
        //     error.lenders = "Please enter lenders!"
        // }
        if (!productDetails.name) {
            flag = true
            error.name = "Please enter product name!"
        }

        // if (!productDetails.type) {
        //     flag = true
        //     error.type = "Please enter type!"
        // }


        // if (productDetails.type === "Commodity" && !productDetails.commodityType) {
        //     flag = true
        //     error.commodityType = "Please enter commodity type!"
        // }

        // if (!productDetails.commoditySubType) {
        //     flag = true
        //     error.commoditySubType = "Please enter commodity sub type!"
        // }

        if (!productDetails.quantity) {
            flag = true
            error.quantity = "Please enter product quantity!"
        }

        if (!productDetails.metric) {
            flag = true
            error.metric = "Please enter metric!"
        }

        if (!productDetails.quality) {
            flag = true
            error.quality = "Please enter product Quality!"
        }

        if (!contractDetails.currency) {
            flag = true
            error.currency = "Please enter contract currency!"
        }

        if (!contractDetails.value) {
            flag = true
            error.value = "Please enter contract value!"
        }

        if (!contractDetails.contractDate) {
            flag = true
            error.contractDate = "Please enter contract date!"
        }

        if (!contractDetails.expiryDate) {
            flag = true
            error.expiryDate = "Please enter expiry date!"
        }

        if (!contractDetails.conditionsOfContract) {
            flag = true
            error.conditionsOfContract = "Please enter conditions of contract!"
        }

        if (!contractDetails.descriptionOfContract) {
            flag = true
            error.descriptionOfContract = "Please enter sescription of contract!"
        }

        if (!shippingOptions.countryOfOrigin) {
            flag = true
            error.countryOfOrigin = "Please enter country of Origin!"
        }

        if (shippingOptions.shipmentMode === "SEA") {
            if (!shippingOptions.portOfOrigin) {
                flag = true
                error.portOfOrigin = "Please enter port of origin!"
            }
        } else if (shippingOptions.shipmentMode === "AIR") {
            if (!shippingOptions.airbaseOfOrigin) {
                flag = true
                error.portOfOrigin = "Please enter port of origin!"
            }
        }

        if (!shippingOptions.shipmentDate) {
            flag = true
            error.shipmentDate = "Please enter shipment date!"
        }

        if (!shippingOptions.shipmentMode) {
            flag = true
            error.shipmentMode = "Please enter shipment mode!"
        }

        if (!shippingOptions.shipmentTerms) {
            flag = true
            error.shipmentTerms = "Please enter shipment terms!"
        }

        if (!shippingOptions.shippedWeights) {
            flag = true
            error.shippedWeights = "Please enter proipped weights!"
        }

        if (!shippingOptions.destinationCountry) {
            flag = true
            error.destinationCountry = "Please enter destination country!"
        }

        if (shippingOptions.shipmentMode === "SEA") {
            if (!shippingOptions.destinationPort) {
                flag = true
                error.destinationPort = "Please enter destination port!"
            }
        } else if (shippingOptions.shipmentMode === "AIR") {
            if (!shippingOptions.destinationAirbase) {
                flag = true
                error.destinationPort = "Please enter destination port!"
            }
        }

        if (!shippingOptions.shipmentFrequency) {
            flag = true
            error.shipmentFrequency = "Please enter shipment frequency!"
        }

        if (shippingOptions.warehouseRequired === "") {
            flag = true
            error.warehouseRequired = "Please enter warehouse required!"
        }

        if (transShipmentOptions.tranShipmentRequired === "") {
            flag = true
            error.tranShipmentRequired = "Please enter transhipment required!"
        }

        if (transShipmentOptions.tranShipmentRequired && !transShipmentOptions.street) {
            flag = true
            error.street = "Please enter street!"
        }

        if (
            transShipmentOptions.tranShipmentRequired &&
            !transShipmentOptions.city
        ) {
            flag = true
            error.city = "Please enter city!"
        }

        if (
            transShipmentOptions.tranShipmentRequired &&
            !transShipmentOptions.country
        ) {
            flag = true
            error.country = "Please select country!"
        }

        if (
            transShipmentOptions.tranShipmentRequired &&
            !transShipmentOptions.transShipmentQuantity
        ) {
            flag = true
            error.transShipmentQuantity = "Please enter transshipment quantity (kg)!"
        }

        if (
            transShipmentOptions.tranShipmentRequired &&
            !transShipmentOptions.transShipmentDate
        ) {
            flag = true
            error.transShipmentDate = "Please enter transhipment date!"
        }

        if (!pricingDetails.pricingType) {
            flag = true
            error.pricingType = "Please enter pricing type!"
        }

        if (
            pricingDetails.pricingType === "Firm fixed price" &&
            !pricingDetails.pricingAmount
        ) {
            flag = true
            error.pricingAmount = "Please enter pricing amount!"
        }

        if (
            pricingDetails.pricingType === "Firm fixed price" &&
            !pricingDetails.previousDayClosingAmount
        ) {
            flag = true
            error.previousDayClosingAmount =
                "Please enter previous_day_closing_amount!"
        }

        if (
            pricingDetails.pricingType === "Price to be fixed" &&
            !pricingDetails.pricingFormula
        ) {
            flag = true
            error.pricingFormula = "Please enter pricing formula!"
        }

        if (
            pricingDetails.pricingType === "Price to be fixed" &&
            pricingDetails.pricingHedgingStatus === ""
        ) {
            flag = true
            error.pricingHedgingStatus = "Please enter pricing hedgeing status!"
        }

        if (
            pricingDetails.pricingHedgingStatus &&
            !pricingDetails.pricingHedgingMethod
        ) {
            flag = true
            error.pricingHedgingMethod = "Please enter hedgeing method!"
        }

        if (
            pricingDetails.pricingHedgingStatus &&
            !pricingDetails.pricingCounterParty
        ) {
            flag = true
            error.pricingCounterParty = "Please enter counter party!"
        }
        if (!shippingOptions.shippingCompany) {
            flag = true
            error.shippingCompany = "Please enter a shipping company!"
        }
        setError(error)
        return flag
    }

    const warehouseData = (data, id) => {
        console.log("Initial warehouses:", shippingOptions.warehouses);
        if (!Array.isArray(shippingOptions.warehouses)) {
            shippingOptions.warehouses = [];
        }
        if (id !== undefined) {
            setShippingOptions({
                ...shippingOptions,
                warehouses: shippingOptions.warehouses.map((ele, i) => {
                    if (i === id) {
                        return data
                    } else {
                        return ele
                    }
                }),
            })
            setWareHouseId("")
        } else {
            setShippingOptions({
                ...shippingOptions,
                warehouses: [...shippingOptions.warehouses, data],
            })
        }
        // Debugging to check the updated state of warehouses
        console.log("Updated warehouses:", shippingOptions.warehouses);

    }



    const next = () => {
        if (validation()) {
            return
        }
        if (!transShipmentOptions.tranShipmentRequired) {
            delete transShipmentOptions.city
            delete transShipmentOptions.country
            delete transShipmentOptions.street
            delete transShipmentOptions.transShipmentDate
            delete transShipmentOptions.transShipmentQuantity
        }
        if (shippingOptions.shipmentMode === "SEA") {
            delete shippingOptions.airbaseOfOrigin
            delete shippingOptions.destinationAirbase
        } else if (shippingOptions.shipmentMode === "AIR") {
            delete shippingOptions.destinationPort
            delete shippingOptions.portOfOrigin
        }
        let body = {
            details: {
                _id: editId,
                productDetails,
                contractDetails,
                shippingOptions,
                transShipmentOptions,
                pricingDetails,
            },
            borrower_Applicant,
            lenders,
            shipping_company,
            hedging_party,
            hedging_status,
            warehouse_status,
            type: transactionType,
        }


        dispatch(transactionDataAction(body))
        signalContract(body.details.contractDetails)
        signalBorrower(body.borrower_Applicant)
        signalWarehouseCompany(body.details.shippingOptions)
        signalCounterParty(body.hedging_party)
        signalPricingHedgingStatus(body.hedging_status)
        signalWarehouseStatus(body.warehouse_status)
        signalShippingCompany(body.shipping_company)
        signalLender(body.lenders)
        hendelNext()
    }

    const save = () => {

    }
    const handleCommoditySubtypeChange = (e, newVal) => {
        // let product = [];
        // productData.data.forEach((item) => {
        // if (item.commodity_sub_type == e) {
        //     product.push(item);
        // }
        // })
        // setProductName(product);
        setProductDetails({
            ...productDetails,
            commoditySubType: e,
        })
    }

    const handleCommodityTypeChange = (e, newVal) => {
        let product = [];
        productData.data.forEach((item) => {
            if (item.category == e) {
                product.push(item);
            }
        })
        setProductName(product);
        setProductDetails({
            ...productDetails,
            commodityType: e,
        })
    }
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current > moment().subtract(1, 'day');
    };
    const disabledDate2 = (current) => {
        // Can not select days before today and today
        return current < moment(contractDetails?.contractDate);
    };
    const dateFormat = 'DD/MM/YYYY'

    const productOptions = productName.map(item => ({
        value: item._id,
        label: item.name,
        unit: item.unit
    }));

    return (
        <>
            {isLoading && productDetails.length > 0 ? <LoadingSpinner /> :
                <>
                    <div className='add-edit-product'>
                        <div className=''>

                            <Row>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Borrower/Applicant</Form.Label>
                                    <Form.Select
                                        className='no-border'
                                        onChange={(e, newVal) => {
                                            setBorrower_Applicant(e.target.value);
                                        }}
                                        disabled={isView}
                                        value={borrower_Applicant}
                                    >
                                        <option value="" disabled selected>Choose...</option>
                                        {borrowerOption.map((item, i) => (
                                            <option key={i} value={item.label}>{item.label}</option>
                                        ))}
                                    </Form.Select>
                                    {error?.borrower_Applicant && (
                                        <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.borrower_Applicant}</span>
                                    )}
                                </Form.Group>
                                {/* <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Borrower/Applicant</Form.Label>
                                    <Select
                                        className='no-border'
                                        onChange={(selectedOption) => {
                                            setBorrower_Applicant(selectedOption ? selectedOption.value : '');
                                        }}
                                        isDisabled={isView}
                                        value={borrowerOption.find(option => option.value === borrower_Applicant)}
                                        options={borrowerOption}
                                        placeholder="Choose..."
                                    />
                                    {error?.borrower_Applicant && (
                                        <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.borrower_Applicant}</span>
                                    )}
                                </Form.Group> */}



                                {/* <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Lender</Form.Label>
                                    <Form.Select className='no-border'
                                        onChange={(e, newVal) => {
                                            setLenders(e.target.value);
                                            console.log(e, newVal, 'coming home')
                                        }}
                                        disabled={isView}
                                        value={lenders}>
                                        <option value="" disabled selected>Choose...</option>
                                        {lenderOption.map((item) => (
                                            <option value={item.label}>{item.label}</option>
                                        ))}

                                    </Form.Select>
                                    {error?.lenders && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.lenders}</span>
                                    )}
                                </Form.Group> */}

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Lender</Form.Label>
                                    <Form.Control className='no-border mb-3'
                                        name='lender'
                                        value={lenders}
                                        disabled={true} />
                                </Form.Group>

                            </Row>

                        </div>
                    </div>

                    <div className='m-3' />
                    <div className='add-edit-product'>
                        <div className='form'>
                            <h4 className='fw-bold fs-5 mb-3 title-admin'>PRODUCT DETAILS</h4>
                            <div>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Nature</Form.Label>
                                        <Form.Control className='no-border mb-3'
                                            name='Product_nature'
                                            value={productDetails.nature}
                                            disabled={true} />
                                    </Form.Group>

                                    {/* <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Type</Form.Label>

                                        <Select
                                            options={productTypesOption}
                                            onChange={(selectedOption) => {
                                                setProductDetails({ ...productDetails, type: selectedOption ? selectedOption.value : '' });
                                            }}
                                            isDisabled={isView}
                                            value={productTypesOption.find(option => option.value === productDetails.type)}
                                            placeholder="Choose..."

                                        />

                                        {error && error?.type && <span style={{ color: 'red' }}>{error.type}</span>}
                                    </Form.Group> */}
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Type</Form.Label>
                                        <Form.Select
                                            className='no-border'
                                            onChange={(e, newVal) =>
                                                setProductDetails({ ...productDetails, type: e.target.value })
                                            }
                                            value={productDetails.type || "Commodity"}
                                            disabled={true}
                                        >
                                            <option value="" disabled selected>Choose...</option>
                                            {productTypesOption.map((item, i) => (
                                                <option key={i} value={item}>{item}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.type && <span style={{ color: 'red' }}>{error.type}</span>}
                                    </Form.Group>



                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Commodity Type</Form.Label>
                                        {/* <Select
                                            options={commodityTypeOption}
                                            onChange={(selectedOption) => {
                                                setProductDetails({ ...productDetails, commodityType: selectedOption ? selectedOption.value : '' });
                                            }}
                                            isDisabled={isView}
                                            value={commodityTypeOption.find(option => option.value === productDetails.commodityType)}
                                            placeholder="Choose..."

                                        /> */}
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) => {
                                                handleCommodityTypeChange(e.target.value, newVal);
                                            }}
                                            disabled={isView}
                                            value={productDetails.commodityType}>

                                            <option value="" disabled selected>Choose...</option>
                                            {commodityTypeOption.map((item, i) => (
                                                <option key={i} value={item}>{item}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.commodityType && <span style={{ color: 'red' }}>{error.commodityType}</span>}
                                    </Form.Group>

                                    {/* <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Commodity Sub-Type</Form.Label>
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) =>
                                                handleCommoditySubtypeChange(e.target.value, newVal)
                                            }
                                            disabled={isView}
                                            value={productDetails.commoditySubType}>
                                            <option value="" disabled selected>Choose...</option>
                                            {commoditySubTypeOption.map((item) => (
                                                <option key={item} value={item}>{item}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.commoditySubType && <span style={{ color: 'red' }}>{error.commoditySubType}</span>}
                                    </Form.Group> */}

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Commodity Sub-Type</Form.Label>
                                        <Form.Control className='no-border mb-3'
                                            name='commoditySubtype'
                                            value={commoditySubTypeOption}
                                            disabled={true} />
                                    </Form.Group>


                                </Row>

                                <Row>
                                    {/* <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Name</Form.Label>
                                        <Select
                                            className="no-border"
                                            onChange={(selectedOption) => {
                                                setProductDetails({ ...productDetails, name: selectedOption ? selectedOption.value : '' });
                                                setSelectedProduct(selectedOption ? selectedOption.unit : '');
                                            }}
                                            isDisabled={isView}
                                            value={productOptions.find(option => option.value === productDetails.name)}
                                            options={productOptions}
                                            placeholder="Choose..."
                                        />
                                        {error && error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                                    </Form.Group> */}

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) => {
                                                setProductDetails({ ...productDetails, name: e.target.value })
                                                setSelectedProduct(newVal?.unit ? newVal.unit : "")
                                            }}
                                            disabled={isView}
                                            value={productDetails.name}>
                                            <option value="" disabled selected>Choose...</option>
                                            {productName.map((item, i) => (
                                                <option key={i} value={item._id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.name && <span style={{ color: 'red' }}>{error.name}</span>}
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Quantity</Form.Label>
                                        <Form.Control className='no-border'
                                            name='Product_nature'
                                            value={formateCurrencyValue(productDetails.quantity)}
                                            onChange={(e) =>
                                                handleChnage(e, "quantity", "productDetails")
                                            }
                                            disabled={isView} />
                                        {error?.quantity && (<span style={{ color: "#da251e", width: "100%", textAlign: "start", }}>{error?.quantity}</span>
                                        )}
                                    </Form.Group>


                                    <Col lg={3} className='mb-3'>
                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>Product Unit</Form.Label>
                                            <Form.Control className='no-border'
                                                name='netMetric'
                                                value={productDetails.metric}
                                                onChange={(e) => handleChnage(e, "metric", "productDetails")}
                                                disabled={true} />
                                            {error?.metric && (
                                                <span style={{ color: "#da251e", width: "100%", textAlign: "start", }}>
                                                    {error?.metric}
                                                </span>
                                            )}
                                        </Form.Group>
                                        {error?.metric && (<span style={{ color: "#da251e", width: "100%", textAlign: "start", }}>{error?.metric}</span>
                                        )}
                                    </Col>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Product Quality</Form.Label>
                                        <Select
                                            options={productQualityOption}
                                            onChange={(selectedOption) => {
                                                setProductDetails({ ...productDetails, quality: selectedOption ? selectedOption.value : '' });
                                            }}
                                            isDisabled={isView}
                                            value={productQualityOption.find(option => option.value === productDetails.quality)}
                                            placeholder="Choose..."

                                        />
                                        {/* <Form.Select className='no-border'
                                            onChange={(e, newVal) => {
                                                setProductDetails({ ...productDetails, quality: e.target.value })
                                            }}
                                            disabled={isView}
                                            value={productDetails.quality}>
                                            <option value="" disabled selected>Choose...</option>
                                            {productQualityOption.map((item) => (
                                                <option value={item}>{item}</option>
                                            ))}

                                        </Form.Select> */}
                                        {error && error?.quality && <span style={{ color: 'red' }}>{error.quality}</span>}
                                    </Form.Group>


                                </Row>
                            </div>
                        </div>
                    </div>

                    <div className='m-3' />

                    <div className='add-edit-product pt-0 pb-0'>
                        <div className='form'>
                            <h4 className='fw-bold mb-3 title-admin fs-5'>CONTRACT DETAILS</h4>
                            <div>
                                <Row>
                                    {/* <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Contract Currency</Form.Label>
                                        <Select
                                            options={CurrencyOptions}
                                            onChange={(selectedOption) => {
                                                setContractDetails({ ...contractDetails, currency: selectedOption ? selectedOption.value : '' });
                                            }}
                                            isDisabled={isView}
                                            value={CurrencyOptions.find(option => option.value === contractDetails.currency)}
                                            placeholder="Choose..."
                                        />
                                        {error && error?.currency && <span style={{ color: 'red' }}>{error.currency}</span>}
                                    </Form.Group> */}
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Contract Currency</Form.Label>
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) => {
                                                setContractDetails({ ...contractDetails, currency: e.target.value, })
                                            }}
                                            value={contractDetails.currency}
                                            disabled={isView}
                                            defaultValue="Choose...">
                                            <option value="" disabled selected>Choose...</option>
                                            {CurrencyOptions.map((item, i) => (
                                                <option key={i} value={item.label}>{item.label}</option>
                                            ))}

                                        </Form.Select>
                                        {error && error?.currency && <span style={{ color: 'red' }}>{error.currency}</span>}
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Contract Value</Form.Label>
                                        <Form.Control className='no-border'
                                            value={formateCurrencyValue(contractDetails.value)}
                                            onChange={(e) => handleChnage(e, "value", "contractDetails")}
                                            disabled={isView} />
                                        {error && error?.value && <span style={{ color: 'red' }}>{error.value}</span>}
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Contract Date</Form.Label>
                                        <Form.Control className='no-border'
                                            type="date"
                                            name="contractDate"
                                            placeholder="dd-mm-yyyy"
                                            max={new Date().toISOString().split("T")[0]}
                                            value={contractDetails?.contractDate}
                                            onChange={(e) => setContractDetails({ ...contractDetails, contractDate: e.target.value })}
                                            required
                                            disabled={isView}
                                        />
                                        {error && error?.contractDate && <span style={{ color: 'red' }}>{error.contractDate}</span>}
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Expiry Date</Form.Label>
                                        <Form.Control className='no-border'
                                            type="date"
                                            name="expiryDate"
                                            placeholder="dd-mm-yyyy"
                                            min={contractDetails.contractDate ? new Date(contractDetails.contractDate).toISOString().split("T")[0]
                                                : ""}
                                            value={contractDetails.expiryDate}
                                            onChange={(e) => setContractDetails({ ...contractDetails, expiryDate: e.target.value })}
                                            required
                                            disabled={isView}
                                        />
                                        {error && error?.expiryDate && <span style={{ color: 'red' }}>{error.expiryDate}</span>}
                                    </Form.Group>

                                </Row>
                                <Row className='mt-4'>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Conditions of Contract</Form.Label>
                                        <Form.Control className='no-border'
                                            name='conditionsOfContract'
                                            value={contractDetails.conditionsOfContract}
                                            onChange={(e) => handleChnages(e)}
                                            disabled={isView} />
                                        {error && error?.conditionsOfContract && <span style={{ color: 'red' }}>{error.conditionsOfContract}</span>}
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Description of Contract</Form.Label>
                                        <Form.Control className='no-border'
                                            name='descriptionOfContract'
                                            value={contractDetails.descriptionOfContract}
                                            onChange={(e) => handleChnages(e)}
                                            disabled={isView} />
                                        {error && error?.descriptionOfContract && <span style={{ color: 'red' }}>{error.descriptionOfContract}</span>}
                                    </Form.Group>

                                </Row>
                            </div>
                        </div>
                    </div>

                    <div className='m-3' />
                    <div className='add-edit-product'>
                        <div className='p-2 m-0 form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                            <h4 className='fw-bold fs-5 mb-3 title-admin'>SHIPPING OPTIONS</h4>
                            <div>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Shipping Company</Form.Label>

                                        {/* <Select
                                            options={shippingCompanyOption}
                                            onChange={(selectedOption) => {
                                                setShippingOptions({ ...shippingOptions, shippingCompany: selectedOption ? selectedOption.value : '' });
                                                setShippingCompany(selectedOption)
                                            }}
                                            isDisabled={isView}
                                            value={shippingCompanyOption.find(option => option.value === shippingOptions.shippingCompany)}
                                            placeholder="Choose..."

                                        /> */}
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) => {
                                                setShippingOptions({ ...shippingOptions, shippingCompany: e.target.value });
                                                setShippingCompany(e.target.value)
                                            }
                                            }
                                            disabled={isView}
                                            value={shippingOptions.shippingCompany}>
                                            <option value="" disabled selected>Choose...</option>
                                            {shippingCompanyOption.map((item, i) => (
                                                <option key={i} value={item.value}>{item.label}</option>
                                            ))}

                                        </Form.Select>
                                        {error && error?.shippingCompany && <span style={{ color: 'red' }}>{error.shippingCompany}</span>}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Shipment Mode</Form.Label>
                                        {/* <Select
                                            options={shipmentModeOptions}
                                            onChange={(selectedOption) => {
                                                setShippingOptions({ ...shippingOptions, shipmentMode: selectedOption ? selectedOption.value : '' });
                                            }}
                                            isDisabled={isView}
                                            value={shipmentModeOptions.find(option => option.value === shippingOptions.shipmentMode)}
                                            placeholder="Choose..."

                                        /> */}
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) => setShippingOptions({ ...shippingOptions, shipmentMode: e.target.value })}
                                            disabled={isView}
                                            value={shippingOptions.shipmentMode}>
                                            <option value="" disabled selected>Choose...</option>
                                            {shipmentModeOptions.map((item, i) => (
                                                <option key={i} value={item}>{item}</option>
                                            ))}

                                        </Form.Select>
                                        {error && error?.shipmentMode && <span style={{ color: 'red' }}>{error.shipmentMode}</span>}
                                    </Form.Group>

                                    {/* <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Country of Origin</Form.Label>
                                        <Form.Select className='no-border'
                                            onChange={(e) => {
                                                const selectedValue = e.target.value;
                                                setShippingOptions({ ...shippingOptions, countryOfOrigin: selectedValue });

                                                // Check if newVal is defined before accessing its properties
                                                if (selectedValue) {
                                                    const selectedCountry = countries.find(country => country._id === selectedValue);
                                                    if (selectedCountry) {
                                                        setPorts(selectedCountry.name);
                                                    }
                                                }
                                            }}
                                            disabled={isView}
                                            value={shippingOptions.countryOfOrigin}>
                                            <option value="" disabled selected>Choose...</option>
                                            {countries.map((item) => (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.countryOfOrigin && <span style={{ color: 'red' }}>{error.countryOfOrigin}</span>}
                                    </Form.Group> */}

                                    {/* <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Country of Origin</Form.Label>
                                        <Select
                                            className="no-border"
                                            options={countryOptions}
                                            onChange={handleCountryChange}
                                            isDisabled={isView}
                                            value={countryOptions.find(option => option.value === shippingOptions.countryOfOrigin)}
                                            placeholder="Choose..."
                                        />
                                        {error && error.countryOfOrigin && <span style={{ color: 'red' }}>{error.countryOfOrigin}</span>}
                                    </Form.Group> */}
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Country of Origin</Form.Label>
                                        <Select
                                            className='no-border'
                                            onChange={(selectedOption) => {
                                                const selectedValue = selectedOption ? selectedOption.value : '';
                                                setShippingOptions({ ...shippingOptions, countryOfOrigin: selectedValue });

                                                if (selectedValue) {
                                                    const selectedCountry = countries.find(country => country._id === selectedValue);
                                                    if (selectedCountry) {
                                                        setPorts(selectedCountry.name);
                                                    }
                                                }
                                            }}
                                            options={countries.map(country => ({ value: country._id, label: country.name }))}
                                            isDisabled={isView} // Replace with your condition for disabling
                                            value={countries.map(country => ({
                                                value: country._id, label: country.name
                                            })).find(option => option.value === shippingOptions?.countryOfOrigin)}
                                            placeholder="Choose..."
                                        />
                                        {error && error.countryOfOrigin && <span style={{ color: 'red' }}>{error.countryOfOrigin}</span>}
                                    </Form.Group>

                                </Row>


                                <Row className="mt-4">

                                    {/* <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Port of Origin</Form.Label>
                                        <Select
                                            className='no-border'
                                            onChange={(selectedOption) => {
                                                const mode = shippingOptions.shipmentMode;
                                                if (mode === "SEA") {
                                                    setShippingOptions({ ...shippingOptions, portOfOrigin: selectedOption.value });
                                                } else if (mode === "AIR") {
                                                    setShippingOptions({ ...shippingOptions, airbaseOfOrigin: selectedOption.value });
                                                }
                                            }}
                                            isDisabled={isView}
                                            value={options.find(option =>
                                                (shippingOptions.shipmentMode === "SEA" && option.value === shippingOptions.portOfOrigin) ||
                                                (shippingOptions.shipmentMode === "AIR" && option.value === shippingOptions.airbaseOfOrigin)
                                            )}
                                            placeholder="Choose..."
                                            options={originCountry.map((item) => ({ value: item._id, label: item.name }))}
                                        />
                                        {error?.portOfOrigin && <span style={{ color: 'red' }}>{error.portOfOrigin}</span>}
                                    </Form.Group> */}
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Port of Origin</Form.Label>
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) => {
                                                const mode = shippingOptions.shipmentMode
                                                if (mode === "SEA") {
                                                    setShippingOptions({ ...shippingOptions, portOfOrigin: e.target.value })
                                                } else if (mode === "AIR") {
                                                    setShippingOptions({ ...shippingOptions, airbaseOfOrigin: e.target.value })
                                                }
                                            }}
                                            disabled={isView}
                                            value={
                                                (shippingOptions.shipmentMode === "SEA" && shippingOptions.portOfOrigin) ||
                                                (shippingOptions.shipmentMode === "AIR" && shippingOptions.airbaseOfOrigin)
                                            }>
                                            <option value="" disabled selected>Choose...</option>
                                            {originCountry.map((item, i) => (
                                                <option key={i} value={item._id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.portOfOrigin && <span style={{ color: 'red' }}>{error.portOfOrigin}</span>}
                                    </Form.Group>


                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Shipment  Date</Form.Label>
                                        <Form.Control className='no-border'
                                            type="date"
                                            name="contractDate"
                                            placeholder="DD/MM/YYYY"
                                            min={contractDetails.contractDate}
                                            max={contractDetails.expiryDate}
                                            value={shippingOptions.shipmentDate}
                                            onChange={(e) =>
                                                setShippingOptions({ ...shippingOptions, shipmentDate: e.target.value })}
                                            required
                                            disabled={isView}
                                        />
                                        {error && error?.shipmentDate && <span style={{ color: 'red' }}>{error.shipmentDate}</span>}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Shipment Terms</Form.Label>
                                        <Select
                                            options={shipmentTermsOptions}
                                            onChange={(selectedOption) => {
                                                setShippingOptions({ ...shippingOptions, shipmentTerms: selectedOption ? selectedOption.value : '' });
                                            }}
                                            isDisabled={isView}
                                            value={shipmentTermsOptions.find(option => option.value === shippingOptions.shipmentTerms)}
                                            placeholder="Choose..."

                                        />
                                        {error && error?.shipmentTerms && <span style={{ color: 'red' }}>{error.shipmentTerms}</span>}
                                    </Form.Group>

                                </Row>
                                <Row className='mt-4'>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Net Shipped Weights</Form.Label>
                                        <InputGroup>

                                            <Form.Control className='no-border'
                                                name='netShippedWeights'
                                                value={formateCurrencyValue(shippingOptions.shippedWeights)}
                                                onChange={(e) =>
                                                    handleChnage(e, "shippedWeights", "shippingOptions")
                                                }
                                                disabled={isView}
                                            />
                                            <InputGroup.Text className="bg-primary text-white">
                                                {productDetails.metric}
                                            </InputGroup.Text>
                                        </InputGroup>
                                        {error && error?.shippedWeights && <span style={{ color: 'red' }}>{error.shippedWeights}</span>}
                                    </Form.Group>

                                    {/* <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Destination country</Form.Label>
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) => {
                                                const selectedValue = e.target.value;
                                                setShippingOptions({ ...shippingOptions, destinationCountry: selectedValue, })

                                                if (selectedValue) {
                                                    const selectCountry = countries.find(country => country._id === selectedValue)
                                                    if (selectCountry) {
                                                        setPorts(selectCountry.name)
                                                    }
                                                }
                                            }}
                                            disabled={isView}
                                            value={shippingOptions.destinationCountry}>
                                            <option value="" disabled selected>Choose...</option>
                                            {countries.map((item) => (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.destinationCountry && <span style={{ color: 'red' }}>{error.destinationCountry}</span>}
                                    </Form.Group> */}

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Destination Country</Form.Label>
                                        <Select
                                            className='no-border'
                                            onChange={(selectedOption) => {
                                                const selectedValue = selectedOption ? selectedOption.value : '';
                                                setShippingOptions({ ...shippingOptions, destinationCountry: selectedValue });

                                                if (selectedValue) {
                                                    const selectedCountry = countries.find(country => country._id === selectedValue);
                                                    if (selectedCountry) {
                                                        setPorts(selectedCountry.name);
                                                    }
                                                }
                                            }}
                                            options={countries.map(country => ({ value: country._id, label: country.name }))}
                                            isDisabled={isView} // Replace with your condition for disabling
                                            value={countries.map(country => ({
                                                value: country._id, label: country.name
                                            })).find(option => option.value === shippingOptions.destinationCountry)}
                                            placeholder="Choose..."
                                        />
                                        {error && error.destinationCountry && <span style={{ color: 'red' }}>{error.destinationCountry}</span>}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Destination Port</Form.Label>
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) => {
                                                const mode = shippingOptions.shipmentMode
                                                if (mode === "SEA") {
                                                    setShippingOptions({
                                                        ...shippingOptions,
                                                        destinationPort: e.target.value,
                                                    })
                                                } else if (mode === "AIR") {
                                                    setShippingOptions({
                                                        ...shippingOptions,
                                                        destinationAirbase: e.target.value,
                                                    })
                                                }
                                            }}
                                            disabled={isView}
                                            value={
                                                (shippingOptions.shipmentMode === "SEA" && shippingOptions.destinationPort) ||
                                                (shippingOptions.shipmentMode === "AIR" && shippingOptions.destinationAirbase)
                                            }>
                                            <option value="" disabled selected>Choose...</option>
                                            {portsOptions.map((item, i) => (
                                                <option key={i} value={item._id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error?.destinationPort && <span style={{ color: 'red' }}>{error.destinationPort}</span>}
                                    </Form.Group>

                                </Row>

                                <Row className='mt-4'>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Shipment Frequency</Form.Label>
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) =>
                                                setShippingOptions({ ...shippingOptions, shipmentFrequency: e.target.value })}
                                            disabled={isView}

                                            value={shippingOptions.shipmentFrequency}>
                                            <option value="" disabled selected>Choose...</option>
                                            {shipmentFrequencyOptions.map((item, i) => (
                                                <option key={i} value={item}>{item}</option>
                                            ))}

                                        </Form.Select>
                                        {error && error?.shipmentFrequency && <span style={{ color: 'red' }}>{error.shipmentFrequency}</span>}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Warehouse required?</Form.Label>
                                        <Select
                                            options={warehouseRequiredOptions}
                                            onChange={(selectedOption) => {
                                                setShippingOptions({ ...shippingOptions, warehouseRequired: selectedOption ? selectedOption.value : '' });
                                                setWarehouseStatus(selectedOption);
                                            }}
                                            isDisabled={isView}
                                            value={warehouseRequiredOptions.find(option => option.value === shippingOptions.warehouseRequired)}
                                            placeholder="Choose..."

                                        />

                                        {/* <Form.Select className='no-border'
                                            onChange={(e) => {
                                                const newValue = e.target.value === 'true'; // Convert to boolean
                                                setShippingOptions({ ...shippingOptions, warehouseRequired: newValue });
                                                setWarehouseStatus(newValue);
                                            }}
                                            disabled={isView}
                                            value={shippingOptions.warehouseRequired.toString()}>
                                            <option value="" disabled selected>Choose...</option>
                                            {warehouseRequiredOptions.map((item, i) => (
                                                <option key={i} value={item.value}>{item.label}</option>
                                            ))}
                                        </Form.Select> */}
                                        {error && error?.warehouseRequired && <span style={{ color: 'red' }}>{error.warehouseRequired}</span>}
                                    </Form.Group>

                                </Row>
                                {shippingOptions.warehouseRequired && (
                                    <div className='product p-0'>
                                        <div className='d-flex justify-content-between mt-5 mb-3 align-items-center'>
                                            <h2 className='m-0 fw-bold title-admin fs-5'>WAREHOUSE</h2>
                                            <Button onClick={() => { setAddWarehouseModal(true) }} class='btn d-inline-flex btn-md btn-light border-base mx-1 me-3'>
                                                <span class=' pe-2'><i class="bi bi-plus pe-2 "></i></span>
                                                <span className='fw-bold'>Add</span>
                                            </Button>
                                        </div>
                                        <div>
                                            {shippingOptions.warehouses?.length > 0 ? (

                                                <MaterialTable
                                                    title=''
                                                    columns={[
                                                        { title: "Warehouse Company", field: "warehouseCompany.label" },
                                                        { title: "Warehouse", field: "warehouse.label" },
                                                    ]}
                                                    data={shippingOptions.warehouses}
                                                    actions={isView ? [
                                                        {
                                                            icon: "preview",
                                                            tooltip: "View Entities",
                                                            onClick: (e, rowData) => { },
                                                        },
                                                    ]
                                                        : [
                                                            {
                                                                icon: "edit",
                                                                tooltip: "Edit Entities",
                                                                onClick: (e, rowData) => {
                                                                    setAddWarehouseModal(true)
                                                                    setWareHouseId(rowData)
                                                                },
                                                            },
                                                            {
                                                                icon: "preview",
                                                                tooltip: "View Entities",
                                                                onClick: (e, rowData) => { },
                                                            },
                                                        ]
                                                    }
                                                    options={{
                                                        filtering: false,
                                                        actionsColumnIndex: -1,
                                                        sorting: false,
                                                        pageSize: 10,
                                                        search: false,
                                                        emptyRowsWhenPaging: false,
                                                    }}
                                                />
                                            ) : (
                                                "No data found"
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='m-3' />

                    <div className='add-edit-product pt-0 pb-0'>
                        <div className='mb-3 form'>
                            <h4 className='fw-bold mb-3 fs-5 title-admin'>TRANSHIPMENT OPTIONS</h4>
                            <div>
                                <Row>
                                    <Form.Group as={Col} lg={3} controlId="formGridZip">
                                        <Form.Label>Transhipment required?</Form.Label>
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) => {
                                                const newValue = e.target.value === 'true'; // Convert to boolean

                                                setTransShipmentOptions({
                                                    ...transShipmentOptions, tranShipmentRequired: newValue,
                                                })


                                            }}
                                            disabled={isView}
                                            value={transShipmentOptions.tranShipmentRequired.toString()}>
                                            <option value="" disabled selected>Choose...</option>
                                            {options.map((item, i) => (
                                                <option key={i} value={item.value}>{item.label}</option>
                                            ))}

                                        </Form.Select>
                                        {error && error?.tranShipmentRequired && <span style={{ color: 'red' }}>{error.tranShipmentRequired}</span>}
                                    </Form.Group>
                                </Row>

                                {transShipmentOptions.tranShipmentRequired && (
                                    <>
                                        <Row className='mt-4'>
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>House/Building Number</Form.Label>
                                                <Form.Control className='no-border'
                                                    value={transShipmentOptions.street}
                                                    name='street'
                                                    onChange={(e) =>
                                                        setTransShipmentOptions({ ...transShipmentOptions, street: e.target.value })
                                                    } />
                                                {error?.street && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.street}</span>)}
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control className='no-border'
                                                    value={transShipmentOptions.city}
                                                    name='city'
                                                    onChange={(e) =>
                                                        setTransShipmentOptions({ ...transShipmentOptions, city: e.target.value })
                                                    } />
                                                {error?.city && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.city}</span>)}
                                            </Form.Group>


                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Select className='no-border'
                                                    onChange={(e, newVal) =>
                                                        setTransShipmentOptions({ ...transShipmentOptions, country: e.target.value })
                                                    }
                                                    disabled={isView}
                                                    value={transShipmentOptions.country}>
                                                    <option value="" disabled selected>Choose...</option>
                                                    {countries.map((item, i) => (
                                                        <option key={i} value={item._id}>{item.name}</option>
                                                    ))}
                                                </Form.Select>
                                                {error && error?.country && <span style={{ color: 'red' }}>{error.country}</span>}
                                            </Form.Group>

                                        </Row>

                                        <Row className='mt-4'>
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Transshipment Quantity</Form.Label>
                                                <Form.Control className='no-border'
                                                    name='conditions_of_contract'
                                                    value={formateCurrencyValue(transShipmentOptions.transShipmentQuantity)}
                                                    disabled={isView}
                                                    onChange={(e) => handleChnage(e, "transShipmentQuantity", "transShipmentOptions")} />
                                                {error?.transShipmentQuantity && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.transShipmentQuantity}</span>)}
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Transhipment Unit</Form.Label>
                                                <Form.Control className='no-border'
                                                    name='conditions_of_contract'
                                                    value={transShipmentOptions.tranShipmentRequired && productDetails.metric}

                                                    disabled={isView || productDetails.metric} />
                                                {error?.transShipmentUnit && (<span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.transShipmentUnit}</span>)}
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Transshipment Date</Form.Label>
                                                <Form.Control className='no-border'
                                                    type="date"
                                                    name="contract_date"
                                                    placeholder="dd-mm-yyyy"
                                                    min={shippingOptions.shipmentDate}
                                                    max={contractDetails.expiryDate}
                                                    value={transShipmentOptions.transShipmentDate}
                                                    onChange={(e) => setTransShipmentOptions({ ...transShipmentOptions, transShipmentDate: e.target.value })}
                                                    required
                                                />
                                                {error && error?.transShipmentDate && <span style={{ color: 'red' }}>{error.transShipmentDate}</span>}
                                            </Form.Group>


                                        </Row>

                                    </>
                                )}

                            </div>
                        </div>
                    </div>

                    <div className='add-edit-product pt-1 pb-5'>
                        <div className='p-2 mb-3 pb-4 form' style={{ backgroundColor: "rgb(243, 243, 243)", border: "none" }}>
                            <h4 className='mb-3 fs-5 fw-bold title-admin'>PRICING DETAILS</h4>
                            <div>
                                <Row>
                                    <Form.Group as={Col} lg={pricingDetails.pricingType === "Firm fixed price"
                                        ? 3 : 4 || pricingDetails.pricingHedgingStatus === "Yes" ? 3 : 4} controlId="formGridZip">
                                        <Form.Label>Pricing Type</Form.Label>
                                        <Form.Select className='no-border'
                                            onChange={(e, newVal) =>
                                                setPricingDetails({ ...pricingDetails, pricingType: e.target.value })
                                            }
                                            disabled={isView}
                                            value={pricingDetails.pricingType}>
                                            <option value="" disabled selected>Choose...</option>
                                            {pricingTypeOption.map((item, i) => (
                                                <option key={i} value={item}>{item}</option>
                                            ))}

                                        </Form.Select>
                                        {error && error?.pricingType && <span style={{ color: 'red' }}>{error.pricingType}</span>}
                                    </Form.Group>


                                    {pricingDetails.pricingType === "Firm fixed price" && (
                                        <>
                                            <Form.Group as={Col} lg={pricingDetails.pricingType === "Firm fixed price" ? 3 : 4} controlId="formGridZip">
                                                <Form.Label>Pricing Amount</Form.Label>
                                                <Form.Control className='no-border'
                                                    value={formateCurrencyValue(pricingDetails.pricingAmount)}
                                                    name='contract_value'
                                                    onChange={(e) =>
                                                        handleChnage(e, "pricingAmount", "pricingDetails")
                                                    }
                                                    disabled={isView} />
                                                {error?.pricingAmount && (
                                                    <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.pricingAmount}</span>
                                                )}
                                            </Form.Group>

                                            <Form.Group as={Col} lg={pricingDetails.pricingType === "Firm fixed price" ? 3 : 4} controlId="formGridZip">
                                                <Form.Label>Pricing Unit</Form.Label>
                                                <Form.Control className='no-border'
                                                    value={productDetails.unit}
                                                    onChange={(e) => handleChnage(e, "unit", "productDetails")}
                                                    disabled={true} />
                                                {error && error?.value && <span style={{ color: 'red' }}>{error.value}</span>}
                                            </Form.Group>

                                            <Form.Group as={Col} lg={pricingDetails.pricingType === "Firm fixed price" ? 3 : 4} controlId="formGridZip">
                                                <Form.Label>Previous Day Closing Amount</Form.Label>
                                                <Form.Control className='no-border'
                                                    value={pricingDetails.previousDayClosingAmount}
                                                    name='previous_day_closing_amount'
                                                    onChange={(e) =>
                                                        handleChnage(e, "previousDayClosingAmount", "pricingDetails")
                                                    }
                                                    disabled={isView} />
                                                {error?.previousDayClosingAmount && (<span
                                                    style={{ color: "#da251e", width: "100%", textAlign: "start" }}>
                                                    {error?.previousDayClosingAmount}
                                                </span>
                                                )}
                                            </Form.Group>

                                        </>
                                    )}


                                    {pricingDetails.pricingType === "Price to be fixed" && (
                                        <>
                                            <Form.Group as={Col} lg={pricingDetails.pricingHedgingStatus ? 3 : 4} controlId="formGridZip">
                                                <Form.Label>Pricing Formula</Form.Label>
                                                <Form.Select className='no-border'
                                                    onChange={(e, newVal) =>
                                                        setPricingDetails({ ...pricingDetails, pricingFormula: e.target.value })
                                                    }
                                                    disabled={isView}
                                                    value={pricingDetails.pricingFormula}>
                                                    <option value="" disabled selected>Choose...</option>
                                                    {pricingFormulaOption.map((item, i) => (
                                                        <option key={i} value={item}>{item}</option>
                                                    ))}

                                                </Form.Select>
                                                {error && error?.pricingFormula && <span style={{ color: 'red' }}>{error.pricingFormula}</span>}
                                            </Form.Group>


                                            <Form.Group as={Col} lg={pricingDetails.pricingHedgingStatus ? 3 : 4} controlId="formGridZip">
                                                <Form.Label>Pricing Hedging status</Form.Label>
                                                <Form.Select className='no-border'
                                                    onChange={(e, newVal) => {
                                                        const newValue = e.target.value === 'true'; // Convert to boolean
                                                        setPricingDetails({ ...pricingDetails, pricingHedgingStatus: newValue, })
                                                        setHedgingStatus(newValue)
                                                    }}
                                                    disabled={isView}

                                                    value={pricingDetails.pricingHedgingStatus.toString()}>
                                                    <option value="" disabled selected>Choose...</option>
                                                    {warehouseRequiredOptions.map((item, i) => (
                                                        <option key={i} value={item.value}>{item.label}</option>
                                                    ))}

                                                </Form.Select>
                                                {error && error?.pricingHedgingStatus && <span style={{ color: 'red' }}>{error.pricingHedgingStatus}</span>}
                                            </Form.Group>


                                            {pricingDetails.pricingHedgingStatus && (
                                                <>
                                                    <Row className="mt-4">
                                                        <Form.Group as={Col} controlId="formGridZip">
                                                            <Form.Label>Hedging Method</Form.Label>
                                                            <Form.Select className='no-border'
                                                                onChange={(e, newVal) => setPricingDetails({ ...pricingDetails, pricingHedgingMethod: e.target.value })}
                                                                disabled={isView}
                                                                value={pricingDetails.pricingHedgingMethod}>
                                                                <option value="" disabled selected>Choose...</option>
                                                                {hedgingMethodOption.map((item, i) => (
                                                                    <option key={i} value={item}>{item}</option>
                                                                ))}

                                                            </Form.Select>
                                                            {error && error?.pricingHedgingMethod && <span style={{ color: 'red' }}>{error.pricingHedgingMethod}</span>}
                                                        </Form.Group>

                                                        <Form.Group as={Col} controlId="formGridZip">
                                                            <Form.Label>CounterParty</Form.Label>
                                                            <Form.Select className='no-border'
                                                                onChange={(e, newVal) => {
                                                                    setPricingDetails({ ...pricingDetails, pricingCounterParty: e.target.value });
                                                                    setHedgingParty(e.target.value)
                                                                }}
                                                                disabled={isView}
                                                                value={pricingDetails.pricingCounterParty}>
                                                                <option value="" disabled selected>Choose...</option>
                                                                {counterPartyOption.map((item, i) => (
                                                                    <option key={i} value={item.value}>{item.label}</option>
                                                                ))}

                                                            </Form.Select>
                                                            {error && error?.pricingCounterParty && <span style={{ color: 'red' }}>{error.pricingCounterParty}</span>}
                                                        </Form.Group>

                                                        {/* <Col lg={12}>
                                                            <Autocomplete
                                                                label='Counter party'
                                                                id='disable-clearable'
                                                                onChange={(e, newVal) => {
                                                                    setPricingDetails({ ...pricingDetails, pricingCounterParty: newVal.value });
                                                                    setHedgingParty(newVal.label)
                                                                }}
                                                                getOptionLabel={(option) => option.label || ""}
                                                                options={counterPartyOption}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label='Counterparty'
                                                                        variant='standard'
                                                                    />
                                                                )}
                                                                disabled={isView}
                                                                value={
                                                                    counterPartyOption.length > 0 &&
                                                                    pricingDetails.pricingCounterParty !==
                                                                    undefined &&
                                                                    pricingDetails.pricingCounterParty &&
                                                                    counterPartyOption.find(
                                                                        (ele) =>
                                                                            ele.value ===
                                                                            pricingDetails.pricingCounterParty
                                                                    )
                                                                }
                                                            />
                                                            {error?.pricingCounterParty && (
                                                                <span
                                                                    style={{
                                                                        color: "#da251e",
                                                                        width: "100%",
                                                                        textAlign: "start",
                                                                    }}
                                                                >
                                                                    {error?.pricingCounterParty}
                                                                </span>
                                                            )}
                                                        </Col> */}
                                                    </Row>
                                                </>
                                            )}

                                        </>
                                    )}
                                </Row>
                            </div>
                        </div>
                    </div>
                    {addWarehouseModal && (<AddWareHouseModal
                        show={addWarehouseModal} onHide={() => { setAddWarehouseModal(false); setWareHouseId("") }} wareHouseData={(e, id) => warehouseData(e, id)} wareHouseId={wareHouseId} />
                    )}
                    {/* {addWarehouseModal && <AddWareHouseModal show={addWarehouseModal} onHide={() => setAddWarehouseModal(false)} wareHouseData={(data) => setShippingOptions({ ...shippingOptions, warehouses: [...shippingOptions.warehouses, data] })} wareHouseId={wareHouseId} />} */}
                    {addInsuranceModal && (
                        <AddInsuranceModal show={addInsuranceModal} onHide={() => setAddInsuranceModal(false)} />
                    )}
                    {/* {showTextEditModal && <TextEditerModal show={showTextEditModal} onHide={() => setShowTextEditModal(false)} commentDone={(e) => hadleChangeModal(e)} data={sendModalData} type={type} inputName={selectedName} />} */}
                    <div className='footer_'>
                        <div className="d-flex justify-content-between">
                            <button onClick={() => navigate("/transactions")} className='footer_cancel_btn'> Back </button>
                            <button onClick={() => navigate("/transactions")} className='footer_cancel_btn'> Save Details </button>
                        </div>

                        <button onClick={() => next()} className='footer_next_btn'> {" "} Next</button>
                    </div>
                </>
            }
        </>
    )
}


export default DetailsTransaction

const StyleSheet = {
    container: {
    },
    closeView: { display: 'none' },
    overall: {
        width: '95%',
        margin: '0 auto',
        height: '30rem',
        backgroundColor: '#fff',
        position: 'absolute',
        border: '1px solid lightgrey',
        top: '5rem',
        left: 0,
        right: 0,
        overflowY: 'auto',
        display: 'block',
        zIndex: '3',
    },
    data: {
        padding: '0.5rem',
        fontSize: '0.9rem',
        cursor: 'pointer',
    },
    datashown: {
        padding: '0.3rem',
        borderBottom: '1px solid lightgrey',
        cursor: 'pointer',
        backgroundColor: 'blue',
        color: 'white',
    },
    input: {
        width: '100%',
        border: '1px solid lightgrey',
        padding: '1rem'
    },
    showRoom: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
    },
    roomItem: {
        padding: '0.3rem 0.4rem',
        border: '1px solid lightgrey',
        borderRadius: '999px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontSize: '0.9rem',
        backgroundColor: '#00BCD4',
        color: 'white'
    },
    cancelButton: {
        borderRadius: '999px',
        backgroundColor: '#00BCD4',
        color: 'white',
        padding: '0.01rem 0.5rem',
        cursor: 'pointer'
    },
}