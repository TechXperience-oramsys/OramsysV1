import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Form, Badge } from 'react-bootstrap';
import { Formik, FieldArray, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API } from '../../config/API/api.config';

const Workflow = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const BaseURL = API;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BaseURL}user/getUsersByAdmin?id=66d7ffd34f536624285360c7`);
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
        stepName: Yup.string().required('Step name is required'),
        assignedUser: Yup.string().required('Assigned user is required'),
        userRole: Yup.string().required('User role is required'),
        newUser: Yup.string(), // Simply keep it as a string without validation
      })
    ),
  });

  const initialValues = {
    steps: [{ stepName: '', assignedUser: '', userRole: '', newUser: '' }],
  };

  const handleCreateWorkflow = () => {
    setShowForm(true);
  };

  const handleSubmit = (values) => {
    console.log("Workflow Steps:", values.steps);
  };

  const handleReset = () => {
    setShowForm(false);
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
              const selectedUserIds = values.steps.map(step => step.assignedUser);

              return (
                <FormikForm>
                  <FieldArray name="steps">
                    {({ push, remove }) => (
                      <>
                        {values.steps.map((step, index) => {
                          const availableUsers = users.filter(user => !selectedUserIds.includes(user._id) || user._id === step.assignedUser);

                          return (
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
                                      <Form.Label>Step Name</Form.Label>
                                      <Field
                                        type="text"
                                        name={`steps[${index}].stepName`}
                                        placeholder="Enter step name"
                                        className={`form-control ${
                                          touched.steps &&
                                          touched.steps[index]?.stepName &&
                                          errors.steps &&
                                          errors.steps[index]?.stepName
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
                                      <Form.Label>Assigned User</Form.Label>
                                      <Field
                                        as="select"
                                        name={`steps[${index}].assignedUser`}
                                        className={`form-control ${
                                          touched.steps &&
                                          touched.steps[index]?.assignedUser &&
                                          errors.steps &&
                                          errors.steps[index]?.assignedUser
                                            ? 'is-invalid'
                                            : ''
                                        }`}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setFieldValue(`steps[${index}].assignedUser`, value);
                                          if (value !== 'other') {
                                            setFieldValue(`steps[${index}].newUser`, '');
                                          }
                                        }}
                                      >
                                        <option value="">Select User</option>
                                        {availableUsers.map(user => (
                                          <option key={user._id} value={user._id}>
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
                                    {values.steps[index]?.assignedUser === 'other' && (
                                      <Form.Group controlId={`newUser${index}`} className="mt-2">
                                        <Form.Label>New User Email</Form.Label>
                                        <Field
                                          type="Email"
                                          name={`steps[${index}].newUser`}
                                          placeholder="Enter new user email"
                                          className={`form-control ${
                                            touched.steps &&
                                            touched.steps[index]?.newUser &&
                                            errors.steps &&
                                            errors.steps[index]?.newUser
                                              ? 'is-invalid'
                                              : ''
                                          }`}
                                        />
                                        <ErrorMessage
                                          name={`steps[${index}].newUser`}
                                          component="div"
                                          className="invalid-feedback"
                                        />
                                      </Form.Group>
                                    )}
                                  </Col>
                                  <Col md={4}>
                                    <Form.Group controlId={`userRole${index}`}>
                                      <Form.Label>User Role</Form.Label>
                                      <Field
                                        type="text"
                                        name={`steps[${index}].userRole`}
                                        placeholder="Enter user role"
                                        className={`form-control ${
                                          touched.steps &&
                                          touched.steps[index]?.userRole &&
                                          errors.steps &&
                                          errors.steps[index]?.userRole
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
                                {index > 0 && (
                                  <div className="d-flex justify-content-end">
                                    <Button
                                      variant="danger"
                                      onClick={() => {
                                        remove(index);
                                        setFieldValue(`steps[${index}].assignedUser`, '');
                                      }}
                                    >
                                      Remove Step
                                    </Button>
                                  </div>
                                )}
                              </Card.Body>
                            </Card>
                          );
                        })}
                        <div className="d-flex justify-content-end">
                          <Button
                            variant="secondary"
                            onClick={() => push({ stepName: '', assignedUser: '', userRole: '', newUser: '' })}
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
              );
            }}
          </Formik>
        </Card>
      )}
    </Container>
  );
};

export default Workflow;
