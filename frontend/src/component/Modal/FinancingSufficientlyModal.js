import { Backdrop, Fade, Modal, TextField, InputAdornment, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { Row, Col } from "react-bootstrap";
// import Autocomplete from "@mui/lab";
import { useSelector } from 'react-redux'
import { CurrencyOptions } from '../../helper/common';
import { IoCloseSharp } from "react-icons/io5";

const FinancingSufficientlyModal = ({ show, onHide, getModalData, data }) => {
  const [financingSufficiently, setFinancingSufficiently] = useState({
    contractCurrency: "",
    contractValue: "",
    facilityCurrency: "",
    facilityAmount: "",
  });

  // const location = useLocation();
  // const isView = location.state?.isView;
  // const queryParams = new URLSearchParams(location.search);
  // const id = queryParams.get("id");

  const getTransactionByIdData = useSelector((state) => state.transactionData.getTransactionById);

  useEffect(() => {
    setFinancingSufficiently(data);
  }, [data]);

  useEffect(() => {
    if (getTransactionByIdData && getTransactionByIdData.data) {
      setFinancingSufficiently({
        contractCurrency: getTransactionByIdData.data?.details?.contractDetails?.currency || "",
        contractValue: getTransactionByIdData.data?.details?.contractDetails?.value || "",
        facilityCurrency: getTransactionByIdData.data.facility?.currency || "",
        facilityAmount: getTransactionByIdData.data.facility?.amount || "",
      });
    }
  }, [getTransactionByIdData]);

  const handleChange = (e) => {
    setFinancingSufficiently({
      ...financingSufficiently,
      [e.target.name]: e.target.value,
    });
  };

  const formateCurrencyValue = (data) => {
    if (data) {
      let value = data?.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return value;
    } else {
      return data;
    }
  };

  const save = (data) => {
    getModalData(data);
    onHide();
    console.log("Updated Data:", data);
  };

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
              <h2 id="transition-modal-title" className='modal-title'>Margin the financing sufficiently</h2>
              <IoCloseSharp onClick={onHide} style={{ cursor: "pointer", width: "24px", height: "24px" }} alt="Close" />
            </div>
            <div className='add-edit-product p-0 mt-3' id="transition-modal-description">
              <div className='form'>
                <Row>
                  <Col lg={3}>
                    <Autocomplete
                      options={CurrencyOptions}
                      getOptionLabel={(option) => option.label}
                      id="disable-clearable"
                      label="Contract currency"
                      renderInput={(params) => (
                        <TextField {...params} label="Contract currency" variant="standard" />
                      )}
                      onChange={(event, newValue) => {
                        setFinancingSufficiently({ ...financingSufficiently, contractCurrency: newValue.label });
                      }}
                      disableClearable
                      value={CurrencyOptions.find((ele) => ele.label === financingSufficiently?.contractCurrency) || null}
                    />
                  </Col>
                  <Col lg={3}>
                    <TextField
                      label="Contract Value"
                      variant="standard"
                      color="warning"
                      name='contractValue'
                      value={formateCurrencyValue(financingSufficiently?.contractValue)}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col lg={3}>
                    <Autocomplete
                      options={CurrencyOptions}
                      getOptionLabel={(option) => option?.label}
                      id="disable-clearable"
                      label="Facility currency"
                      renderInput={(params) => (
                        <TextField {...params} label="Facility currency" variant="standard" />
                      )}
                      onChange={(event, newValue) => {
                        setFinancingSufficiently({ ...financingSufficiently, facilityCurrency: newValue.label });
                      }}
                      disableClearable
                      value={CurrencyOptions.find((ele) => ele.label === financingSufficiently?.facilityCurrency) || null}
                    />
                  </Col>
                  <Col lg={3}>
                    <TextField
                      label="Facility Amount"
                      variant="standard"
                      color="warning"
                      name='facilityAmount'
                      value={formateCurrencyValue(financingSufficiently?.facilityAmount)}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col lg={3}>
                    <TextField
                      label="Loan to collateral value"
                      id="standard-start-adornment"
                      value={((parseInt(financingSufficiently?.facilityAmount?.replace(/,/g, '')) / parseInt(financingSufficiently?.contractValue?.replace(/,/g, ''))) * 100).toFixed(2) || "0.00"}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      disabled
                    />
                  </Col>
                </Row>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <button onClick={onHide} className="footer_cancel_btn">Cancel</button>
                <button onClick={() => save(financingSufficiently)} className='footer_next_btn'>Save</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export default FinancingSufficientlyModal