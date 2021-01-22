import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import fire from '../FirebaseApp';

export default function EachPost({
    data
}) {
    const [user, setUser] = useState(null);
    const [cat, setCat] = useState(null)

    const getCategory = () => {
        fire.firestore().collection('categories').where('id', '==', data.category).get()
            .then(res => {
                res.forEach(val => {
                    // console.log(val.data())
                    setCat(val.data())
                })
            })
            .catch(err => {
                alert('category error')
            })
    }

    useEffect(() => {
        if (!user) {
            fire.firestore().collection('users').where('uid', '==', data.uid).get()
                .then(res => {
                    res.forEach(val => {
                        // console.log('val --', val.data());
                        setUser(val.data())
                    })
                })
        };
        getCategory();
    })

    // console.log(data)
    return (
        <article className="content-block post-list-view axil-control mt--30">
            {
                <div className="post-thumbnail">
                    <Link href={`/post/${data.title}/${data.id}`} 
                    //  to={{
                    //     pathname: `/post/${data.title}/${data.id}`,
                    //     state: data
                    // }}
                    >
                        <img src="https://cdn4.wpbeginner.com/wp-content/uploads/2018/07/whatisblog.png" alt="Post Images" />
                    </Link>
                </div>
            }
            <div className="post-content">
                <div className="post-cat">
                    <div className="post-cat-list">
                        {
                            cat ?
                                <Link className="hover-flip-item-wrapper" to={`/category/${cat.value.toLowerCase()}`}>
                                    <span className="hover-flip-item">
                                        <span data-text={cat.value.toUpperCase()}>{cat.value.toUpperCase()}</span>
                                    </span>
                                </Link> : null
                        }
                    </div>
                </div>
                <h4 className="title">
                    <Link href={`/post/${data.title}/${data.id}`} 
                    // to={{
                    //     pathname: `/post/${data.title}/${data.id}`,
                    //     state: { ...data, user }
                    // }}
                    >{data.title}
                    </Link>
                </h4>
                <div class="post-meta-wrapper">
                    <div class="post-meta">
                        {user ? <div class="post-author-avatar border-rounded">
                            <img src={user.photoURL} alt="Author Images" style={{ width: '45px' }} />
                        </div> : <span>Loading..</span>}
                        <div class="content">
                            {user ? <h6 class="post-author-name">
                                <Link class="hover-flip-item-wrapper" 
                                // to={{
                                //     pathname: `/user/${user.uid}`,
                                //     state: user
                                // }}
                                >
                                    <span class="hover-flip-item">
                                        <span data-text={user.displayName}>{user.displayName}</span>
                                    </span>
                                </Link>
                            </h6> : null}
                            <ul class="post-meta-list">
                                <li>{new Date(data.createdAt).toLocaleDateString()}</li>
                                <li>{data.views} views</li>
                            </ul>
                        </div>
                    </div>
                    <ul class="social-share-transparent justify-content-end">
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fas fa-link"></i></a></li>
                    </ul>
                </div>
            </div>
        </article>
    )
}
