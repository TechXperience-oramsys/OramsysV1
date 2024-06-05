import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminInvite = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    mob: '',
    job: '',
    ans: ''
  });

  const [formErrors, setFormErrors] = useState({
    fname: false,
    lname: false,
    email: false,
    mob: false,
    job: false,
    ans: false
  });

  const validate = (field) => {
    let errors = { ...formErrors };

    if (formData[field] === '') {
      errors[field] = true;
    } else {
      errors[field] = false;
    }

    setFormErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allValid = Object.keys(formData).every((field) => {
      validate(field);
      return formData[field] !== '';
    });

    if (allValid) {
      // handle valid form submission
      console.log('Form Submitted', formData);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    validate(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container-fluid overflow-x-hidden px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">

          <h3 className='justify-content-center mx-auto text-center'>Staff Onboard Invite</h3>

          <div className="card shadow-sm p-4 mt-5 mb-5">
            {/* <h5 className="justify-content-center mx-auto mb-4">Onboard Staff</h5> */}
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6">
                  <label className="form-control-label px-1">
                    First name <span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    className={`form-control ${formErrors.fname ? 'is-invalid' : ''}`}
                    placeholder="Enter your first name"
                    value={formData.fname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label className="form-control-label ">
                    Last name <span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    className={`form-control ${formErrors.lname ? 'is-invalid' : ''}`}
                    placeholder="Enter your last name"
                    value={formData.lname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6">
                  <label className="form-control-label px-1">
                    Business email <span className="text-danger"> *</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label className="form-control-label px-1">
                    Phone number <span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="mob"
                    name="mob"
                    className={`form-control ${formErrors.mob ? 'is-invalid' : ''}`}
                    placeholder="Enter your phone number"
                    value={formData.mob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6">
                  <label className="form-control-label px-1">
                    Job title <span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="job"
                    name="job"
                    className={`form-control ${formErrors.job ? 'is-invalid' : ''}`}
                    placeholder="Enter your job title"
                    value={formData.job}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="form-group col-sm-6">
                  <button type="submit" className="btn btn-primary btn-block">
                    Request a demo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInvite;
