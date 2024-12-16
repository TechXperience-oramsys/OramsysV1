import { Backdrop, Fade, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
// import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import { entitiesRoleAction } from '../../redux/actions/entitiesRoleAction';
import { entityGetAction } from '../../redux/actions/entityAction';
import AddEntityModal from './AddEntityModal';
import { toast } from "react-hot-toast";

import { IoCloseSharp } from "react-icons/io5";



const PartiesEditModal = ({ show, onHide, getModalData, isView, editData, tableData }) => {

    const dispatch = useDispatch()
    const [parties, setParties] = useState({
        name: "",
        type: ""
    })
    const [types, setTypes] = useState([])
    const [names, setNames] = useState([])
    const [error, setError] = useState({})
    const [addentity, setAddentity] = useState(false)

    const typeOptions = useSelector(state => state.entityRoleData.entityRole)
    const nameOption = useSelector(state => state.entityData.entity)

    useEffect(() => {
        dispatch(entitiesRoleAction())
        dispatch(entityGetAction('all'))
    }, [dispatch])

    useEffect(() => {
        if (typeOptions?.data) {
            const typeList = typeOptions.data.map(type => ({
                label: type.roleName,
                value: type._id
            }));
            setTypes(typeList);
        }
    }, [typeOptions]);

    useEffect(() => {
        if (nameOption?.data && typeOptions?.data) {
            const nameList = nameOption.data.reduce((acc, ele) => {
                ele.roles.forEach(role => {
                    if (role?.roleId?.roleName) {
                        const matchingType = typeOptions.data.find(type => type.roleName === role.roleId.roleName);
                        if (matchingType) {
                            acc.push({
                                label: ele.details.name || ele.details.givenName,
                                value: ele._id,
                                roleName: role.roleId.roleName,
                            });
                        }
                    }
                });
                return acc;
            }, []);
            setNames(nameList);
        }
    }, [nameOption, typeOptions]);

    useEffect(() => {
        if (editData) {
            setParties({
                name: { value: editData.name.value, label: editData.name.label },
                type: { value: editData.type.value, label: editData.type.label },
            })
        }
    }, [editData])


    const validation = () => {
        let flag = false
        let error = {}

        if (!parties.type) {
            flag = true
            error.type = 'Please enter type!'
            toast.error(error.type);
        }

        if (!parties.name) {
            flag = true
            error.name = 'Please enter name!'
            toast.error(error.name);
        }
        setError(error)
        return flag
    }

    // useEffect(() => {
    //     console.log('isView', isView)
    //     console.log('editData', editData)
    //     console.log('names', names)
    // }, [isView, editData, names])


    const saveData = () => {
        if (validation()) {
            return
        }
        if (editData) {
            let id = editData.tableData?.id
            getModalData(parties, id)
            onHide()
        } else {
            getModalData(parties)
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
                    <div className='modal-content'>
                        <div className='d-flex justify-content-end'>
                            {/* <h2 id="transition-modal-title" className='modal-title'>Edit Licence</h2> */}
                            <IoCloseSharp onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        </div>
                        <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
                            <div className=''>
                                <Row>
                                    <Col lg={12} className="mb-4">
                                        <Form.Group as={Col} controlId="formGridType">
                                            <Form.Label>Role</Form.Label>
                                            <Form.Select
                                                className='no-border'
                                                onChange={(e) => {
                                                    const selectedType = types.find(type => type.value === e.target.value);
                                                    setParties({ ...parties, type: selectedType });
                                                }}
                                                disabled={isView}
                                                value={parties.type.value || ""}
                                            >
                                                <option value="" disabled>Choose...</option>
                                                {types.map((item, i) => (
                                                    <option key={i} value={item.value}>{item.label}</option>
                                                ))}
                                            </Form.Select>
                                            {error?.type && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.type}</span>}
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12} className="mb-4">
                                        <Form.Group as={Col} controlId="formGridParty">
                                            <Form.Label>Party</Form.Label>
                                            <Form.Select
                                                className='no-border'
                                                onChange={(e) => {
                                                    const selectedName = names.find(name => name.value === e.target.value);
                                                    setParties({ ...parties, name: selectedName });
                                                }}
                                                disabled={isView}
                                                value={parties.name.value || ""}
                                            >
                                                <option value="" disabled>Choose...</option>
                                                {names
                                                    .filter(item => item.roleName === parties.type.label)
                                                    .map((item, i) => (
                                                        <option key={i} value={item.value}>{item.label}</option>
                                                    ))}
                                            </Form.Select>
                                            {error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.name}</span>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <div>
                                    <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                                    {!names.length && <button button onClick={() => setAddentity(true)} className="footer_next_btn ms-2">Add entity</button>}
                                </div>
                                <button onClick={() => saveData()} className={`footer_next_btn ${isView && 'd-none'}`}>Save</button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {addentity && <AddEntityModal show={addentity} onHide={() => setAddentity(false)} />}
        </div >
    )
}

export default PartiesEditModal

    // useEffect(() => {
//     if (nameOption?.data && typeOptions?.data) {
//         const nameList = nameOption.data.reduce((acc, ele) => {
//             ele.roles.forEach(role => {
//                 if (role?.roleId?.roleName) {
//                     const matchingType = typeOptions.data.find(type => type.roleName === role.roleId.roleName);
//                     if (matchingType) {
//                         acc.push({
//                             label: ele.details.name || ele.details.givenName,
//                             value: ele._id,
//                             roleName: role.roleId.roleName,
//                         });
//                     }
//                 }
//             });
//             return acc;
//         }, []);
//         setNames(nameList);
//     }
// }, [nameOption, typeOptions]);