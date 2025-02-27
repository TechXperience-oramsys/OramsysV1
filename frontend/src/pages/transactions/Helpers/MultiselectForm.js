import React, { useRef, useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import { MultiSelect } from '@mantine/core';
import { OptionalSpan } from './OptionalTags';

export const MultiSelectForm = ({ facility, setFacility, error, options, propertyName, label }) => {


    const handleChange = (selectedValues) => {
        setFacility((prevFacility) => ({
            ...prevFacility,
            [propertyName]: selectedValues,
        }));
    };

    return (
       
        <Form.Group as={Col} controlId={`formGrid${propertyName}`}>
            <Form.Label>{label} <OptionalSpan /></Form.Label>
            <MultiSelect
                data={options}                 
                placeholder="--Select Multiple Options--"
                value={facility[propertyName] || []}  
                onChange={handleChange}          
                clearable                        
                searchable
                nothingFoundMessage="Nothing found..."                    
                error={error && error[propertyName]} 
                styles={{
                    input: {
                        padding: '6px', // Adjust padding as needed
                        borderRadius: '4px',

                    },
                    dropdown: {
                        padding: '4px',
                        backgroundColor: '#F9F9F9',
                        boxShadow: '30px',
                    },
                    item: {
                        fontSize: '14px',
                    },
                }}
                classNames={{
                    input: 'rounded-md border-1 border-gray-300', // Adjust as per your existing CSS classes
                }}
            />
            {error && error[propertyName] && (
                <span style={{ color: 'red' }}>{error[propertyName]}</span>
            )}
        </Form.Group>
    );
};
