import React from 'react'
import { Form } from 'react-bootstrap';

export default function TextArea({
    onChange,
    label,
    placeholder,
    disabled,
    value
}) {
    return (
        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                style={{ background: 'white' }}
                as="textarea"
                rows={3}
                disabled={disabled}
                placeholder={placeholder}
                onChange={e => onChange(e)}
                defaultValue={value}
            />
        </Form.Group>
    )
}
