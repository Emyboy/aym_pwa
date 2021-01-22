import React, { useEffect, useState } from 'react'
import fire from '../FirebaseApp'

export default function EachComment({
    data
}) {

    const [state, setState] = useState({
        user: null,
        loading: false
    })
    const getUserData = () => {
        fire.firestore().collection('users').where('uid', '==', data.uid).get()
            .then(user => {
                user.forEach(val => {
                    setState({ ...state, user: val.data() })
                })
            })
            .catch(err => {
                alert('Error fetching user data')
            })
    };

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <li className="comment">
            <div className="comment-body">
                <div className="single-comment">
                    {state.user ? <div className="comment-img mr-0">
                        <img src={state.user.photoURL} alt={state.user.displayName+"'s Images"} style={{ width: '80%' }}/>
                    </div>: null}
                    <div className="comment-inner">
                        {
                            state.user ? <h6 className="commenter">
                                <a className="hover-flip-item-wrapper" href="#">
                                    <span className="hover-flip-item">
                                        <span data-text={state.user.displayName}>{state.user.displayName}</span>
                                    </span>
                                </a>
                            </h6>: null
                        }
                        <div className="comment-meta">
                            <div className="time-spent">Nov 23, 2018 at 12:23 pm</div>
                            <div className="reply-edit">
                                <div className="reply row ml-3">
                                    <a className="comment-reply-link hover-flip-item-wrapper" href="#edit">
                                        <span className="hover-flip-item">
                                            {/* <span data-text="Reply">Reply</span> */}
                                            <i className='fa fa-pen' data-text="Edit"> {' '} Edit</i>{' | '}
                                        </span>
                                    </a>
                                    {' '}
                                    <a className="comment-reply-link hover-flip-item-wrapper" href="#delete">
                                        <span className="hover-flip-item">
                                            <i className='fa fa-trash' data-text="Delete"> {' '} Delete</i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="comment-text">
                            <p className="b2">{data.comment} </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ul className="children">
                <li className="comment">
                    <div className="comment-body">
                        <div className="single-comment">
                            <div className="comment-img">
                                <img src="assets/images/post-images/author/author-b3.png" alt="Author Images" />
                            </div>
                            <div className="comment-inner">
                                <h6 className="commenter">
                                    <a className="hover-flip-item-wrapper" href="#">
                                        <span className="hover-flip-item">
                                            <span data-text="Rahabi Khan">Rahabi Khan</span>
                                        </span>
                                    </a>
                                </h6>
                                <div className="comment-meta">
                                    <div className="time-spent">Nov 23, 2018 at 12:23 pm
                                                                    </div>
                                    <div className="reply-edit">
                                        <div className="reply">
                                            <a className="comment-reply-link hover-flip-item-wrapper" href="#">
                                                <span className="hover-flip-item">
                                                    <span data-text="Reply">Reply</span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-text">
                                    <p className="b2">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse lobortis cursus lacinia. Vestibulum vitae leo id diam pellentesque ornare.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul> */}
        </li>
    )
}
