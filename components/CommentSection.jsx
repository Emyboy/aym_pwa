import React, { useState, useEffect } from 'react'
import fire from '../FirebaseApp';
import Btn from './Btn';
import CommentBox from './CommentBox';
import EachComment from './EachComment';
import TextArea from './TextArea';

export default function CommentSection({
    post_id
}) {

    const [state, setState] = useState({
        comments: [],
        commentsLoading: false
    })

    const getPostComment = () => {
        fire.firestore().collection('comment').where('post_id', '==', post_id).get()
            .then(res => {
                const list = [];
                res.forEach(val => {
                    // console.log(val.data())
                    list.push(val.data())
                });
                setState({ ...state, comments: list })
            })
            .catch(err => {
                alert('Error get post comments')
            })
    }

    useEffect(() => {
        if(post_id){
            getPostComment();
        }
    }, [])

    return (
        <div className="axil-comment-area">
            {/* <div className="axil-total-comment-post">
                                        <div className="title">
                                            <h4 className="mb--0">30+ Comments</h4>
                                        </div>
                                        <div className="add-comment-button cerchio" style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}>
                                            <a className="axil-button button-rounded" href="post-details.html" tabindex="0"><span>Add Your Comment</span></a>
                                        </div>
                                    </div> */}



            <div className="axil-comment-area">
                <h4 className="title">{state.comments.length} comments</h4>
                <ul className="comment-list">
                    {
                        state.comments.map((val, i) => {
                            return <EachComment key={i} data={val} />
                        })
                    }
                </ul>
            </div>
            <CommentBox
                setParentState={setState}
                parentState={state}
                post_id={post_id}
            />
        </div>
    )
}
