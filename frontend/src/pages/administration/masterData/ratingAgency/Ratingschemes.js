import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table';
// import RatingSchemesCard from '../../../../component/RatingSchemesCard'
import RatingSchemesModal from "../../../../component/Modal/RatingSchemesModal";
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import RatingSchemesCard from '../../../../component/RatingSchemesCard'
import TextEditerModal from '../../../../component/Modal/TextEditerModal';
import { useDispatch, useSelector } from 'react-redux';
import { RATINGAGENCIES, RATINGAGENCIES_GET_BY_ID, RATINGAGENCY_UPDATE } from '../../../../redux/types';
import { toast } from 'react-hot-toast'
import { ratingAgencyAddAction, ratingAgencyGetByIdAction, ratingAgencyUpdateAction } from '../../../../redux/actions/ratingAgenciesAction';

const Ratingschemes = ({ hendelCancel, hendelNext, detailData }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(window.location.search)
  const id = searchParams.get('id')
  const view = location.state ? location.state.isView : false;
  const [schemData, setSchemData] = useState([])
  const [Select, setSelect] = useState({})
  const [ratingAgencyData, setRatingAgencyData] = useState()
  const ratingAgencyAdd = useSelector(state => state.ratingAgenciesData.ratingAgencyAdd)
  const dataGetById = useSelector(state => state.ratingAgenciesData.ratingAgencyGetId)
  const ratingAgencyUpdate = useSelector(state => state.ratingAgenciesData.ratingAgencyUpdate)

  const [editModal, setEditModal] = useState(false)
  const [isView, setIsView] = useState(false)

  const ratingSchemesCard = [
    {
      grade: '',
      value: "AAA",
      acceptable: 'No',
      comments: ''
    },
    {
      grade: '',
      value: "AAA",
      acceptable: 'No',
      comments: ''
    },
    {
      grade: '',
      value: "AAA",
      acceptable: 'No',
      comments: ''
    },
    {
      grade: '',
      value: "AAA",
      acceptable: 'No',
      comments: ''
    },
    {
      grade: '',
      value: "AAA",
      acceptable: 'No',
      comments: ''
    },
    {
      grade: '',
      value: "AAA",
      acceptable: 'No',
      comments: ''
    }
  ]

  useEffect(() => {
    setRatingAgencyData(ratingAgencyAdd)
  }, [ratingAgencyAdd])

  useEffect(() => {
    console.log('dataGetById', dataGetById.data?.ratingSchema)
  }, [dataGetById])

  useEffect(() => {
    return (() => {
      dispatch({
        type: RATINGAGENCIES_GET_BY_ID,
        payload: null
      })
    })
  }, [])

  // useEffect(() => {
  //   console.log('detailData?.ratingSchema', detailData?.ratingSchema)
  //   if (detailData?.ratingSchema) {
  //     setSchemData(detailData?.ratingSchema ?? [])
  //   }
  // }, [detailData?.ratingSchema])

  useEffect(() => {
    // console.log('detailData?.ratingSchema', detailData?.ratingSchema)
    if (dataGetById?.data) {
      setSchemData(dataGetById.data?.ratingSchema ?? [])
    }
  }, [dataGetById?.data])



  useEffect(() => {
    console.log('ratingAgencyUpdate ???', ratingAgencyUpdate)
    if (ratingAgencyUpdate && ratingAgencyUpdate.status === 200) {
      toast.success(ratingAgencyUpdate.message)
      dispatch({
        type: RATINGAGENCY_UPDATE,
        payload: []
      })
      navigate('/rating-agencies')
    }
  }, [ratingAgencyUpdate])

  useEffect(() => {
    if (ratingAgencyData && ratingAgencyData.status === 200) {
      toast.success(ratingAgencyData.message)
      dispatch({
        type: RATINGAGENCIES,
        payload: []
      })
      navigate('/rating-agencies')
    }
  }, [ratingAgencyData])

  const save = () => {
    // if (validation()) {
    //   return
    // }
    let finalData = {
      ...detailData,
      ratingSchema: JSON.parse(JSON.stringify(schemData))
    }

    finalData.ratingSchema = finalData.ratingSchema.map(x => {
      delete x.tableData
      return x
    })

    finalData.ratingSchema = finalData.ratingSchema.map(x => {
      delete x._id
      return x
    })

    if (id) {
      dispatch(ratingAgencyUpdateAction(finalData, id))
    } else {
      dispatch(ratingAgencyAddAction(finalData))
    }

  }

  const setData = (data) => {
    if (Select?._id) {
      // console.log('item  id ==  ??', id)
      setSchemData(schemData.map(item => {
        // console.log('item._id ==  ??  ==', item._id)
        if (item._id === Select?._id) {
          return {
            ...data,
            _id: Select?._id
          }
        }
        return item
      }))
    } else {
      setSchemData([...schemData, data])
    }
  }

  return (
    <div className='add-edit-product'>
      <div className='product p-0'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <h5 className="title-color">Rating schemes</h5>
          <button className={`add_btn me-3 ${view ? 'd-none' : 'd-block'}`} onClick={() => setEditModal(true)}> <img src='../../assets/img/about/plus.png' className='me-2' alt='' />Add</button>
        </div>
        <MaterialTable
          title=""
          columns={[
            { title: 'Grade', field: 'grade' },
            { title: 'Value', field: 'value' },
            { title: 'Acceptable', field: 'acceptable' },
            { title: 'Comments', field: 'comments' },
          ]}
          data={schemData}
          actions={view ? [
            {
              icon: 'preview',
              tooltip: 'View Rating Schemes',
              onClick: (event, rowData) => { setEditModal(true); setSelect(rowData); setIsView(true) }
            }
          ] : [
            {
              icon: 'edit',
              tooltip: 'Edit Rating Schemes',
              onClick: (event, rowData) => { setEditModal(true); setSelect(rowData) }
            },
            {
              icon: 'preview',
              tooltip: 'View Rating Schemes',
              onClick: (event, rowData) => { setEditModal(true); setSelect(rowData); setIsView(true) }
            }
          ]}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
            sorting: true,
            pageSize: 10,
            search: false,
          }}
        />
      </div>
      <div className='footer_'>
        <button onClick={() => { hendelCancel() }} className="footer_cancel_btn">cancel</button>
        <button onClick={() => { save() }} className={`footer_next_btn ${view ? 'd-none' : 'd-block'}`}>Save</button>
      </div>
      {
        editModal && <RatingSchemesModal data={Select} viewData={isView} show={editModal} onHide={() => { setEditModal(false); setIsView(false) }} getModalData={(e) => setData(e)} />
      }


    </div>
  )
}

export default Ratingschemes