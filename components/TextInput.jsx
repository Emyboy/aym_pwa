import React from 'react'
import { Form } from 'react-bootstrap';

export default function TextInput({
    label,
    type,
    placeholder,
    onChange,
    disabled,
    name,
    defaultValue,
    value
}) {
    return (
        <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                defaultValue={value}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
                classname='border'
                name={name}
            />
        </Form.Group>
    )
}
