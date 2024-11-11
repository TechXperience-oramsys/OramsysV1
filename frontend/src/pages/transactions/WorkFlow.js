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

const Workflow = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [workflowData, setWorkflowData] = useState(null); // Save workflow data before confirmation
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const BaseURL = API;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${BaseURL}user/getUsersByAdmin?id=66d7ffd34f536624285360c7`
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
  }, [BaseURL]);

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

          console.log(`User added: ${step.userEmail}`);
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
          "http://localhost:5003/api/workFlow/create",
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

  return (
    <Container className="mt-4">
      {!showForm && (
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
              const availableStepNames = [
                "Transaction Details",
                "Key Parties",
                "Document Flow",
                "Fund Flow",
                "Facility",
              ];

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
                                        className={`form-control ${
                                          touched.steps &&
                                          touched.steps[index]?.stepName &&
                                          errors.steps &&
                                          errors.steps[index]?.stepName
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                      >
                                        <option value="">Select Step</option>
                                        {availableStepNames.map((stepName) => (
                                          <option
                                            key={stepName}
                                            value={stepName}
                                            style={{
                                              display:
                                                selectedStepNames.includes(
                                                  stepName
                                                )
                                                  ? "none"
                                                  : "block",
                                            }}
                                          >
                                            {stepName}
                                          </option>
                                        ))}
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
                                        className={`form-control ${
                                          touched.steps &&
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
    </Container>
  );
};

export default Workflow;
