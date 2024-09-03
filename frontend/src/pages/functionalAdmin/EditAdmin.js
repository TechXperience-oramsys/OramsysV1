import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ApiGet, ApiPut } from "../../helper/API/ApiData";
import { toast } from "react-toastify";

const { Option } = Select;
const { Dragger } = Upload;

function EditAdmin() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const adminData = useSelector((state) => state.adminData?.getAdminId);
  const adminUpdate = useSelector((state) => state.adminData?.adminUpdate);
  const [loading, setLoading] = useState(true);
  console.log("Admin Data", adminData);

  useEffect(() => {
    ApiGet(`admin/get-admin-by/${id}`)
      .then((res) => {
        console.log(res, "inside out");
        setFormData({
          corporationName: res.data[0]?.corporationName || "",
          businessEmail: res.data[0]?.businessEmail || "",
          registrationNumber: res.data[0]?.registrationNumber || "",
          phone: res.data[0]?.phone || "",
          address1: res.data[0]?.address1 || "",
          address2: res.data[0]?.address2 || "",
          buildingNumber: res.data[0]?.buildingNumber || "",
          branch: res.data[0]?.branch || "",
          logo: res.data[0]?.logo || null,
          adminName: res.data[0]?.adminName || "",
        });
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleFormChange = (changedValues) => {
    setFormData((prevState) => ({
      ...prevState,
      ...changedValues,
    }));
  };

  const handleFinish = () => {
    ApiPut(`admin/update-admin/${id}`, formData)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/admins");
      })
      .catch((error) => toast.error(error));
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
  // useEffect(() => {
  //   if (adminData?.data && id) {
  //     form.setFieldsValue({
  //       corporationName: adminData?.data?.corporationName || "",
  //       businessEmail: adminData?.data?.businessEmail || "",
  //       registrationNumber: adminData?.data?.registrationNumber || "",
  //       phone: adminData?.data?.phone || "",
  //       address1: adminData?.data?.address1 || "",
  //       address2: adminData?.data?.address2 || "",
  //       buildingNumber: adminData?.data?.buildingNumber || "",
  //       branch: adminData?.data?.branch || "",
  //       logo: adminData?.data?.logo || null,
  //       adminName: adminData?.data?.adminName || "",
  //     });
  //   }
  // }, [adminData?.data, form]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Admin</h2>
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
        <div className="d-flex gap-5 justify-content-center">
          <div className="text-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
          <div className="text-center">
            <Button
              danger
              type="primary"
              htmlType="button"
              onClick={() => navigate("/admins")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditAdmin;
