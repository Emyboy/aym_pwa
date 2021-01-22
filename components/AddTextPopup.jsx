import React, { useState, useEffect } from 'react'
import { Modal, Form } from 'react-bootstrap';
import { isElementOfType } from 'react-dom/test-utils';
import { withTheme } from '../context/AppContext';
import Btn from './Btn';
import TextArea from './TextArea';
const { v4: uuid } = require('uuid');


export default withTheme(({
    show,
    handleClose,
    type,
    context
}) => {
    const [data, setData] = useState({
        // id: uuid(),
        id: context.list.length++,
        data: null,
        type: null,
        user_id: 22,
        published: false,
        style: {

        }
    });
    useEffect(() => {
        setData({ ...data, type: type })
        console.log(type)
    }, [type])

    const handleSubmit = e => {
        context.appendElementToPreview(data);
        handleClose();
    }

    const handleInputChange = e => {
        setData({ ...data, data: e.target.value })
    }

    return (
        <Modal size='lg' show={show} onHide={handleClose}>
            <Modal.Body>
                <h1>Add Text</h1>
                <TextArea
                    onChange={e => handleInputChange(e)}
                    label="Enter Text Conent"
                />
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }} className='mb-4'>
                    <div>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn border-dark">
                                <i class="fas fa-align-left"></i>
                            </button>
                            <button type="button" class="btn border-dark">
                                <i class="fas fa-align-center"></i>
                            </button>
                            <button type="button" class="btn border-dark">
                                <i class="fas fa-align-right"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn border-dark">
                                {/* <i class="fas fa-align-left"></i> */}
                                <i class="fas fa-bold"></i>
                            </button>
                            <button type="button" class="btn border-dark">
                                {/* <i class="fas fa-align-center"></i> */}
                                <i class="fas fa-italic"></i>
                            </button>
                            <button type="button" class="btn border-dark">
                                {/* <i class="fas fa-align-right"></i> */}
                                <i class="fas fa-underline"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <Btn
                    text='Add'
                    onClick={() => handleSubmit()}
                />

            </Modal.Body>
        </Modal>
    )
});
