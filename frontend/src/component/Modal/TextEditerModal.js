import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Modal, Fade } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

const TextEditerModal = ({ onHide, show, commentDone, data, type, inputName }) => {
    const [state, setState] = useState({
        comment: '',
    });

    const handleChange = (value, name) => {
        setState({
            ...state,
            [name]: value,
        });
    };

    useEffect(() => {
        if (data) {
            setState({
                comment: data, // Use data directly if it's HTML content
            });
        }
    }, [data]);

    const handleDone = (data) => {
        const newData = {
            value: data.comment, // Quill uses HTML string by default
            name: inputName,
        };
        commentDone(newData);
        onHide();
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="model text-edit-modal"
                open={show}
                onClose={onHide}
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={show}>
                    <div className="modal-content">
                        <div className="d-flex justify-content-between">
                            <h2 id="transition-modal-title" className="modal-title">
                                {type}
                            </h2>
                            <img
                                src="../../assets/img/my-img/Close.png"
                                alt=""
                                onClick={onHide}
                                style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                            />
                        </div>
                        <ReactQuill
                            name="comment"
                            value={state.comment}
                            onChange={(value) => handleChange(value, 'comment')}
                        />
                        <div className="position-fixed" style={{ bottom: '115px' }}>
                            <button onClick={() => handleDone(state)} className="footer_next_btn">
                                Done
                            </button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default TextEditerModal;
