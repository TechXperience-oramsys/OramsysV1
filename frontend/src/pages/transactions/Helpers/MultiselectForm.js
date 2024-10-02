import React, { useRef, useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import { OptionalSpan } from './OptionalTags';

export const MultiSelectForm = ({ facility, setFacility, error, options, propertyName, label }) => {
    const toggleRef = useRef(null);
    const [view, setView] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (toggleRef.current && !toggleRef.current.contains(e.target)) {
                setView(false);
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const handleSelection = (value) => {
        setFacility((prevFacility) => ({
            ...prevFacility,
            [propertyName]: prevFacility[propertyName]?.includes(value)
                ? prevFacility[propertyName].filter((ele) => ele !== value)
                : [...prevFacility[propertyName], value],
        }));
        setView(true);
    };

    const removeContent = (value) => {
        setFacility((prevFacility) => ({
            ...prevFacility,
            [propertyName]: prevFacility[propertyName]?.filter((ele) => ele !== value),
        }));
        setView(false);
    };

    const StyleSheet = {
        container: {
        },
        closeView: { display: 'none' },
        overall: {
            width: '95%',
            margin: '0 auto',
            height: 'auto',
            backgroundColor: '#fff',
            position: 'absolute',
            border: '1px solid lightgrey',
            top: '5rem',
            left: 0,
            right: 0,
            overflowY: 'auto',
            display: 'block',
            zIndex: '3',
        },
        data: {
            padding: '0.5rem',
            fontSize: '0.8rem',
            cursor: 'pointer',
        },
        datashown: {
            padding: '0.3rem',
            borderBottom: '1px solid lightgrey',
            cursor: 'pointer',
            backgroundColor: 'lightgrey',
            color: 'white',
        },
        input: {
            width: '100%',
            border: '1px solid lightgrey',
            padding: '1rem'
        },
        showRoom: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: 7,
        },
        roomItem: {
            padding: '0.2rem 0.3rem',
            border: '1px solid lightgrey',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.7rem',
            backgroundColor: '#00BCD4',
            color: 'white'
        },
        cancelButton: {
            borderRadius: '999px',
            // fontSize: '0.8rem',
            backgroundColor: '#00BCD4',
            color: '#dae4e5',
            padding: '0.01rem 0.5rem',
            cursor: 'pointer'
        },
        fieldPadding: {
            padding: '6px'
        }
    }

    return (
        <Form.Group as={Col} controlId={`formGrid${propertyName}`}>
            <Form.Label>{label} <OptionalSpan /></Form.Label>
            <div style={StyleSheet.container}>
                <div ref={toggleRef} style={view ? StyleSheet.overall : StyleSheet.closeView}>
                    {options.map((item, i) => (
                        <div key={i} onClick={() => handleSelection(item)} style={facility[propertyName]?.includes(item) ? StyleSheet.datashown : StyleSheet.data}>
                            {item}
                        </div>
                    ))}
                    {facility[propertyName]?.length === options?.length && (
                        <div>No more options to select</div>
                    )}
                </div>
                <div onClick={() => setView(true)} style={StyleSheet.fieldPadding} className="border rounded-2 border-1 h-fit-content">
                    {facility[propertyName]?.length > 0 ? (
                        <div style={StyleSheet.showRoom}>
                            {facility[propertyName].map((item, i) => (
                                <div key={i} style={StyleSheet.roomItem}>
                                    {item}
                                    <div onClick={() => removeContent(item)} style={StyleSheet.cancelButton}>
                                        <span style={{ color: '#6b7070' }} className='me-1'>|</span> X
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span>--Select Multiple Options--</span>
                    )}
                </div>
            </div>
            {error && error[propertyName] && <span style={{ color: 'red' }}>{error[propertyName]}</span>}
        </Form.Group>
    );
};
