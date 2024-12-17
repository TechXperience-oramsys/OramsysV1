import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner'
import { TextField, Backdrop, Modal, Fade, Autocomplete } from '@mui/material';
import { countrieAction } from '../../redux/actions/countrieAction';
import { companydataAction } from '../../redux/actions/companydataAction';
// import { useLocation } from 'react-router-dom';

const WarehouseEditModal = ({ onHide, show, mode, editData }) => {
    const dispatch = useDispatch()
    // const location = useLocation()
    // const queryParams = new URLSearchParams(location.search)
    // const id = queryParams.get("id")

    const [countryData, setCountryData] = useState([])
    const [error, setError] = useState()
    const [warehouse, setWarehouse] = useState({
        _id: "",
        nature: "",
        name: "",
        type: "",
        city: "",
        country: "",
        governingLaw: "",
        typeOfDoc: "",
    })

    const companyData = useSelector((state) => state.companydata.companydata)

    const getoptions = [
        'Field',
        'Terminal'
    ];

    const typeOfDocumentOptions = [
        'Warrants',
        'Warehouse Reciepts (non-transferable)'
    ]

    const getNatureoption = [
        'Private',
        'Public'
    ];

    const getGoverningLawOption = [
        'Francophone',
        'Anglophone'
    ];

    useEffect(() => {
        if ((mode === "Edit" || mode === "View") && companyData.warehouses) {
            let temp = companyData.warehouses?.find((e, i) => i === editData)
            setWarehouse({
                _id: temp?._id,
                nature: temp?.nature,
                name: temp?.name,
                type: temp?.type,
                city: temp?.city,
                country: temp?.country,
                governingLaw: temp?.governingLaw,
                typeOfDoc: temp?.typeOfDoc,
            })
        }
    }, [editData, mode, companyData])

    const countries = useSelector(state => state.countryData.country)

    useEffect(() => {
        if (countries && countries.status === 200) {
            setCountryData(countries.data)
        }
    }, [countries])

    const validation = () => {
        let flag = false
        let error = {}

        if (!warehouse.nature) {
            flag = true
            error.nature = 'Please select nature!'
        }

        if (!warehouse.name) {
            flag = true
            error.name = 'Please enter name!'
        }

        if (!warehouse.type) {
            flag = true
            error.type = 'Please select type!'
        }

        if (!warehouse.city) {
            flag = true
            error.city = 'Please enter city!'
        }

        if (!warehouse.country) {
            flag = true
            error.country = 'Please select country!'
        }

        if (!warehouse.governingLaw) {
            flag = true
            error.governingLaw = 'Please select governing law'
        }
        if (!warehouse.typeOfDoc) {
            flag = true
            error.typeOfDoc = 'Please select type of warehouse document'
        }

        setError(error)
        return flag
    }

    useEffect(() => {
        dispatch(countrieAction('all'))
    }, [dispatch])

    const saveData = () => {
        if (validation()) {
            return
        }
        let warehouseId = {}
        if (warehouse._id === "") {
            warehouseId = {}
        } else {
            warehouseId = { _id: warehouse._id }
        }

        const warehouseDataToSend = {
            ...warehouseId,
            nature: warehouse.nature,
            name: warehouse.name,
            type: warehouse.type,
            city: warehouse.city,
            country: warehouse.country,
            governingLaw: warehouse.governingLaw,
            typeOfDoc: warehouse.typeOfDoc,
        }
        const body = {
            ...companyData,
            warehouses: companyData.warehouses ? [...companyData.warehouses, warehouseDataToSend] : [warehouseDataToSend]
        }
        dispatch(companydataAction(body))
        onHide()
    }

    const edit = () => {
        if (validation()) {
            return
        }
        const body = {
            ...companyData,
            warehouses: companyData.warehouses.map((ele, i) => i === editData ? warehouse : ele)
        }
        dispatch(companydataAction(body))
        onHide()
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className='model'
                open={show}
                onClose={onHide}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={show}>
                    <div className='modal-content'>
                        <div className='d-flex justify-content-between'>
                            <h2 id="transition-modal-title" className='modal-title'>{mode} Warehouse</h2>
                            <img alt='item' src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col lg={3} className="mb-4">
                                        <Autocomplete
                                            label="Nature"
                                            id="disable-clearable"
                                            onChange={(e, newVal) => setWarehouse({ ...warehouse, nature: newVal })}
                                            getOptionLabel={(option) => option}
                                            options={getNatureoption}
                                            disableClearable
                                            renderInput={(params) => (
                                                <TextField {...params} label="Nature" variant="standard" />
                                            )}
                                            value={(getNatureoption.length && warehouse.nature) ? getNatureoption.find(item => item === warehouse?.nature) : null}
                                            disabled={mode === "View"}
                                        />
                                        {error && error?.nature && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.nature}</span>}
                                    </Col>
                                    <Col lg={3} className="mb-4">
                                        <TextField
                                            label="Name"
                                            variant="standard"
                                            color="warning"
                                            value={warehouse.name}
                                            name='name'
                                            onChange={(e) => setWarehouse({ ...warehouse, name: e.target.value })}
                                            disabled={mode === "View"}
                                        />
                                        {error && error.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.name}</span>}
                                    </Col>
                                    <Col lg={3} className="mb-4">
                                        <Autocomplete
                                            label="Type"
                                            id="disable-clearable"
                                            onChange={(e, newVal) => setWarehouse({ ...warehouse, type: newVal })}
                                            getOptionLabel={(option) => option}
                                            options={getoptions}
                                            disableClearable
                                            renderInput={(params) => (
                                                <TextField {...params} label="Type" variant="standard" />
                                            )}
                                            value={(getoptions.length && warehouse.type) ? getoptions.find(item => item === warehouse?.type) : null}
                                            disabled={mode === "View"}
                                        />
                                        {error && error.type && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.type}</span>}
                                    </Col>
                                    <Col lg={3} className="mb-4">
                                        <TextField
                                            label="City"
                                            variant="standard"
                                            color="warning"
                                            name='city'
                                            value={warehouse.city}
                                            onChange={(e) => setWarehouse({ ...warehouse, city: e.target.value })}
                                            disabled={mode === "View"}
                                        />
                                        {error && error.city && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.city}</span>}
                                    </Col>
                                    <Col lg={6} className="mb-4">
                                        <Autocomplete
                                            label="Country"
                                            id="disable-clearable"
                                            onChange={(e, newVal) => setWarehouse({ ...warehouse, country: newVal._id })}
                                            getOptionLabel={(option) => option.name}
                                            options={countryData}
                                            disableClearable
                                            renderInput={(params) => (
                                                <TextField {...params} label="Country" variant="standard" />
                                            )}
                                            value={(countryData.length && warehouse.country) ? countryData.find(item => item._id === warehouse?.country) : null}
                                            disabled={mode === "View"}
                                        />
                                        {error && error.country && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.country}</span>}
                                    </Col>
                                    <Col lg={6} className="mb-4">
                                        <Autocomplete
                                            label="Type of warehouse document issued"
                                            id="disable-clearable"
                                            onChange={(e, newVal) => setWarehouse({ ...warehouse, governingLaw: newVal })}
                                            getOptionLabel={(option) => option}
                                            options={getGoverningLawOption}
                                            disableClearable
                                            renderInput={(params) => (
                                                <TextField {...params} label="Type of warehouse document issued" variant="standard" />
                                            )}
                                            value={(getGoverningLawOption.length && warehouse.governingLaw) ? getGoverningLawOption.find(item => item === warehouse?.governingLaw) : null}
                                            disabled={mode === "View"}
                                        />
                                        {error && error.governingLaw && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.governingLaw}</span>}
                                    </Col>
                                    <Col lg={6} className="mb-4">
                                        <Autocomplete
                                            label="Type of Warehouse document"
                                            id="disable-clearable"
                                            onChange={(e, newVal) => setWarehouse({ ...warehouse, typeOfDoc: newVal })}
                                            getOptionLabel={(option) => option}
                                            options={typeOfDocumentOptions}
                                            disableClearable
                                            renderInput={(params) => (
                                                <TextField {...params} label="Type of Waherhouse Document" variant="standard" />
                                            )}
                                            value={(typeOfDocumentOptions.length && warehouse.typeOfDoc) ? typeOfDocumentOptions.find(item => item === warehouse?.typeOfDoc) : null}
                                            disabled={mode === "View"}
                                        />
                                        {error && error.typeOfDoc && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.typeOfDoc}</span>}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                {mode !== "View" && <button onClick={() => mode === "Edit" ? edit() : saveData()} className='footer_next_btn'>{mode}</button>}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default WarehouseEditModal