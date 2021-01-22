import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Alert } from 'react-bootstrap';
import Btn from './Btn';
import TextInput from './TextInput';
import TextArea from './TextArea';
import fire from '../FirebaseApp';
import { withTheme } from '../context/AppContext';

export default withTheme(({
    show,
    toggle,
    data,
    context
}) => {
    console.log('data ----', data);
    const [state, setState] = useState({
        loading: false,
        message: {
            type: 'success',
            text: null,
            show: false
        }
    })

    const [userData, setUserData] = useState({ ...data });

    const saveData = e => {
        // e.preventDefault();
        setState({
            ...state,
            loading: !state.loading,
            data
        });
        console.log('saving --', userData)
        fire.firestore().collection('users')
            .where('email', '==', data.email)
            // .where('uid', '==', data.uid)
            .get()
            .then(res => {
                res.forEach(val => {
                    console.log(val.data())
                    fire.firestore().collection('users').doc(val.id).update(userData)
                        .then(update => {
                            context.setContextState({
                                auth: { ...context.auth, ...userData }
                            });
                            localStorage.setItem('auth', JSON.stringify({ ...context.auth, ...userData }))
                            setState({
                                ...state,
                                message: {
                                    type: 'success',
                                    text: 'Saved!',
                                    show: true
                                }
                            });
                            setTimeout(() => {
                                toggle()
                                setState({
                                    ...state,
                                    message: {
                                        type: 'success',
                                        text: 'Saved!',
                                        show: false
                                    }
                                });
                                setState({
                                    ...state,
                                    loading: false,
                                });
                            }, 2000);
                        })
                })
            })
            .catch(err => {
                setState({
                    ...state,
                    loading: false
                });
                // alert('save error')
                console.log(err)
                setState({
                    ...state,
                    message: {
                        type: 'danger',
                        text: 'Saved Error',
                        show: true
                    }
                });
                setTimeout(() => {
                    toggle()
                    setState({
                        ...state,
                        message: {
                            type: 'success',
                            text: 'Saved!',
                            show: false
                        }
                    });
                }, 2000);
            })


    }

    return (
        <Modal show={show}>
            <Modal.Body>
                <div className='text-center'>
                    <h4>Edit Profile</h4>
                </div>
                <hr />
                <div>
                    {
                        state.message.show ? <Alert variant={state.message.type}>
                            {state.message.text}
                        </Alert> : null
                    }
                    <Row>
                        <Col>
                            <TextInput
                                placeholder='Facebook'
                                onChange={e => setUserData({ ...state, facebook: e })}
                                label='Facebook URL'
                                name='facebook'
                                value={data.facebook}
                                disabled={state.loading}
                            />
                        </Col>
                        <Col>
                            <TextInput
                                placeholder='Instagram'
                                onChange={e => setUserData({ ...state, instagram: e })}
                                label='Instagram URL'
                                name='instagram'
                                value={data.instagram}
                                disabled={state.loading}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextInput
                                placeholder='LinkedIn'
                                onChange={e => setUserData({ ...state, linkedin: e })}
                                label='LinkedIn URL'
                                name='linkedin'
                                value={data.linkedin}
                                disabled={state.loading}
                            />
                        </Col>
                        <Col>
                            <TextInput
                                placeholder='Twitter'
                                onChange={e => setUserData({ ...state, twitter: e })}
                                label='Twitter URL'
                                name='twitter'
                                value={data.twitter}
                                disabled={state.loading}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextInput
                                placeholder='Title eg: Web Developer, Writer, Doctor'
                                onChange={e => setUserData({ ...state, title: e })}
                                label='Title'
                                name='title'
                                value={data.title}
                                disabled={state.loading}
                            />
                        </Col>
                        <Col>
                            <TextInput
                                placeholder='Website eg: www.mywebsite.com'
                                onChange={e => setUserData({ ...state, twitter: e })}
                                label='Website URL'
                                name='website'
                                value={data.website}
                                disabled={state.loading}
                            />
                        </Col>
                    </Row>
                    <TextArea value={data.bio} onChange={e => setUserData({ ...userData, bio: e.target.value })} disabled={state.loading} placeholder='Tell us about yourself' />
                    <Btn text='Save' loading={state.loading} onClick={saveData} />
                </div>
                <Btn
                    text='Cancel'
                    onClick={state.loading ? null : toggle}
                    className='text-dark'
                    style={{ background: 'none' }}
                    disabled={state.loading}
                />
            </Modal.Body>
        </Modal>
    )
});
