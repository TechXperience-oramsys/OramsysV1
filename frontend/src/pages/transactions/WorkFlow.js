import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Form, Badge } from 'react-bootstrap';
import { Formik, FieldArray, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API } from '../../config/API/api.config';

const Workflow = () => {
  const [showForm, setShowForm] = useState(false);

  const BaseURL = API;
  console.log(BaseURL, 'baseul');

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function to call the API
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BaseURL}user/getUsersByAdmin?id=66d7ffd34f536624285360c7`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        console.log(data?.data, 'all users heree');


        setUsers(data?.data);
      } catch (error) {
        setError(error.message);
      }
    };

    // Call the function
    fetchUsers();
  }, []); // Empty dependency array to run only once on component mount






  // Validation schema for each step
  const validationSchema = Yup.object().shape({
    steps: Yup.array().of(
      Yup.object().shape({
        stepName: Yup.string().required('Step name is required'),
        assignedUser: Yup.string().required('Assigned user is required'),
        userRole: Yup.string().required('User role is required'),
      })
    ),
  });

  // Initial form values
  const initialValues = {
    steps: [{ stepName: '', assignedUser: '', userRole: '' }],
  };

  // Toggle form visibility
  const handleCreateWorkflow = () => {
    setShowForm(true);
  };

  // Handler to submit the form data
  const handleSubmit = (values) => {
    console.log("Workflow Steps:", values.steps);
    // Process the form data as needed
  };

  // Handler to reset form visibility
  const handleReset = () => {
    setShowForm(false);
  };

  return (
    <Container style={{ transform: 'none', transition: 'none !important' }} className=" card container mt-4">
      {/* Top-right button to create a workflow */}
      {!showForm && (
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleCreateWorkflow}>
            Create Workflow
          </Button>
        </div>
      )}

      {/* Workflow form */}
      {showForm && (
        <Card className="mt-4 p-4">
          <h3 className="mb-4">Create Workflow</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched }) => (
              <FormikForm>
                <FieldArray name="steps">
                  {({ push, remove }) => (
                    <>
                      {values.steps.map((step, index) => (
                        <Card key={index} className="mb-3">
                          <Card.Body>
                            <div className="d-flex align-items-center">
                              <Badge pill bg="info" className="me-2">
                                Step {index + 1}
                              </Badge>
                            </div>
                            <Row className="mb-3">
                              <Col md={4}>
                                <Form.Group controlId={`stepName${index}`}>
                                  <Form.Label htmlFor={`steps[${index}].stepName`}>Step Name</Form.Label>
                                  <Field
                                    type="text"
                                    name={`steps[${index}].stepName`}
                                    placeholder="Enter step name"
                                    className={`form-control ${touched.steps &&
                                        touched.steps[index] &&
                                        touched.steps[index].stepName &&
                                        errors.steps &&
                                        errors.steps[index] &&
                                        errors.steps[index].stepName
                                        ? 'is-invalid'
                                        : ''
                                      }`}
                                  />
                                  <ErrorMessage
                                    name={`steps[${index}].stepName`}
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group controlId={`assignedUser${index}`}>
                                  <Form.Label htmlFor={`steps[${index}].assignedUser`}>Assigned User</Form.Label>
                                  <Field
                                    type="text"
                                    name={`steps[${index}].assignedUser`}
                                    placeholder="Enter user name"
                                    className={`form-control ${touched.steps &&
                                        touched.steps[index] &&
                                        touched.steps[index].assignedUser &&
                                        errors.steps &&
                                        errors.steps[index] &&
                                        errors.steps[index].assignedUser
                                        ? 'is-invalid'
                                        : ''
                                      }`}
                                  />
                                  <ErrorMessage
                                    name={`steps[${index}].assignedUser`}
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group controlId={`userRole${index}`}>
                                  <Form.Label htmlFor={`steps[${index}].userRole`}>User Role</Form.Label>
                                  <Field
                                    type="text"
                                    name={`steps[${index}].userRole`}
                                    placeholder="Enter user role"
                                    className={`form-control ${touched.steps &&
                                        touched.steps[index] &&
                                        touched.steps[index].userRole &&
                                        errors.steps &&
                                        errors.steps[index] &&
                                        errors.steps[index].userRole
                                        ? 'is-invalid'
                                        : ''
                                      }`}
                                  />
                                  <ErrorMessage
                                    name={`steps[${index}].userRole`}
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            {/* Conditionally render the Remove button */}
                            {index > 0 && ( // Show remove button only for steps after the first
                              <div className="d-flex justify-content-end">
                                <Button
                                  variant="danger"
                                  onClick={() => remove(index)}
                                >
                                  Remove Step
                                </Button>
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      ))}
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="secondary"
                          onClick={() => push({ stepName: '', assignedUser: '', userRole: '' })}
                          className="me-2"
                        >
                          Add Next Step
                        </Button>
                        <Button type="submit" variant="primary" className="me-2">
                          Submit Workflow
                        </Button>
                        <Button variant="outline-danger" onClick={handleReset}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}
                </FieldArray>
              </FormikForm>
            )}
          </Formik>
        </Card>
      )}
    </Container>
  );
};

export default Workflow;
