import React, { useState, useEffect } from 'react'
import SidePanel from '../../../components/SidePanel'
import AppLoader from '../../../components/AppLoader'
import TextArea from '../../../components/TextArea'
import Btn from '../../../components/Btn'
import Link from 'next/link'
import fire from '../../../FirebaseApp'
import CommentSection from '../../../components/CommentSection'
import { withTheme } from '../../../context/AppContext'
import { v4 as uid } from 'uuid'
import { Spinner } from 'react-activity'
import { useRouter } from 'next/router'
import Global from '../../../Global'
import { NextSeo } from 'next-seo';


const Details = withTheme(props => {
    const router = useRouter()
    // console.log('PROPS ---', props, router);
    const { pid } = router.query
    const { location, context } = props;
    // const [data, setData] = useState(props.data);
    const [user, setUser] = useState(null);
    const [cat, setCat] = useState(null);
    const [html, setHtml] = useState('')

    const [likes, setLikes] = useState('0')
    const [likeLoading, setLikeLoading] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);

    const updateViewCount = () => {
        fire.firestore().collection('posts').where('id', '==', props.match.params.id)
            .where('title', '==', props.match.params.title).get()
            .then(res => {
                res.forEach(val => {
                    // console.log('val -', val.data());
                    fire.firestore().collection('posts').doc(val.id).update({
                        views: val.data().views + 1
                    })
                })
            })

    }

    const updateCategoryView = () => {
        // console.log('updating cat ', data);
        fire.firestore().collection('categories').where('value', '==', data.category.value).get()
            .then(res => {
                res.forEach(val => {
                    // console.log('val -', val.data());
                    fire.firestore().collection('categories').doc(val.id).update({
                        views: val.data().views + 1
                    })
                })
            })
            .catch(err => console.log('err --', err))
    }

    const fetchUserData = id => {
        if (!data.user) {
            fire.firestore().collection('users').where('uid', '==', data.uid).get()
                .then(res => {
                    res.forEach(val => {
                        setUser(val.data());
                    })
                })
                .catch(err => {
                    alert('Error loading Authors data')
                })
        }
    }

    const getCategory = () => {
        if (data) {
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
    }

    const likePost = () => {
        if (!context.auth) {
            alert('Please login to like posts');
        } else
            setLikeLoading(true)
        fire.firestore().collection('likes').add({
            id: uid(),
            post_id: data.id,
            user_id: context.auth.uid,
            createdAt: new Date().toJSON()
        })
            .then(res => {
                setLikeLoading(false)
                console.log(res.id)
                setLikes(likes + 1);
                setHasLiked(true);
            })
            .catch(err => {
                setLikeLoading(false)
                alert('Error please try again')
            })
    }

    const fetchPostData = () => {
        if (!data) {
            fire.firestore().collection('posts').where('id', '==', props.match.params.id)
                .where('title', '==', props.match.params.title).get()
                .then(res => {
                    res.forEach(val => {
                        // console.log('val', val.data())
                        setData(val.data())
                    });
                })
                .catch(err => {
                    // console.log('err', err);
                    alert('Error Loading Data')
                })
        }
    }

    const fetchLikeCount = () => {
        if (data) {
            fire.firestore().collection('likes').where('post_id', '==', data.id).get()
                .then(res => {
                    setLikes(res.size)
                })
                .catch(err => {
                    console.log(err)
                    alert('Error fetching likes')
                })
        }
    }

    const disLikePost = () => {
        if (data && context.auth) {
            console.log('dislike')
            setLikeLoading(true);
            fire.firestore().collection('likes').where('user_id', '==', context.auth.uid)
                .where('post_id', '==', data.id).get()
                .then(res => {
                    res.forEach(val => {
                        console.log('priv likes --', val.data())
                        fire.firestore().collection('likes').doc(val.id).delete()
                            .then(deleted => {
                                setLikeLoading(false);
                                setHasLiked(false);
                                setLikes(likes - 1)
                            })
                    })
                })
                .catch(err => {
                    setLikeLoading(false);
                    alert('Error please try again')
                })
        }
    }

    const checkIfUserLikes = () => {
        if (data && context.auth) {
            setLikeLoading(true)
            fire.firestore().collection('likes').where('user_id', '==', context.auth.uid)
                .where('post_id', '==', data.id).get()
                .then(res => {
                    if (res.size > 0) {
                        setHasLiked(true);
                    }
                    setLikeLoading(false)
                })
                .catch(err => {
                    setLikeLoading(false)
                    alert('Error fetching like data')
                })
        }
    }

    // useEffect(() => {
    //     console.log('PROPS ---', props)
    // }, [data]);

    const { data } = props;
    if (data) {
        // fetchUserData()
        return (
            // <h1>Working</h1>
            <div className="post-single-wrapper axil-section-gap bg-color-white">
                <NextSeo
                    title={data.title}
                    description={data.title}
                />

                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="banner banner-single-post post-formate post-layout axil-section-gapBottom">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="content-block">
                                                <div className="post-content">
                                                    <div className="post-cat">
                                                        <div className="post-cat-list">
                                                            {/* {cat ? <a className="hover-flip-item-wrapper" href="#">
                                                                <span className="hover-flip-item">
                                                                    <span data-text={cat.value.toUpperCase()}>{cat.value.toUpperCase()}</span>
                                                                </span>
                                                            </a> : null} */}
                                                        </div>
                                                    </div>
                                                    <img src={data.imageURL} />
                                                    <h1 className="title">{data.title}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="axil-post-details">
                                <div id='html'>
                                    {/* {parse(data.html)} */}
                                    <div dangerouslySetInnerHTML={{ __html: data.html }} />
                                </div>
                                <hr />
                                <div className="tagcloud">
                                    {data.subCategories.map((val, i) => {
                                        return <a key={i} href="#">{val.value.toUpperCase()}</a>
                                    })}
                                </div>

                                <div className="social-share-block">
                                    {
                                        likeLoading ? <Spinner /> :
                                            <div className="post-like" onClick={hasLiked ? disLikePost : likePost}>
                                                <a href="#like"><i className={"fal fa-thumbs-up " + `${hasLiked ? 'bg-danger text-white' : null}`}></i><span>{likes} Likes</span></a>
                                            </div>
                                    }
                                    <ul className="social-icon icon-rounded-transparent md-size">
                                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                    </ul>
                                </div>

                                <div className="about-author">
                                    {
                                        user ? <div className="media">
                                            <div className="thumbnail">
                                                <a href="#">
                                                    <img src={user.photoURL} alt="Author Images" />
                                                </a>
                                            </div>
                                            <div className="media-body">
                                                <div className="author-info">
                                                    <h5 className="title">
                                                        <Link className="hover-flip-item-wrapper" to={`/user/${user.uid}`}>
                                                            <span className="hover-flip-item">
                                                                <span data-text={user.displayName}>{user.displayName}</span>
                                                            </span>
                                                        </Link>
                                                    </h5>
                                                    <span className="b3 subtitle">{user.title}</span>
                                                </div>
                                                <div className="content">
                                                    <p className="b1 description">{user.bio}</p>
                                                    <ul className="social-share-transparent size-md">
                                                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                                        <li><a href="#"><i className="far fa-envelope"></i></a></li>
                                                        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div> : <span>Loading...</span>
                                    }
                                </div>

                                <CommentSection post_id={data.id} />
                            </div>
                        </div>
                        <SidePanel />
                    </div>
                </div>
            </div>
        )
    } else {
        return <AppLoader />
    }
});

Details.getInitialProps = async (ctx) => {
    console.log('CONTEXT -', ctx.query)
    const { title, id } = ctx.query;
    const res = await fetch(Global.API_URL + `/api/posts/${title}/${id}`)
    const json = await res.json()
    console.log('JSON ---', json)
    return { data: json }
}

export default Details;
