import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
// import { toast } from 'sonner'
import { TextField, Backdrop, Modal, Fade, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { countrieAction } from '../../redux/actions/countrieAction';
import { companydataAction } from '../../redux/actions/companydataAction';
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { IoCloseSharp } from "react-icons/io5";


const { Dragger } = Upload;

const LicencesEditModal = ({ onHide, show, mode, editData }) => {

  const dispatch = useDispatch()
  // const location = useLocation()
  // const queryParams = new URLSearchParams(location.search)
  // const id = queryParams.get("id")

  const [licence, setLicence] = useState({
    _id: '',
    type: '',
    otherLiscenceType: '',
    number: '',
    authority: '',
    country: '',
    dateOfRating: '',
    expiryDate: '',
    evidence: ''
  })

  const typeData = [
    "Bank",
    "Import",
    "Export",
    "Other"
  ];

  const [country, setCountry] = useState([])
  const [formErrors, setFormErrors] = useState()

  const countryData = useSelector((state) => state.countryData.country)
  const companyData = useSelector((state) => state.companydata.companydata)

  useEffect(() => {
    dispatch(countrieAction("all"))
  }, [dispatch])

  useEffect(() => {
    if ((mode === "Edit" || mode === "View") && companyData.licenses) {
      let temp = companyData?.licenses?.find((e, i) => i === editData)
      setLicence({
        _id: temp?._id,
        type: temp?.type,
        otherLiscenceType: temp?.otherLiscenceType,
        number: temp?.number,
        authority: temp?.authority,
        country: temp?.country,
        dateOfRating: moment(temp?.dateOfRating).format('YYYY-MM-DD'),
        expiryDate: moment(temp?.expiryDate).format('YYYY-MM-DD'),
        evidence: temp?.evidence,
      })
    }
  }, [editData, mode, companyData])

  useEffect(() => {
    if (countryData && countryData.status === 200) {
      setCountry(countryData.data)
    }
  }, [countryData])

  const [fileList, setFileList] = useState([]);
  const handleChangeFile = (file) => {
    if (file) {
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then((res) => setLicence({ ...licence, evidence: res }));
    }
  }
  // Handle file selection and limit to 1 file
  const handleFileChange = (info) => {
    const newFileList = info.fileList.slice(-1); // Limit to 1 file
    setFileList(newFileList);
    if (newFileList.length > 0) {
      handleChangeFile(newFileList[0].originFileObj); // Call the file processing function
    }
  };

  const handleChange = (e, name) => {
    if (name === 'type' || name === 'country') {
      setLicence({ ...licence, [name]: e })
    } else if (name === 'number' || name === 'otherLiscenceType' || name === 'authority' || name === 'dateOfRating' || name === 'expiryDate') {
      setLicence({ ...licence, [name]: e.target.value })
    }
  }

  const validation = () => {
    let flag = false
    const error = {};
    if (!licence.type) {
      error.type = "Please select type!"
      flag = true
    }
    if (!licence.type === "Other" && !licence.otherLiscenceType) {
      flag = true
      error.otherLiscenceType = "Please enter other license type"
    }
    if (!licence.number) {
      error.number = "Please enter number!"
      flag = true
    }
    if (!licence.authority) {
      error.authority = "Please enter authority!"
      flag = true
    }
    if (!licence.country) {
      error.country = "Please select country!"
      flag = true
    }
    if (!licence.dateOfRating) {
      error.dateOfRating = "Please select date of rating!"
      flag = true
    }
    if (!licence.expiryDate) {
      error.expiryDate = "Please select expiry date!"
      flag = true
    }
    if (!licence.evidence) {
      error.evidence = "Please select evidence!"
      flag = true
    }
    setFormErrors(error);
    return flag
  }

  const next = () => {
    if (validation()) {
      return;
    }
    let licenceId = {}
    if (licence._id === "") {
      licenceId = {}
    } else {
      licenceId = { _id: licence._id }
    }
    const licenseToStore = {
      ...licenceId,
      type: licence.type,
      otherLiscenceType: licence.otherLiscenceType,
      number: licence.number,
      authority: licence.authority,
      country: licence.country,
      dateOfRating: licence.dateOfRating,
      expiryDate: licence.expiryDate,
      evidence: licence.evidence
    }
    const body = {
      ...companyData,
      licenses: companyData.licenses ? [...companyData.licenses, licenseToStore] : [licenseToStore]
    }
    // return console.log('body', body, licenseToStore)
    dispatch(companydataAction(body))
    onHide()
  }

  const edit = () => {
    if (validation()) {
      return;
    }
    const body = {
      ...companyData,
      licenses: companyData.licenses.map((e, i) => i === editData ? licence : e)
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
              <h2 id="transition-modal-title" className='modal-title'>{mode} Licence</h2>
              <IoCloseSharp onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />

            </div>
            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
              <div className='form'>
                <Row>
                  <Col lg={licence.type === 'Other' ? 3 : 4} className="mb-4">
                    <Autocomplete
                      label="License Type"
                      id="disable-clearable"
                      onChange={(e, newVal) => handleChange(newVal, 'type')}
                      getOptionLabel={(option) => option}
                      options={typeData}
                      disableClearable
                      renderInput={(params) => (
                        <TextField {...params} label="Type" variant="standard" />
                      )}
                      value={(typeData.length && licence.type) ? typeData.find(item => item === licence?.type) : null}
                      disabled={mode === "View"}
                    />
                    {formErrors && formErrors?.type && <span style={{ color: 'red' }}>{formErrors.type}</span>}
                  </Col>
                  {licence && licence.type === "Other" && (
                    <Col lg={licence.type === 'Other' ? 3 : 4} className="mb-4">
                      <TextField
                        label="Other License Type"
                        variant="standard"
                        color="warning"
                        name='otherProduct'
                        value={licence.otherLiscenceType}
                        onChange={(e) => handleChange(e, 'otherLiscenceType')}
                        disabled={mode === "View"}
                      />
                      {formErrors && formErrors?.otherLiscenceType && <span style={{ color: 'red' }}>{formErrors.otherLiscenceType}</span>}
                    </Col>
                  )}
                  <Col lg={licence.type === 'Other' ? 3 : 4} className="mb-4">
                    <TextField
                      label="Number"
                      variant="standard"
                      color="warning"
                      name='number'
                      value={licence.number}
                      onChange={(e) => handleChange(e, 'number')}
                      disabled={mode === "View"}
                    />
                    {formErrors && formErrors?.number && <span style={{ color: 'red' }}>{formErrors.number}</span>}
                  </Col>
                  <Col lg={licence.type === 'Other' ? 3 : 4} className="mb-4">
                    <TextField
                      label="Authority"
                      variant="standard"
                      color="warning"
                      name='authority'
                      value={licence.authority}
                      onChange={(e) => handleChange(e, 'authority')}
                      disabled={mode === "View"}
                    />
                    {formErrors && formErrors?.authority && <span style={{ color: 'red' }}>{formErrors.authority}</span>}
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} className="mb-4">
                    <Autocomplete
                      label="Country"
                      id="disable-clearable"
                      onChange={(e, newVal) => handleChange(newVal._id, 'country')}
                      getOptionLabel={(option) => option.name}
                      options={country}
                      disableClearable
                      renderInput={(params) => (
                        <TextField {...params} label="Country" variant="standard" />
                      )}
                      value={(country.length && licence.country) ? country.find(item => item._id === licence?.country) : null}
                      disabled={mode === "View"}
                    />
                    {formErrors && formErrors?.country && <span style={{ color: 'red' }}>{formErrors.country}</span>}
                  </Col>
                  <Col lg={4} sm={6} className='mb-4'>
                    <form className="" noValidate>
                      <TextField
                        id="date"
                        label="Date of License Issued"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={licence.dateOfRating}
                        onChange={(e) => handleChange(e, 'dateOfRating')}
                        disabled={mode === "View"}
                      />
                    </form>
                    {formErrors && formErrors?.dateOfRating && <span style={{ color: 'red' }}>{formErrors.dateOfRating}</span>}
                  </Col>
                  <Col lg={4} sm={6} className='mb-4'>
                    <form className="" noValidate>
                      <TextField
                        id="date"
                        label="Expiry date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={licence.expiryDate}
                        onChange={(e) => handleChange(e, 'expiryDate')}
                        disabled={mode === "View"}
                      />
                    </form>
                    {formErrors && formErrors?.expiryDate && <span style={{ color: 'red' }}>{formErrors.expiryDate}</span>}
                  </Col>
                </Row>
              </div>
              <Row>
                <Col>
                  <div className='drag-and-drop add-evidence'>
                    <Form.Item label="" name="logo" valuePropName="file" rules={[{ required: true, message: "Please upload a logo!" }]}>
                      <Dragger
                        fileList={fileList}
                        beforeUpload={() => false} // Prevent automatic upload
                        onChange={handleFileChange} // Handle file change
                        maxCount={1} // Limit to 1 file
                        className="upload">
                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                        <p className="ant-upload-text">Upload Liscence</p>
                      </Dragger>
                    </Form.Item>
                    {/* <DropzoneArea
                      Icon="none"
                      filesLimit={1}
                      showPreviews={true}
                      showPreviewsInDropzone={false}
                      useChipsForPreview
                      previewGridProps={{ container: { spacing: 1, } }}
                      dropzoneText='Upload Evidence'
                      previewText=""
                      onChange={(e) => handleChangeFile(e[0])}
                      dropzoneProps={{ disabled: mode === "View" }}
                    /> */}
                    {formErrors && formErrors?.evidence && <span style={{ color: 'red' }}>{formErrors.evidence}</span>}
                  </div>
                </Col>
              </Row>
              <div className='d-flex justify-content-between mt-4'>
                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                {mode !== "View" && <button onClick={() => { mode === 'Edit' ? edit() : next() }} className='footer_next_btn'>{mode}</button>}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default LicencesEditModal