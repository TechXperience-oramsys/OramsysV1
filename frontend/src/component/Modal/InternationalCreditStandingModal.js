import { Backdrop, Fade, Modal, TextField, Autocomplete } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap";
// import Autocomplete from "@mui/lab";
import { useDispatch, useSelector } from 'react-redux';
import { entityGetAction } from '../../redux/actions/entityAction';
import { IoCloseSharp } from "react-icons/io5";


const InternationalCreditStandingModal = ({ show, onHide, getModalData, type, data, from }) => {

  const [internationalCreditStanding, setInternationalCreditStanding] = useState({
    type: "",
    party: "",
  })
  const [parties, setParties] = useState([])

  const HedgingMethodOption = [
    'borrower',
  ]

  console.log('parties', parties)
  console.log('internationalCreditStanding?.party', internationalCreditStanding?.party)
  const counterparty = useSelector(state => state.entityData.entity)
  const dispatch = useDispatch()

  useEffect(() => {
    setParties(counterparty.data)
  }, [counterparty])

  useEffect(() => {
    if (from)
      setInternationalCreditStanding(data)
    else
      setInternationalCreditStanding(data[type])
  }, [data, from, type])

  useEffect(() => {
    dispatch(entityGetAction('Company'))
  }, [dispatch])

  // const counterpartyOptions = [
  //   'Futures',
  //   'Options',
  //   'SWAPS',
  //   'Forwards',
  //   'Other',
  // ]

  const save = (data) => {
    let newData = {
      value: data,
      name: type
    }
    getModalData(newData)
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
              <h2 id="transition-modal-title" className='modal-title'>Enter a Mitigant</h2>
              <IoCloseSharp onClick={() => onHide()} style={{ cursor: "pointer", width: "24px", height: "24px" }} />

            </div>
            <div className='add-edit-product p-0 mt-3' id="transition-modal-description" >
              <div className='form'>
                <Row>
                  <Col lg={6}>
                    <Autocomplete
                      // className='ms-3 mb-3'
                      options={HedgingMethodOption}
                      getOptionLabel={(option) => option}
                      id="disable-clearable"
                      label="Type"
                      renderInput={(params) => (
                        <TextField {...params} label="Type" variant="standard" />
                      )}
                      onChange={(event, newValue) => {
                        setInternationalCreditStanding({ ...internationalCreditStanding, type: newValue });
                      }}
                      disableClearable
                      value={internationalCreditStanding?.type}
                    />
                    {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                  </Col>

                  <Col lg={6}>
                    <Autocomplete
                      options={parties}
                      getOptionLabel={(option) => option?.details?.name}
                      id="disable-clearable"
                      label="Party"
                      renderInput={(params) => (
                        <TextField {...params} label="Party" variant="standard" />
                      )}
                      onChange={(event, newValue) => {
                        setInternationalCreditStanding({ ...internationalCreditStanding, party: newValue._id });
                      }}
                      disableClearable
                      value={(parties && internationalCreditStanding?.party) && parties.find((ele) => ele._id === internationalCreditStanding?.party)}
                    />
                    {/* {error && error?.justification && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error.justification}</span>} */}
                  </Col>
                </Row>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                <button onClick={() => save(internationalCreditStanding)} className='footer_next_btn'>Save</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      {/* {commentModal && <TextEditerModal show={commentModal} onHide={() => setCommentModal(false)} commentDone={(e) => hadleChangeModal(e)} type={type} inputName={selectedName} data={loanPurposeRisk?.justification} />} */}
    </div>
  )
}

export default InternationalCreditStandingModal