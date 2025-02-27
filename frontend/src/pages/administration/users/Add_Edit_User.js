import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userGetByIdAction,
  userUpdateAction,
} from "../../../redux/actions/userAction";
import { toast } from "sonner";
import { REGISTER, USER_GET_BY_ID, USER_UPDATE } from "../../../redux/types";
import { registerAction } from "../../../redux/actions/registerAction";
import { RequiredSpan } from "../../transactions/Helpers/OptionalTags";

const Add_Edit_User = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const location = useLocation();
  const isView = location.state?.isView;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const [state, setState] = React.useState({
    name: "",
    email: "",
    department: "",
    profile: "",
    createdBy: "",
  });
  const [error, setError] = useState();
  const [isActive, setIsActive] = useState(false);
  const userEdit = useSelector((state) => state.userData?.userGetId);
  const userUpdate = useSelector((state) => state.userData?.userUpdate);
  const registeredData = useSelector((state) => state.registerData.register);

  useEffect(() => {
    if (!id) {
      setState({
        name: "",
        email: "",
        department: "",
        profile: "",
        createdBy: localStorage.getItem("userId"),
      });
    } else {
      dispatch(userGetByIdAction(id));
    }
    // console.log('id=============', id)
  }, [id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch({
        type: USER_GET_BY_ID,
        payload: null,
      });
      dispatch({
        type: USER_UPDATE,
        payload: null,
      });
      dispatch({
        type: REGISTER,
        payload: null,
      });
    };
  }, [dispatch]);

  useEffect(() => {
    if (userEdit?.data && id) {
      setState((prevState) => ({
        ...prevState,
        name: userEdit.data?.name,
        email: userEdit.data?.email,
        department: userEdit.data?.department || "",
        profile: userEdit.data?.profile,
        createdBy: localStorage.getItem("userId"),
      }));
    }
  }, [userEdit, id]);

  useEffect(() => {
    if (registeredData && registeredData.status === 200) {
      toast.success(registeredData.message);
      navigate("/users");
      dispatch({
        type: USER_UPDATE,
        payload: [], // Reset user update state
      });
      dispatch({
        type: REGISTER, // Reset registration data
        payload: null, // Or [] if it's an array, just ensure it's reset properly
      });
    }
  }, [registeredData, dispatch, navigate]);


  useEffect(() => {
    if (userUpdate && userUpdate.status === 200) {
      toast.success(userUpdate.message);
      dispatch({
        type: REGISTER,
        payload: [],
      });
      navigate("/users");
    }
    // console.log("userUpdate", userUpdate);
  }, [userUpdate, dispatch, navigate]);

  const validation = () => {
    let param = false;
    let error = {};
    if (!state.name) {
      param = true;
      error.name = "Please enter name!";
    }
    if (!state.email) {
      param = true;
      error.email = "Please enter email!";
    } else {
      if (!emailReg.test(state.email)) {
        param = true;
        error.email = "Please enter a valid email!";
      }
    }
    if (!state.department) {
      param = true;
      error.department = "Please select department!";
    }
    if (!state.profile) {
      param = true;
      error.profile = "Please select profile!";
    }
    setError(error);
    return param;
  };

  const editUser = async () => {
    if (validation()) {
      return;
    }
    setLoading(true)
    if (id) {
      try {
        delete state.createdBy;
        await dispatch(userUpdateAction(state, id));

      } finally {
        setLoading(false);
      }
    }


  };
  const addUser = async () => {
    if (validation()) {
      return;
    }
    setLoading(true)
    try {
      await dispatch(registerAction(state));;
    } finally {
      setLoading(false);
    }
  };

  const profileOption = ["User", "Admin", "Tester"];

  const departmentOption = [

    "Client Relations",
    "Trade Finance",
    "Structuring and Risk Distribution",
    "Banking Operations",
    "Compliance",
    "Information Technology",
    "Finance",
    "Credit Assessment",
    "Senior Management",
    "Teller",
    "Accountant",
    "Branch Manager",
    "Investment Banker",
    "Financial Advisor",
    "Private banker",
    "Appraisal Officer"
    
  ];

  return (
    <>
      <div className="add-edit-product">
        <div className="form mt-5">
          <h4 className="fw-bold fs-5 mb-3 title-admin">USER DETAILS</h4>

          <Row>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                Name <RequiredSpan />
              </Form.Label>
              <Form.Control
                className=""
                value={state.name}
                onChange={(e) => {
                  setState({ ...state, name: e.target.value });
                }}
                disabled={id ? true : false}
              />
              {error?.name && (
                <span
                  style={{
                    color: "#da251e",
                    width: "100%",
                    textAlign: "start",
                  }}
                >
                  {error?.name}
                </span>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                Email <RequiredSpan />
              </Form.Label>
              <Form.Control
                className=""
                value={state.email}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                }}
                disabled={id ? true : false}
              />
              {error?.email && (
                <span
                  style={{
                    color: "#da251e",
                    width: "100%",
                    textAlign: "start",
                  }}
                >
                  {error?.email}
                </span>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                {" "}
                Department <RequiredSpan />{" "}
              </Form.Label>
              <Form.Select
                onChange={(e) => {
                  setState({ ...state, department: e.target.value });
                  setIsActive(true);
                }}
                disabled={isView}
                value={state.department} // Ensure state.department is updated correctly
              >
                <option value="" disabled>
                  Choose...
                </option>
                {departmentOption.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
              {error?.department && (
                <span
                  style={{
                    color: "#da251e",
                    width: "100%",
                    textAlign: "start",
                  }}
                >
                  {error?.department}
                </span>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                {" "}
                Profile <RequiredSpan />
              </Form.Label>
              <Form.Select
                className=""
                onChange={(e, newVal) => {
                  setState({ ...state, profile: e.target.value });
                  setIsActive(true);
                }}
                disabled={isView}
                value={state.profile}
              >
                <option value="" disabled defaultValue>
                  {" "}
                  Choose...
                </option>
                {profileOption.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
              {error?.profile && (
                <span
                  style={{
                    color: "#da251e",
                    width: "100%",
                    textAlign: "start",
                  }}
                >
                  {error?.profile}{" "}
                </span>
              )}
            </Form.Group>
          </Row>
        </div>

        <div className="footer_">
          <button
            onClick={() => navigate("/users")}
            className="footer_cancel_btn"
          >
            {isActive ? "Cancel" : "Back"}
          </button>
          <button
            onClick={() => {
              !id ? addUser() : editUser();
            }}
            className={`footer_next_btn ${isView ? "d-none" : "d-block"}`}
          >
            {!loading ? 'Save' :
              <div className="d-flex justify-content-center">
                <strong className="me-2">Saving...</strong>
                <div
                  className="spinner-border spinner-border-sm mt-1"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }
          </button>
        </div>
      </div>
    </>
  );
};

export default Add_Edit_User;
