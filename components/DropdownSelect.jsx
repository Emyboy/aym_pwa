import React from 'react'
import Select from 'react-select'
import { Form } from 'react-bootstrap'

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ]

const DropdownSelect = ({
    options,
    isMulti,
    onChange,
    disabled,
    label,
}) => (
    <Form.Group controlId="DropDownSelect1">
        <Form.Label>{label}</Form.Label>
        <Select
            options={options}
            isMulti={isMulti}
            isDisabled={disabled}
            onChange={e => onChange(e)}
        />
    </Form.Group>
)

export default DropdownSelect;