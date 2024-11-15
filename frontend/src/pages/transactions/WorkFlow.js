import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Badge,
  Modal,
} from "react-bootstrap";
import {
  Formik,
  FieldArray,
  Form as FormikForm,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { API } from "../../config/API/api.config";
import {
  Table,
  Dropdown as AntDropdown,
  Button as AntButton,
  Menu,
} from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FormOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { userServices } from "../../_Services/userServices";
import AuthStorage from "../../helper/AuthStorage";
// import { DownloadOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import STORAGEKEY from "../../config/APP/app.config";
import moment from "moment";
import toast from "react-hot-toast";

const Workflow = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [workflowData, setWorkflowData] = useState(null); // Save workflow data before confirmation
  const [isPreview, setIsPreview] = useState(false)
  const [previewData, setPreviewData] = useState([])
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const [select1Value, setSelect1Value] = useState(""); // State for first select box
  const [select2Value, setSelect2Value] = useState(""); // State for second select box
  const [isRefresh, setIsRefresh] = useState(Date.now());     // State for input box

  const [formChanges, setFormChanges] = useState({});
  const [isSubmitting, setIsSubmitting] = useState({}); // Tracks submission state for each card

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;

    setFormChanges((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value !== workFlow[index][field], // Check if the value is changed
      },
    }));
  };

  const handleSelect1Change = (e, index) => {
    const value = e.target.value;
    setFormChanges((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        assignedUser: value,
      },
    }));
  };

  const handleSelect2Change = (e, index) => {
    const value = e.target.value;
    setFormChanges((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        stepName: value,
      },
    }));
  };


  const handleInputTextChange = (e, index) => {
    const value = e.target.value;
    setFormChanges((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        userRole: value,
      },
    }));
  };


  const isSubmitEnabled = (index) => {
    const currentChanges = formChanges[index] || {};
    const originalValues = workFlow[index];

    return (
      currentChanges.assignedUser !== originalValues.assignedUser ||
      currentChanges.stepName !== originalValues.stepName ||
      currentChanges.userRole !== originalValues.userRole
    );
  };

  const handleSubmitData = async (index) => {
    const updatedWorkflow = {
      _id: workFlow[index]._id,
      assignedUser: formChanges[index]?.assignedUser
        ? formChanges[index].assignedUser
        : workFlow[index].assignedUser,
      userRole: formChanges[index]?.userRole
        ? formChanges[index].userRole
        : workFlow[index].userRole,
      stepName: formChanges[index]?.stepName
        ? formChanges[index].stepName
        : workFlow[index].stepName,
    };

    setIsSubmitting((prev) => ({ ...prev, [index]: true })); // Set submitting state for this card

    try {
      const response = await fetch(`${BaseURL}api/workflow/updateWorkFlow`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWorkflow),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      fetchData()
      // Reset changes and submission state
      setFormChanges((prev) => ({
        ...prev,
        [index]: undefined,
      }));
    } catch (error) {
      console.error("Error updating workflow:", error);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [index]: false })); // Reset submitting state
    }
  };

  const BaseURL = API;
  const role = localStorage.getItem("roles")

  const [workFlow, setworkFlow] = useState(null);

  useEffect(() => {


    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after component mounts.


  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BaseURL}api/workFlow/getWorkFlow?addedBy=${currentUser?.id}`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setworkFlow(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (role == 'user' && currentUser) {
      userServices.getWorkflowData(currentUser?.email, currentUser?.admin?._id).then((res) => {
        setWorkflowData(res?.data)
      }).catch((err) => {
        console.log(err);

      })
    }
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${BaseURL}user/getUsersByAdmin?id=${currentUser?.id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data?.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, [BaseURL,isRefresh]);

  const validationSchema = Yup.object().shape({
    steps: Yup.array().of(
      Yup.object().shape({
        stepName: Yup.string().required("Step name is required"),
        assignedUser: Yup.string().required("Assigned user is required"),
        // No validation on userRole, userEmail, department, and newUser
      })
    ),
  });

  const initialValues = {
    steps: [
      {
        stepName: "",
        assignedUser: "",
        userRole: "",
        newUser: "",
        userEmail: "",
        department: "",
      },
    ],
  };

  const handleCreateWorkflow = () => {
    setShowForm(true);
  };

  const handleReset = () => {
    setShowForm(false);
  };

  const handleSubmit = (values) => {
    // Save the workflow data so it can be submitted later
    setWorkflowData(values);
    // Show confirmation modal
    setShowConfirmation(true);
  };

  const handleConfirmationSubmit = async () => {
    if (!workflowData) return;

    const updatedSteps = workflowData.steps.map((step) => {
      if (step.assignedUser === "other" && step.userEmail) {
        return { ...step, assignedUser: step.userEmail };
      }
      return step;
    });

    // Call API for steps that have a non-blank userEmail
    for (const step of updatedSteps) {
      if (step.userEmail && step.userEmail.trim() !== "") {
        const payload = {
          name: step.newUser || "Unknown", // Use new user name if available, else fallback to Unknown
          email: step.userEmail,
          department: step.department,
          profile: "User",
          createdBy: currentUser?.id, // Your Admin user ID here
        };

        try {
          const response = await fetch(
            "https://backend.oramsysdev.com/user/add_user",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.error("Error while adding user:", error);
        }
      }
    }

    // Loop over each step in the workflow data and make an API call for each one
    for (const step of workflowData.steps) {
      const payload = {
        addedBy: currentUser?.id, // Replace with the actual admin ID
        stepName: step.stepName,
        assignedUser:
          step.assignedUser === "other" ? step.userEmail : step.assignedUser,
        userRole: step.userRole,
        newUser: step.userEmail || "", // If newUser is empty, fallback to empty string
        admin: currentUser, // Replace with admin's ID if needed
      };

      try {
        const response = await fetch(
          `${BaseURL}api/workFlow/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        console.log(`Step "${step.stepName}" successfully submitted.`);
      } catch (error) {
        console.error("Error while submitting workflow step:", error);
      }
    }

    // Close confirmation modal
    setShowConfirmation(false);
    // Optionally, reset form or redirect, depending on your needs
    setShowForm(false);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const data = [
    { label: "Transaction Details", value: "details" },
    { label: "Key Parties", value: "keyParties" },
    { label: "Document Flow", value: "documentFlow" },
    { label: "Fund Flow", value: "fundFlow" },
    { label: "Facility", value: "facility" }
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      key: "name",
      render: (record) => (
        <p>{record?.userId?.name}</p>
      )
    },
    {
      title: "Email",
      key: "email",
      render: (record) => (
        <p>{record?.userId?.email}</p>
      )
    },

    {
      title: "Lender",
      dataIndex: "lenders",
      key: "lenders"
    },
    {
      title: "Borrower Applicant",
      dataIndex: "borrower_Applicant",
      key: "borrower_Applicant"
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <AntDropdown placement="bottomRight"
          overlay={
            <Menu>
              <Menu.Item
                onClick={() => {
                  setIsPreview(true)
                  setPreviewData(record?.[workflowData?.workflowDocument?.stepName]);
                }}>
                <EyeOutlined className='pe-2' /> Preview
              </Menu.Item>
              <Menu.Item disabled={record?.[workflowData?.workflowDocument?.stepName]?.flowVerified || record?.[workflowData?.workflowDocument?.stepName][0]?.flowVerified}
                onClick={() => {
                  const formData = {
                    "_id": record?.[workflowData?.workflowDocument?.stepName][0]?._id || record?.[workflowData?.workflowDocument?.stepName]?._id,
                    "type": workflowData?.workflowDocument?.stepName,
                    "userEmail": record?.userId?.email,
                    "flowName": data.find(item => item.value === workflowData?.workflowDocument?.stepName)?.label
                  }
                  userServices.updateWorkFlow(formData).then((res) => {
                    toast.success(res.data?.message)
                    setIsRefresh(Date.now())
                  }).catch((err) => {
                    toast.error(err?.response?.data?.error)
                  })
                }}>
                Verify
              </Menu.Item>
            </Menu>
          }
        >
          <AntButton>
            <EllipsisOutlined />
          </AntButton>
        </AntDropdown>
      ),
    },
  ]

  console.log(BaseURL, 'bbbababba');


  return (
    <Container className="mt-4">
      {!showForm && role !== 'user' && (
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleCreateWorkflow}>
            Create Workflow
          </Button>
        </div>
      )}

      {showForm && (
        <Card className="mt-4 p-4">
          <h3 className="mb-4">Create Workflow</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => {
              const selectedStepNames = values.steps.map(
                (step) => step.stepName
              );
              const availableStepNames = data;

              const filteredStepNames = availableStepNames.filter(
                (stepName) => !selectedStepNames.includes(stepName)
              );

              const selectedUserIds = values.steps.map(
                (step) => step.assignedUser
              );

              return (
                <FormikForm>
                  <FieldArray name="steps">
                    {({ push, remove }) => (
                      <>
                        {values.steps.map((step, index) => {
                          const availableUsers = users.filter(
                            (user) =>
                              !selectedUserIds.includes(user._id) ||
                              user._id === step.assignedUser
                          );

                          return (
                            <Card key={index} className="mb-3">
                              <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                  <Badge pill bg="info" className="me-2">
                                    Step {index + 1}
                                  </Badge>
                                </div>
                                <Row className="mb-3">
                                  <Col lg={4}>
                                    <Form.Group controlId={`stepName${index}`}>
                                      <Form.Label>Step Name</Form.Label>
                                      <Field
                                        as="select"
                                        name={`steps[${index}].stepName`}
                                        className={`form-control ${touched.steps &&
                                          touched.steps[index]?.stepName &&
                                          errors.steps &&
                                          errors.steps[index]?.stepName
                                          ? "is-invalid"
                                          : ""
                                          }`}
                                      >
                                        <option value="">Select Step</option>
                                        {availableStepNames.map(
                                          ({ label, value }) => (
                                            <option
                                              key={value}
                                              value={value}
                                              style={{
                                                display:
                                                  selectedStepNames.includes(
                                                    value
                                                  )
                                                    ? "none"
                                                    : "block",
                                              }}
                                            >
                                              {label}
                                            </option>
                                          )
                                        )}
                                      </Field>
                                      <ErrorMessage
                                        name={`steps[${index}].stepName`}
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col lg={4}>
                                    <Form.Group
                                      controlId={`assignedUser${index}`}
                                    >
                                      <Form.Label>Assigned User</Form.Label>
                                      <Field
                                        as="select"
                                        name={`steps[${index}].assignedUser`}
                                        className={`form-control ${touched.steps &&
                                          touched.steps[index]?.assignedUser &&
                                          errors.steps &&
                                          errors.steps[index]?.assignedUser
                                          ? "is-invalid"
                                          : ""
                                          }`}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setFieldValue(
                                            `steps[${index}].assignedUser`,
                                            value
                                          );
                                          if (value !== "other") {
                                            setFieldValue(
                                              `steps[${index}].newUser`,
                                              ""
                                            );
                                            setFieldValue(
                                              `steps[${index}].userEmail`,
                                              ""
                                            );
                                            setFieldValue(
                                              `steps[${index}].department`,
                                              ""
                                            );
                                          }
                                        }}
                                      >
                                        <option value="">Select User</option>
                                        {availableUsers.map((user) => (
                                          <option
                                            key={user._id}
                                            value={user._id}
                                          >
                                            {user.name}
                                          </option>
                                        ))}
                                        <option value="other">Other</option>
                                      </Field>
                                      <ErrorMessage
                                        name={`steps[${index}].assignedUser`}
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col lg={4}>
                                    <Form.Group controlId={`userRole${index}`}>
                                      <Form.Label>User Role</Form.Label>
                                      <Field
                                        type="text"
                                        name={`steps[${index}].userRole`}
                                        placeholder="Enter user role"
                                        className="form-control"
                                      />
                                    </Form.Group>
                                  </Col>
                                </Row>

                                {values.steps[index]?.assignedUser ===
                                  "other" && (
                                    <Row className="mb-3">
                                      <Col lg={4}>
                                        <Form.Group controlId={`newUser${index}`}>
                                          <Form.Label>New User Name</Form.Label>
                                          <Field
                                            type="text"
                                            name={`steps[${index}].newUser`}
                                            placeholder="Enter new user name"
                                            className="form-control"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={4}>
                                        <Form.Group
                                          controlId={`userEmail${index}`}
                                        >
                                          <Form.Label>User Email</Form.Label>
                                          <Field
                                            type="email"
                                            name={`steps[${index}].userEmail`}
                                            placeholder="Enter user email"
                                            className="form-control"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={4}>
                                        <Form.Group
                                          controlId={`department${index}`}
                                        >
                                          <Form.Label>Department</Form.Label>
                                          <Field
                                            as="select"
                                            name={`steps[${index}].department`}
                                            className="form-control"
                                          >
                                            <option value="">Choose...</option>
                                            <option value="Credit">Credit</option>
                                            <option value="Operations">
                                              Operations
                                            </option>
                                            <option value="Compliance">
                                              Compliance
                                            </option>
                                            <option value="Information Technology">
                                              Information Technology
                                            </option>
                                            <option value="Finance">
                                              Finance
                                            </option>
                                            <option value="Credit Remediation">
                                              Credit Remediation
                                            </option>
                                            <option value="Senior Management">
                                              Senior Management
                                            </option>
                                          </Field>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  )}
                              </Card.Body>
                            </Card>
                          );
                        })}

                        {/* Button to add a new step */}
                        <Button
                          variant="outline-secondary"
                          className="mb-3"
                          onClick={() =>
                            push({
                              stepName: "",
                              assignedUser: "",
                              userRole: "",
                              newUser: "",
                              userEmail: "",
                              department: "",
                            })
                          }
                        >
                          Add New Step
                        </Button>
                      </>
                    )}
                  </FieldArray>

                  <div className="text-center">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                    <Button
                      variant="secondary"
                      className="ms-2"
                      onClick={handleReset}
                    >
                      Cancel
                    </Button>
                  </div>
                </FormikForm>
              );
            }}
          </Formik>
        </Card>
      )}

      {!showForm &&
        workFlow?.map((item, index) => (
          <Card className="mb-3 mt-3" key={index}>
            <Card.Header>Step {index + 1}</Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  {/* First Column: Select Box */}
                  <Col lg={4}>
                    <Form.Group controlId={`formSelect1-${index}`}>
                      <Form.Label>Select Option 1</Form.Label>
                      <Form.Control
                        as="select"
                        value={formChanges[index]?.assignedUser || item?.assignedUser}
                        onChange={(e) => handleSelect1Change(e, index)}
                      >
                        <option value="">Select an option</option>
                        {users?.map((elem, userIndex) => (
                          <option key={userIndex} value={elem?.email}>
                            {elem?.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  {/* Second Column: Select Box */}
                  <Col lg={4}>
                    <Form.Group controlId={`formSelect2-${index}`}>
                      <Form.Label>Step Name</Form.Label>
                      <Form.Control
                        as="select"
                        value={formChanges[index]?.stepName || item?.stepName}
                        onChange={(e) => handleSelect2Change(e, index)}
                      >
                        <option value="">Select an option</option>
                        {data?.map((elem, dataIndex) => (
                          <option key={dataIndex} value={elem?.value}>
                            {elem?.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  {/* Third Column: Input Text Box */}
                  <Col lg={4}>
                    <Form.Group controlId={`formTextInput-${index}`}>
                      <Form.Label>Input Text</Form.Label>
                      <Form.Control
                        type="text"
                        value={formChanges[index]?.userRole || item?.userRole}
                        onChange={(e) => handleInputTextChange(e, index)}
                        placeholder="Enter text"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Submit Button Row */}
                <Row>
                  <Col className="text-end">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSubmitData(index)}
                      disabled={!isSubmitEnabled(index) || isSubmitting[index]} // Disable if no changes or submission in progress
                    >
                      {isSubmitting[index] ? "Submitting..." : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        ))
      }

      {role == 'user' && <div className="mt-10 table-responsive form ">
        <Table
          className="custom-header"
          columns={columns}
          dataSource={workflowData?.transactionDocuments}
          // pagination={{
          //   total: getAlltransactionData?.data?.length,
          //   pageSize: postsPerPage,
          //   current: currentPage,
          //   onChange: paginate,
          // }}
          loading={!workflowData?.transactionDocuments}
          rowKey={(record) => record._id}
        />
      </div>}

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={handleCancelConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to submit the workflow?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelConfirmation}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmationSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isPreview && workflowData?.workflowDocument?.stepName == "keyParties"} onHide={() => setIsPreview(false)} centered className="w-90" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Workflow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewData.length > 0 && previewData.map((item, index) => {
            return (
              <Row key={index}>
                <Form.Group as={Col} lg={4} md={6} m={12} className="mb-3" controlId="formHorizontalEmail">
                  <Form.Label className='text-muted'>Is Verified</Form.Label>

                  <Form.Control className='text-muted no-border' type="text"
                    name='borrower_Applicant'
                    value={item?.flowVerified}
                    disabled={true} />

                </Form.Group>
                <Form.Group as={Col} lg={12} md={12} m={12} className="mb-3" controlId="formHorizontalEmail">
                  <Form.Label className='text-muted'> Parties </Form.Label>
                  {item.parties && item.parties.map((party, i) => {
                    return (
                      <Row key={i}>
                        <Col lg={6} md={6} m={12}>
                          <Form.Group as={Col} lg={12} md={12} m={8} className="mb-1" controlId="formHorizontalEmail">
                            <Form.Label className='text-muted'>Email</Form.Label>
                            <Form.Control className='text-muted no-border my-1' type="text"
                              name='borrower_Applicant'
                              value={party?.name?.email}
                              disabled={true}
                              placeholder='Email' />
                          </Form.Group></Col>
                        <Col lg={6} md={6} m={12}>
                          <Form.Group as={Col} lg={12} md={12} m={8} className="mb-1" controlId="formHorizontalEmail">
                            <Form.Label className='text-muted'>Type</Form.Label><Form.Control className='text-muted no-border my-1' type="text"
                              name='borrower_Applicant'
                              value={party?.name?.type}
                              disabled={true}
                              placeholder='Type' /></Form.Group></Col>
                      </Row>


                    )
                  })}
                </Form.Group>
                {item.relatedParties.length > 0 && <Form.Group as={Col} lg={12} md={12} m={12} className="mb-3" controlId="formHorizontalEmail">
                  <Form.Label className='text-muted'>Related Parties</Form.Label>
                  {item.relatedParties && item.relatedParties.map((party, i) => {
                    return (
                      <Row>
                        <Col lg={6} md={6} m={12}>
                          <Form.Group as={Col} lg={12} md={12} m={8} className="mb-1" controlId="formHorizontalEmail">
                            <Form.Label className='text-muted'>Buyer</Form.Label>
                            <Form.Control key={i} className='text-muted no-bordermy-1' type="text"
                              name='borrower_Applicant'
                              value={party?.buyer}
                              disabled={true}
                              placeholder="Buyer" />
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={6} m={12}>
                          <Form.Group as={Col} lg={12} md={12} m={8} className="mb-1" controlId="formHorizontalEmail">
                            <Form.Label className='text-muted'>Shipper</Form.Label>
                            <Form.Control key={i} className='text-muted no-border my-1' type="text"
                              name='borrower_Applicant'
                              value={party?.shipper}
                              disabled={true} placeholder="Shipper" />
                          </Form.Group>
                        </Col>
                      </Row>
                    )
                  })}
                </Form.Group>}

              </Row>
            )
          })
          }
        </Modal.Body>
      </Modal>
      <Modal show={isPreview && workflowData?.workflowDocument?.stepName == "details"} onHide={() => setIsPreview(false)} centered className="w-90" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Workflow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} lg={6} md={6} m={12} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Is Verified</Form.Label>
              <Form.Control className='text-muted no-border' type="text"
                name='borrower_Applicant'
                value={previewData?.flowVerified}
                disabled={true} />
            </Form.Group>
            <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Contract Details</Form.Label>
              <Row>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Currency Type</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.contractDetails?.currency}
                      disabled={true} /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Amount</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.contractDetails?.value}
                      disabled={true} placeholder="Amount" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Contract Date</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={moment(previewData?.contractDetails?.contractDate).format('MM/DD/YYYY')}
                      disabled={true} placeholder="Contract Date" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Contract End Date</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={moment(previewData?.contractDetails?.contractDate).format('MM/DD/YYYY')}
                      disabled={true} placeholder="Contract End Date" /></Form.Group></Col>
              </Row>
            </Form.Group>
            <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Pricing Details</Form.Label>
              <Row>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Price Type</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.pricingDetails?.pricingType}
                      disabled={true} placeholder="Pricing Type" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Pricing Hedging Method</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.pricingDetails?.pricingHedgingMethod}
                      disabled={true} placeholder="Pricing Hedging Method" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Pricing Formula</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.pricingDetails?.pricingFormula}
                      disabled={true} placeholder="Pricing Formula" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Pricing Hedging Status</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.pricingDetails?.pricingHedgingStatu}
                      disabled={true} placeholder="Pricing Hedging Status" /></Form.Group></Col>
              </Row>
            </Form.Group>

          </Row>
        </Modal.Body>

      </Modal>
      <Modal show={isPreview && workflowData?.workflowDocument?.stepName == "fundFlow"} onHide={() => setIsPreview(false)} centered className="w-90" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Workflow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} lg={6} md={6} m={12} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Is Verified</Form.Label>
              <Form.Control className='text-muted no-border' type="text"
                name='borrower_Applicant'
                value={previewData?.flowVerified}
                disabled={true} />
            </Form.Group>
            <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Beneficiary Details</Form.Label>
              <Row>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Beneficiary Email</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.beneficiary?.email}
                      disabled={true} placeholder="Beneficiary Email" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Beneficiary Type</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.beneficiary?.type}
                      disabled={true} placeholder="Beneficiary Type" /></Form.Group></Col>
              </Row>
            </Form.Group>
            <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Payment Details</Form.Label>
              <Row>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Payment Method</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.paymentMethod}
                      disabled={true} placeholder="Payment Method" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Contract Currency</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.contractCurrency}
                      disabled={true} placeholder="Contract Currency" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Contract Value</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.contractValue}
                      disabled={true} placeholder="Contract Value" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Payment Date</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={moment(previewData?.paymentDate).format('MM/DD/YYYY')}
                      disabled={true} placeholder="Payment Date" /></Form.Group></Col>
              </Row>
            </Form.Group>

          </Row>
        </Modal.Body>

      </Modal>
      <Modal show={isPreview && workflowData?.workflowDocument?.stepName == "documentFlow"} onHide={() => setIsPreview(false)} centered className="w-90" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Workflow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} lg={6} md={6} m={12} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Is Verified</Form.Label>
              <Form.Control className='text-muted no-border' type="text"
                name='borrower_Applicant'
                value={previewData?.flowVerified}
                disabled={true} />
            </Form.Group>
            <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Documnet Details</Form.Label>
              <Row>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-1" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Approved/UnApproved</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.details}
                      disabled={true} placeholder="Approved/UnApproved" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-1" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Document Remittance</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.documentRemittance}
                      disabled={true} placeholder="Document Remittance" /></Form.Group></Col>
              </Row>
            </Form.Group>
          </Row>
        </Modal.Body>

      </Modal>
      <Modal show={isPreview && workflowData?.workflowDocument?.stepName == "facility"} onHide={() => setIsPreview(false)} centered className="w-90" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Workflow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} lg={6} md={6} m={12} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Is Verified</Form.Label>
              <Form.Control className='text-muted no-border' type="text"
                name='borrower_Applicant'
                value={previewData?.flowVerified}
                disabled={true} />
            </Form.Group>
            <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Interest Details</Form.Label>
              <Row>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Interest Rate Type</Form.Label>
                    <Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.interestRateType}
                      disabled={true} placeholder="Interest Rate Type" />
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Interest Rate</Form.Label>
                    <Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.interestRate + '%'}
                      disabled={true} placeholder="Interest Rate" />
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Facility Details</Form.Label>
              <Row>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Facility Amount</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.amount}
                      disabled={true} placeholder="Facility Amount" />
                  </Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Currency Type</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.currency}
                      disabled={true} placeholder="Currency" />
                  </Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Governing Law</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.governingLaw}
                      disabled={true} placeholder="Governing Law" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Facility Type</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.type}
                      disabled={true} placeholder="Type" /></Form.Group></Col>
              </Row>
            </Form.Group>
            <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='text-muted'>Pricing Details</Form.Label>
              <Row>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Interest Period</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.interestPeriod}
                      disabled={true} placeholder="Interest Period" />
                  </Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Interest Payment Date</Form.Label>
                    <Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={moment(previewData?.interestPaymentDate).format('MM/DD/YYYY')}
                      disabled={true} placeholder="Interest Payment Date" /></Form.Group>
                </Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Tenor</Form.Label><Form.Control className='text-muted no-border' type="text"
                      name='borrower_Applicant'
                      value={previewData?.tenor + '%'}
                      disabled={true} placeholder="Tenor" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Late Interest Charges</Form.Label><Form.Control className='text-muted no-border my-1' type="text"
                      name='borrower_Applicant'
                      value={previewData?.lateInterestCharges + '%'}
                      disabled={true} placeholder="Late Interest Charges" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Jurisdiction</Form.Label><Form.Control className='text-muted no-border my-1' type="text"
                      name='borrower_Applicant'
                      value={previewData?.jurisdiction}
                      disabled={true} placeholder="Jurisdiction" /></Form.Group></Col>
                <Col lg={6} md={6} m={12}>
                  <Form.Group as={Col} lg={12} md={12} m={8} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label className='text-muted'>Loan Purpose Justification</Form.Label><Form.Control className='text-muted no-border my-1' type="text"
                      name='borrower_Applicant'
                      value={previewData?.loanPurposJustification}
                      disabled={true} placeholder="Loan Purpos Justification" /></Form.Group></Col>
              </Row>
            </Form.Group>
          </Row>
        </Modal.Body>

      </Modal>
    </Container>
  );
};

export default Workflow;
