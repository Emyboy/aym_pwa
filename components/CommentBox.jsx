import React, { useState, useEffect } from 'react'
import { withTheme } from '../context/AppContext'
import fire from '../FirebaseApp';
import Btn from './Btn'
import TextArea from './TextArea'
import { v4 as uuid } from 'uuid';

export default withTheme(props => {
    const { context, post_id, setParentState, parentState } = props;
    const [state, setState] = useState({
        comment: null,
        loading: false
    });

    const addComment = e => {
        // console.log('addding ---', state.comment)
        e.preventDefault();
        if (state.comment) {
            setState({ ...state, loading: true })
            const post = {
                id: uuid(),
                comment: state.comment,
                uid: context.auth.uid,
                createdAt: new Date().toJSON(),
                post_id
            }
            fire.firestore().collection('comment').add(post)
                .then(res => {
                    console.log(res)
                    setState({ ...state, loading: false })
                    fire.firestore().collection('comment').doc(res.id).get()
                        .then(com => {
                            setParentState({
                                ...parentState,
                                comments: [...parentState.comments, com.data()]
                            })
                        })
                })
                .catch(err => {
                    setState({ ...state, loading: false })
                    alert('Error added comment, Please try again')
                })
        } else {
            alert('Please type in a comment')
        }
    }

    return (
        <div className="comment-respond">
            <h4 className="title">Post a comment</h4>
            <form action="#add" onSubmit={addComment}>
                {/* <p className="comment-notes"><span id="email-notes">Your email address will not be
                                                published.</span> Required fields are marked <span className="required">*</span></p> */}
                <div className="row row--10">
                    <div className="col-12">
                        <div className="form-group">
                            <TextArea
                                placeholder={context.auth ? 'Write your comment here' : "Please Login to add a comment"}
                                disabled={state.loading || !context.auth}
                                onChange={e => setState({ ...state, comment: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* <div className="col-lg-12">
                                                    <p className="comment-form-cookies-consent">
                                                        <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes" />
                                                        <label for="wp-comment-cookies-consent">Save my name, email, and
                                                        website in this browser for the next time I comment.</label>
                                                    </p>
                                                </div> */}
                    <div className="col-lg-12">
                        <div className="form-submit cerchio" style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}>
                            <Btn
                                // onClick={addComment}
                                text='Comment'
                                loading={state.loading}
                                disabled={!context.auth || state.loading}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
});
