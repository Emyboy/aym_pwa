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
                        <img src={data.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNkx6ybpAzHalWhT4UMEkvg2MTvPYw6Fwnlg&usqp=CAU' } alt="Post Images" />
                    </Link>
                </div>
            }
            <div className="post-content bg-white">
                <div className="post-cat">
                    <div className="post-cat-list">
                        {
                            cat ?
                                <Link className="hover-flip-item-wrapper" href={`/category/${cat.value.toLowerCase()}`}>
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
                <div className="post-meta-wrapper">
                    <div className="post-meta">
                        {user ? <div className="post-author-avatar border-rounded">
                            <img src={user.photoURL} alt="Author Images" style={{ width: '45px' }} />
                        </div> : <span>Loading..</span>}
                        <div className="content">
                            {user ? <h6 className="post-author-name">
                                <Link href={`/user/${user.uid}`} className="hover-flip-item-wrapper" 
                                // to={{
                                //     pathname: `/user/${user.uid}`,
                                //     state: user
                                // }}
                                >
                                    <span className="hover-flip-item">
                                        <span data-text={user.displayName}>{user.displayName}</span>
                                    </span>
                                </Link>
                            </h6> : null}
                            <ul className="post-meta-list">
                                <li>{new Date(data.createdAt).toLocaleDateString()}</li>
                                <li>{data.views} views</li>
                            </ul>
                        </div>
                    </div>
                    <ul className="social-share-transparent justify-content-end">
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fas fa-link"></i></a></li>
                    </ul>
                </div>
            </div>
        </article>
    )
}
