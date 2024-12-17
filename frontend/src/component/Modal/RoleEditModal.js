import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
// import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Fade, Backdrop, Modal, Autocomplete } from '@mui/material';
import { entitiesRoleAction } from '../../redux/actions/entitiesRoleAction';
import TextEditerModal from './TextEditerModal';
import { companydataAction } from '../../redux/actions/companydataAction';
// import { useLocation } from 'react-router-dom';

const RoleEditModal = ({ onHide, show, mode, editData }) => {

    // const location = useLocation()
    // const queryParams = new URLSearchParams(location.search)
    // const id = queryParams.get("id")

    const [roles, setRoles] = useState({
        _id: "",
        roles: "",
        justification: ""
    })

    const [roleOption, setRoleOption] = useState([])
    const [commentModal, setCommentModal] = useState(false)
    const [type] = useState('')
    const [selectedName] = useState('')
    const [error, setError] = useState()
    const dispatch = useDispatch()

    const rolesData = useSelector(state => state.entityRoleData.entityRole)
    const companyData = useSelector((state) => state.companydata.companydata)

    useEffect(() => {
        if (rolesData && rolesData.status === 200) {
            setRoleOption(rolesData.data)
        }
    }, [rolesData])

    useEffect(() => {
        dispatch(entitiesRoleAction())
    }, [dispatch])

    useEffect(() => {
        if ((mode === "Edit" || mode === "View") && companyData.roles) {
            let temp = companyData.roles?.find((e, i) => i === editData)
            setRoles({
                _id: temp?._id,
                roles: temp?.roles,
                justification: temp?.justification
            })
        }
    }, [editData, mode, companyData.roles])

    const validation = () => {
        let flag = false
        let error = {}

        if (!roles.roles) {
            flag = true
            error.roles = 'Please select role!'
        }

        if (!roles.justification) {
            error.justification = 'Please enter Justification!'
        }

        setError(error)
        return flag
    }

    const hadleChangeModal = (e) => {
        setRoles({ ...roles, justification: e.value })
    }

    const save = () => {
        if (validation()) {
            return;
        }
        let body = {
            ...companyData,
            roles: companyData?.roles ? [...companyData.roles, roles] : [roles]
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
            roles: companyData.roles.map((ele, i) => i === editData ? roles : ele)
        }
        dispatch(companydataAction(body))
        onHide()
    }

    const handleChnage = (e) => {
        setRoles({
            ...roles,
            [e.target.name]: e.target.value
        })
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
                            <h2 id="transition-modal-title" className='modal-title'>{mode} Role</h2>
                            <img alt='item' src='../../assets/img/my-img/Close.png' onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col lg={6} className="mb-4">
                                        <Autocomplete
                                            label="Role"
                                            id="disable-clearable"
                                            onChange={(e, newVal) => setRoles({ ...roles, roles: newVal._id })}
                                            getOptionLabel={(option) => option.roleName}
                                            options={roleOption}
                                            disableClearable
                                            renderInput={(params) => (
                                                <TextField {...params} label="Role" variant="standard" />
                                            )}
                                            value={(roleOption.length && roles.roles) ? roleOption.find(item => item._id === roles?.roles) : null}
                                            disabled={mode === "View"}
                                        />
                                        {error && error?.roles && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.roles}</span>}
                                    </Col>
                                    <Col lg={6} className="mb-4">
                                        <TextField
                                            label="Summary"
                                            variant="standard"
                                            color="warning"
                                            name='justification'
                                            value={roles.justification}
                                            onChange={(e) => handleChnage(e)}
                                            multiline
                                            maxRows={3}
                                            // onClick={() => { mode !== "View" && setCommentModal(true); setType('Justification'); setSelectedName('justification') }}
                                            disabled={mode === "View"}
                                        />
                                        {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                {mode !== "View" && <button onClick={() => { mode === "Edit" ? edit() : save() }} className='footer_next_btn'>{mode}</button>}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {commentModal && <TextEditerModal show={commentModal} onHide={() => setCommentModal(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={roles?.justification} />}
        </div>
    )
}

export default RoleEditModal