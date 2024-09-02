import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { admin } from "../../_Services/adminServices";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const { Option } = Select;
const { Dragger } = Upload;

const CreateAdmin = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    corporationName: "",
    businessEmail: "",
    registrationNumber: "",
    phone: "",
    address1: "",
    address2: "",
    buildingNumber: "",
    branch: "",
    logo: null,
    adminName: "",
    country: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleFormChange = (changedValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...changedValues,
    }));
  };

  const handleFinish = () => {
    function generateRandom4Digit() {
      return Math.floor(Math.random() * 9000) + 1000;
    }

    // Example usage
    const random4Digit = generateRandom4Digit();

    formData.code = random4Digit;

    admin
      .createAdmin(formData)
      .then((resp) => {
        message.success("Form submitted successfully!");
        console.log("Resetting form fields...");
        form.resetFields();
        console.log("Form fields reset");
      })
      .catch((err) => {
        message.error("Please check for duplicate data");
      });
    console.log("Form data:", formData);
  };

  const handleFinishFailed = () => {
    message.error("Please correct the errors in the form.");
  };

  const handleFileChange = async (info) => {
    console.log("File info:", info.file); // Log the entire file object to see its structure

    // Check if the file is there
    if (info.file) {
      // Directly use info.file if originFileObj is not available
      const file = info.file.originFileObj || info.file; // Fallback to info.file

      console.log("Using file:", file);

      // Create FormData to send file
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://backend.oramsysdev.com/file/upload-file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFormData((prevFormData) => ({
          ...prevFormData,
          logo: response.data.url, // Assuming your API returns { url: '...' }
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file available");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Onboarding</h2>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormChange}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        initialValues={formData}
      >
        <div className="row">
          <div className="col-md-6">
            <Form.Item
              label="Corporation Name"
              name="corporationName"
              rules={[
                {
                  required: true,
                  message: "Please enter the corporation name!",
                },
              ]}
            >
              <Input placeholder="Corporation Name" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Business Email"
              name="businessEmail"
              rules={[
                { required: true, message: "Please enter the business email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input placeholder="Business Email" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Registration Number"
              name="registrationNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter the registration number!",
                },
              ]}
            >
              <Input placeholder="Registration Number" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter the phone number!" },
              ]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Address 1"
              name="address1"
              rules={[{ required: true, message: "Please enter the address!" }]}
            >
              <Input placeholder="Address 1" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Address 2" name="address2">
              <Input placeholder="Address 2" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Building Number"
              name="buildingNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter the building number!",
                },
              ]}
            >
              <Input placeholder="Building Number" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Branch"
              name="branch"
              rules={[{ required: true, message: "Please select a branch!" }]}
            >
              <Select placeholder="Select a branch">
                <Option value="branch1">Branch 1</Option>
                <Option value="branch2">Branch 2</Option>
                <Option value="branch3">Branch 3</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Admin Name"
              name="adminName"
              rules={[
                { required: true, message: "Please enter the admin name!" },
              ]}
            >
              <Input placeholder="Admin Name" />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              label="Logo"
              name="logo"
              valuePropName="file"
              rules={[{ required: true, message: "Please upload a logo!" }]}
            >
              <Dragger
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleFileChange} // Handle file change
                className="upload"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Dragger>
            </Form.Item>
          </div>
        </div>
        <div className="text-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateAdmin;

// import React, { useState } from 'react';

// const CreateAdmin = () => {
//   const [formData, setFormData] = useState({
//     fname: '',
//     lname: '',
//     email: '',
//     mob: '',
//     job: '',
//     ans: ''
//   });

//   const [formErrors, setFormErrors] = useState({
//     fname: false,
//     lname: false,
//     email: false,
//     mob: false,
//     job: false,
//     ans: false
//   });

//   const validate = (field) => {
//     let errors = { ...formErrors };

//     if (formData[field] === '') {
//       errors[field] = true;
//     } else {
//       errors[field] = false;
//     }

//     setFormErrors(errors);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const allValid = Object.keys(formData).every((field) => {
//       validate(field);
//       return formData[field] !== '';
//     });

//     if (allValid) {
//       // handle valid form submission
//       console.log('Form Submitted', formData);
//     }
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     validate(name);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="container-fluid overflow-x-hidden px-1 py-5 mx-auto">
//       <div className="row d-flex justify-content-center">
//         <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">

//           <h3 className='justify-content-center mx-auto text-center'>Staff Onboard Invite</h3>

//           <div className="card shadow-sm p-4 mt-5 mb-5">
//             {/* <h5 className="justify-content-center mx-auto mb-4">Onboard Staff</h5> */}
//             <form className="form-card" onSubmit={handleSubmit}>
//               <div className="row justify-content-between text-left">
//                 <div className="form-group col-sm-6">
//                   <label className="form-control-label px-1">
//                     First name <span className="text-danger"> *</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="fname"
//                     name="fname"
//                     className={`form-control ${formErrors.fname ? 'is-invalid' : ''} fw-lighter`}
//                     placeholder="Enter your first name"
//                     value={formData.fname}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                 </div>
//                 <div className="form-group col-sm-6">
//                   <label className="form-control-label ">
//                     Last name <span className="text-danger"> *</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="lname"
//                     name="lname"
//                     className={`form-control ${formErrors.lname ? 'is-invalid' : ''} fw-lighter`}
//                     placeholder="Enter your last name"
//                     value={formData.lname}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                 </div>
//               </div>
//               <div className="row justify-content-between text-left">
//                 <div className="form-group col-sm-6">
//                   <label className="form-control-label px-1">
//                     Business email <span className="text-danger"> *</span>
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className={`form-control ${formErrors.email ? 'is-invalid' : ''} fw-lighter`}
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                 </div>
//                 <div className="form-group col-sm-6">
//                   <label className="form-control-label px-1">
//                     Phone number <span className="text-danger"> *</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="mob"
//                     name="mob"
//                     className={`form-control ${formErrors.mob ? 'is-invalid' : ''} fw-lighter`}
//                     placeholder="Enter your phone number"
//                     value={formData.mob}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                 </div>
//               </div>
//               <div className="row justify-content-between text-left">
//                 <div className="form-group col-sm-6">
//                   <label className="form-control-label px-1">
//                     Job title <span className="text-danger"> *</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="job"
//                     name="job"
//                     className={`form-control ${formErrors.job ? 'is-invalid' : ''} fw-lighter`}
//                     placeholder="Enter your job title"
//                     value={formData.job}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                 </div>
//               </div>

//               <div className="row justify-content-center">
//                 <div className="form-group col-sm-6">
//                   <button type="submit" className="btn btn-primary btn-block">
//                     Send Invitation
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAdmin;
