import React, { useState, useEffect } from 'react';
import RichTextEditor from 'react-rte';
import { Modal, Fade } from '@material-ui/core';

const TextEditerModal = ({ onHide, show, commentDone, data, type, inputName }) => {
    const [state, setState] = useState({
        comment: RichTextEditor.createEmptyValue(),
    });

    const handleChange = (e, name) => {
        setState({
            ...state,
            [name]: e,
        });
    };

    useEffect(() => {
        if (data) {
            setState({
                comment: RichTextEditor.createValueFromString(data, 'html'),
            });
        }
    }, [data]);

    const handleDone = (data) => {
        const newData = {
            value: data.comment.toString('markdown'), // Convert to plain text
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
                        <RichTextEditor
                            name="comment"
                            value={state.comment}
                            onChange={(e) => handleChange(e, 'comment')}
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
