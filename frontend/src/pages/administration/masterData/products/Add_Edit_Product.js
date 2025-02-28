import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productAddAction, productGetByIdAction, productUpdateAction } from '../../../../redux/actions/productAction';
import moment from 'moment';
import { PRODUCTADD, PRODUCT_GET_BY_ID, PRODUCT_UPDATE } from '../../../../redux/types';
import { toast } from 'sonner'

const Add_Edit_Product = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const id = searchParams.get('id')
  const location = useLocation();
  const isView = location.state?.isView

  const [state, setState] = useState({
    name: "",
    nature: "",
    family: "",
    unit: "",
    category: "",
    type: "",
    status: "",
    expiryDate: "",
    matric: "",
  });
  const [error, setError] = useState()

  const oneProductData = useSelector(state => state.product.productGetId)
  const productUpdated = useSelector(state => state.product.productUpdate)
  const productAddData = useSelector(state => state.product.productAdd)
  // const transactionData = useSelector((state) => state.transactionData.transactionData)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(productGetByIdAction(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    return (() => {
      dispatch({
        type: PRODUCT_GET_BY_ID,
        payload: null
      })
    })
  }, [dispatch])

  useEffect(() => {
    if (oneProductData && oneProductData.data) {
      setState({
        name: oneProductData.data.name,
        unit: oneProductData.data.unit,
        nature: oneProductData.data.nature,
        family: oneProductData.data.family,
        category: oneProductData.data.category,
        type: oneProductData.data.type,
        status: oneProductData.data.status,
        expiryDate: moment(oneProductData.data.expiryDate).format("YYYY-MM-DD"),
        matric: oneProductData.data.matric
      })
    }
  }, [oneProductData])



  useEffect(() => {
    if (productAddData && productAddData.status === 200) {
      dispatch({
        type: PRODUCTADD,
        payload: []
      })
      navigate('/products')
      toast.success(productAddData.message)
    }
  }, [dispatch, productAddData, navigate])

  // useEffect(() => {
  //   console.log('state', state)
  // }, [state])


  // const handleChange = (event) => {
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.value
  //   });
  // };

  const validation = () => {
    let param = false
    let error = {}
    if (!state.name) {
      param = true
      error.name = "Please enter name!"
    }
    if (!state.unit) {
      param = true
      error.unit = "Please enter unit!"
    }
    if (!state.matric) {
      param = true
      error.matric = "Please enter matric!"
    }
    if (!state.nature) {
      param = true
      error.nature = "Please select nature!"
    }
    if (!state.category) {
      param = true
      error.category = "Please select category!"
    }
    if (!state.expiryDate) {
      param = true
      error.expiryDate = "Please select expiryDate!"
    }
    if (!state.family) {
      param = true
      error.family = "Please select family!"
    }
    if (!state.type) {
      param = true
      error.type = "Please select type!"
    }
    if (!state.status) {
      param = true
      error.status = "Please enter status!"
    }
    setError(error);
    return param
  }

  // useEffect(() => {
  //   return () => {
  //     dispatch({
  //       type: PRODUCT_GET_BY_ID,
  //       payload: []
  //     })
  //   }
  // }, [])

  useEffect(() => {
    if (productUpdated && productUpdated.status === 200) {
      toast.success(productUpdated.message)
      dispatch({
        type: PRODUCT_UPDATE,
        payload: []
      })
      navigate('/products')
    }
  }, [productUpdated, dispatch, navigate])


  const saveData = () => {
    if (validation()) {
      return
    }
    if (id) {
      dispatch(productUpdateAction(state, id))
    } else {
      dispatch(productAddAction(state))
    }
  }

  const natureOptions = [
    'Physical',
    'Non Physical',
  ]

  const familyOptions = [
    'Commodity',
    'Non Commodity',
  ]

  const categoryOptions = [
    'Hard',
    'Soft',
    'Energy',
    'Manufactures',
  ]

  const typeOptions = [
    'Commodity',
  ]

  return (
    <>
      <div className='add-edit-product'>
        {/* <h5 className='text-gray mb-6'></h5> */}
        <div className='form'>
          <h4 className='fw-bold fs-5 mb-3 title-admin'>DETAILS</h4>
          <div>
            <Row className='mb-4'>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Name</Form.Label>
                <Form.Control className=''
                  value={state.name}
                  onChange={(e) => { console.log('Name changed to:', e.target.value); setState({ ...state, name: e.target.value }) }}
                  disabled={isView} />
                {error?.name && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.name}</span>}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Nature</Form.Label>
                <Form.Select className=''
                  onChange={(e) => {
                    setState({ ...state, nature: e.target.value });
                  }}
                  disabled={isView}
                  value={state.nature}>

                  <option value="" disabled selected>Choose...</option>
                  {natureOptions.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Form.Select>
                {error?.nature && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.nature}</span>}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Family</Form.Label>
                <Form.Select className=''
                  onChange={(e) => setState({ ...state, family: e.target.value })}
                  disabled={isView}
                  value={state.family}>

                  <option value="" disabled selected>Choose...</option>
                  {familyOptions.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Form.Select>
                {error?.family && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.family}</span>}
              </Form.Group>

            </Row>

            <Row className='mb-4'>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Category</Form.Label>
                <Form.Select className=''
                  onChange={(e) => setState({ ...state, category: e.target.value })}
                  disabled={isView}
                  value={state.category}>

                  <option value="" disabled selected>Choose...</option>
                  {categoryOptions.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Form.Select>
                {error?.category && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.category}</span>}
              </Form.Group>


              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Type</Form.Label>
                <Form.Select className=''
                  name='type'
                  onChange={(e) => setState({ ...state, type: e.target.value })}
                  disabled={isView}
                  value={state.type}>

                  <option value="" disabled selected>Choose...</option>
                  {typeOptions.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Form.Select>
                {error?.type && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.type}</span>}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Status</Form.Label>
                <Form.Control className=''
                  value={state.status}
                  onChange={(e) => setState({ ...state, status: e.target.value })}
                  disabled={isView} />
                {error?.status && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.status}</span>}
              </Form.Group>


            </Row>
            <Row className=''>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Expiry date</Form.Label>
                <Form.Control
                  type="date"
                  name="expiryDate"
                  placeholder="dd-mm-yyyy"
                  value={state.expiryDate} // Ensure state is correctly referenced
                  onChange={(e) => setState({ ...state, expiryDate: e.target.value })} // Fixed the typo
                  required
                />
                {error && error.expiryDate && <span style={{ color: 'red' }}>{error.expiryDate}</span>}
              </Form.Group>



              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Product Unit</Form.Label>
                <Form.Control className=''
                  value={state.unit}
                  onChange={(e) => setState({ ...state, unit: e.target.value })}
                  disabled={isView} />
                {error?.unit && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.unit}</span>}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Metric</Form.Label>
                <Form.Control className=''
                  value={state.matric}
                  onChange={(e) => setState({ ...state, matric: e.target.value })}
                  disabled={isView} />
                {error?.matric && <span style={{ color: "#da251e", width: "100%", textAlign: "start" }}>{error?.matric}</span>}
              </Form.Group>
            </Row>
          </div>
        </div>
        <div className='footer_'>
          <button onClick={() => navigate('/products')} className="footer_cancel_btn">cancel</button>
          {!isView && <button onClick={() => saveData()} className='footer_next_btn'> {id ? 'Edit' : 'Save'}</button>}
        </div>
      </div>
    </>
  )
}

export default Add_Edit_Product