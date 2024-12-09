import { Backdrop, Fade, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { entityRoleAddAction, entityRoleUpdateAction } from '../../redux/actions/entitiesRoleAction'
import { IoCloseSharp } from "react-icons/io5";

const EntitiesRoleAddModal = ({ show, onHide, data, formType }) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        roleName: ""
    })

    // const [addEntityRoleData, setAddEntityRoleData] = useState()
    const [error, setError] = useState()
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    // const addEntityRole = useSelector(state => state.entityRoleData.entityRoleAdd)

    // useEffect(() => {
    //     setAddEntityRoleData(addEntityRole)
    // }, [addEntityRole])

    useEffect(() => {
        if (data) {
            setState({
                roleName: data.roleName
            })
        }
    }, [data])


    const validation = () => {
        let param = false
        let error = {}

        if (!state.roleName) {
            param = true
            error.roleName = 'Please enter Entity Role!'
        }
        setError(error)
        return param
    }


    const saveData = () => {
        if (validation()) {
            return
        }
        if (formType === 'add') {
            dispatch(entityRoleAddAction(state))
            onHide()
        } else {
            dispatch(entityRoleUpdateAction(state, data._id))
            onHide()
        }
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
                    {/* <Fade > */}
                    <div className='modal-content'>
                        <div className='d-flex justify-content-between'>
                            <h2 id="transition-modal-title" className='modal-title'>Add Entity Role</h2>
                            <IoCloseSharp onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className='form'>
                                <Row>
                                    <Col className="mb-4">
                                        <TextField
                                            label="Add Entity Role"
                                            variant="standard"
                                            color="warning"
                                            name='roleName'
                                            value={state.roleName}
                                            onChange={handleChange}
                                        // disable={isView}
                                        />
                                        {error?.roleName && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.roleName}</span>}
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                <button onClick={() => saveData()} className='footer_next_btn'> Save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default EntitiesRoleAddModal 