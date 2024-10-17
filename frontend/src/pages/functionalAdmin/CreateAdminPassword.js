import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'


const SetAdminPassword = () => {
    const [params, setParams] = useState(new URLSearchParams(window.location.search));
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPasswordShow, setOldPasswordShow] = useState(true);
    const [newPasswordShow, setNewPasswordShow] = useState(true);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
    const [id, setId] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        apiError: '',
    });

    // Set ID from URL params on component mount
    useEffect(() => {
        setId(params.get('id'));
    }, [params]);

    // Clear individual error messages
    const clearError = (field) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: '',
        }));
    };

    // Validate the input fields
    const validate = () => {
        let isValid = true;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const newErrors = { oldPassword: '', newPassword: '', confirmPassword: '', apiError: '' };

        if (!id) {
            newErrors.oldPassword = 'Please use a valid url.';
            isValid = false;
        }
        if (!oldPassword) {
            newErrors.oldPassword = 'Old password is required.';
            isValid = false;
        }
        if (!newPassword) {
            newErrors.newPassword = 'New password is required.';
            isValid = false;
        } else if (!passwordRegex.test(newPassword)) {
            newErrors.newPassword = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
            isValid = false;
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required.';
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }
        if (newPassword === oldPassword) {
            newErrors.newPassword = 'New password cannot be the same as old password.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const submit = async (e) => {
        e.preventDefault();
        setErrors({ oldPassword: '', newPassword: '', confirmPassword: '', apiError: '' });

        if (validate()) {
            try {
                const payload = {
                    password: oldPassword,
                    newPassword: newPassword,
                    confirm_password: confirmPassword,
                };
                setLoading(true)
                const response = await fetch(`https://backend.oramsysdev.com/admin/reset-password?id=${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    toast.success("Password updated successfully")
                    console.log('Password updated successfully');
                    resetInput();
                    window.location.href = 'https://oramsysdev.com/fa-login';
                } else {
                    const errorData = await response.json();
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        apiError: errorData.message,
                    }));
                }
                setLoading(false)
            } catch (error) {
                console.error('Error updating password:', error);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    apiError: 'An error occurred while updating the password. Please try again.',
                }));
            }

        }
    };

    // Reset input fields
    const resetInput = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h4 className="text-center mx-auto w-fixed justify-content-center fw-bold">Reset Password</h4>
                        <form onSubmit={submit}>
                            {/* Old Password */}
                            {/* <div className="mb-3">
                                <label htmlFor="old_password" className="form-label">Old password</label>
                                <div className="input-group">
                                    <input
                                        type={oldPasswordShow ? 'password' : 'text'}
                                        id="old_password"
                                        value={oldPassword}
                                        onChange={(e) => { setOldPassword(e.target.value); clearError('oldPassword'); }}
                                        className="form-control"
                                    />
                                    <span
                                        className="input-group-text"
                                        onClick={() => setOldPasswordShow(!oldPasswordShow)}
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                    >
                                        {oldPasswordShow ? 'Show' : 'Hide'}
                                    </span>
                                </div>
                                <p className="text-danger">{errors.oldPassword}</p>
                            </div> */}

                            <div className="form-floating mb-4 position-relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    onChange={(e) => { setOldPassword(e.target.value); clearError('oldPassword'); }}
                                    name="password"
                                    value={oldPassword}
                                    className="form-control"
                                    id="old_password"
                                    placeholder="Current Password"
                                />
                                <label htmlFor="password">Current password:</label>
                                {errors && errors.oldPassword && <span className="text-danger">{errors.oldPassword}</span>}
                                <span className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </span>
                            </div>

                            {/* New Password */}
                            {/* <div className="mb-3">
                                <label htmlFor="new_password" className="form-label">New password</label>
                                <div className="input-group">
                                    <input
                                        type={newPasswordShow ? 'password' : 'text'}
                                        id="new_password"
                                        value={newPassword}
                                        onChange={(e) => { setNewPassword(e.target.value); clearError('newPassword'); }}
                                        className="form-control"
                                    />
                                    <span
                                        className="input-group-text"
                                        onClick={() => setNewPasswordShow(!newPasswordShow)}
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                    >
                                        {newPasswordShow ? 'Show' : 'Hide'}
                                    </span>
                                </div>
                                <p className="text-danger">{errors.newPassword}</p>
                            </div> */}

                            <div className="form-floating mb-4 position-relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    onChange={(e) => { setNewPassword(e.target.value); clearError('newPassword'); }}
                                    name="password"
                                    value={newPassword}
                                    className="form-control"
                                    id="new_password"
                                    placeholder="new password"
                                />
                                <label htmlFor="password">New password:</label>
                                {errors && errors.newPassword && <span className="text-danger">{errors.newPassword}</span>}
                                <span className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </span>
                            </div>

                            {/* Confirm Password */}
                            {/* <div className="mb-3">
                                <label htmlFor="confirm_password" className="form-label">Confirm password</label>
                                <div className="input-group">
                                    <input
                                        type={confirmPasswordShow ? 'password' : 'text'}
                                        id="confirm_password"
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
                                        className="form-control"
                                    />
                                    <span
                                        className="input-group-text"
                                        onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                    >
                                        {confirmPasswordShow ? 'Show' : 'Hide'}
                                    </span>
                                </div>
                                <p className="text-danger">{errors.confirmPassword}</p>
                            </div> */}

                            <div className="form-floating mb-4 position-relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
                                    name="password"
                                    value={confirmPassword}
                                    className="form-control"
                                    id="confirm_password"
                                    placeholder="confirm password"
                                />
                                <label htmlFor="password">Confirm new password:</label>
                                {errors && errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                                <span className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </span>
                            </div>

                            <p className="text-danger">{errors.apiError}</p>

                            {/* Submit Button */}
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-block">
                                    {!loading ? 'Submit' : (
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border spinner-border-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    )}

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SetAdminPassword