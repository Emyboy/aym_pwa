import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { withTheme } from '../context/AppContext';
import fire from '../FirebaseApp'
import EachPostSM from './EachPostSM';
import EachCat from './EachCat';

export default withTheme(({
    type,
    context
}) => {

    const [list, setList] = useState([]);
    const [heading, setHeading] = useState('');
    const [cats, setCats] = useState([])



    const popularCats = () => {
        // console.log('getting pop cats')
        const list = [];
        fire.firestore().collection('categories').limit(4).orderBy('views', 'desc').get()
            .then(res => {
                res.forEach(cat => {
                    // console.log(cat.data())
                    list.push(cat.data())
                })
                setCats(list);
            })
            .catch(err => alert('Error loading categories'))
    }

    const fetchRecentPosts = () => {
        fire.firestore().collection('posts').limit(4).orderBy('number').get()
            .then(res => {
                const arr = [];
                res.forEach(val => {
                    arr.push(val.data())
                });
                setList(arr);
            })
            .catch(err => {
                alert('Error Fetching Popular Posts')
            })
    }

    const fetchPopularPosts = () => {
        fire.firestore().collection('posts').limit(4).orderBy('views', 'desc').get()
            .then(res => {
                const arr = [];
                res.forEach(val => {
                    // console.log(val)
                    arr.push(val.data())
                });
                setList(arr);
            })
            .catch(err => {
                alert('Error Fetching Popular Posts')
            })
    }

    useEffect(() => {
        // console.log('type --- ', type)
        popularCats()
        switch (type) {
            case 'popular':
                fetchPopularPosts()
                setHeading('Popular Posts')
                break;
            case 'recent':
                setHeading('Recent Posts')
                fetchRecentPosts()
                break;
            default:
                fetchRecentPosts();
        }
    }, []);

    return (
        <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
            <div className="sidebar-inner">

                <div className="axil-single-widget widget widget_categories mb--30">
                    <ul>
                        {
                            cats.map((val, i) => {
                                // console.log('EACH CAT --', val)
                                return (
                                    <EachCat data={val} />
                                )
                            })
                        }

                        
                    </ul>
                </div>
                {/* <div className="axil-single-widget widget widget_search mb--30">
                    <h5 className="widget-title">Search</h5>
                    <form action="#">
                        <div className="axil-search form-group">
                            <button type="submit" className="search-button"><i className="fal fa-search"></i></button>
                            <input type="text" className="form-control" placeholder="Search" />
                        </div>
                    </form>
                </div> */}
                <div className="axil-single-widget widget widget_postlist mb--30">
                    <h5 className="widget-title">{heading}</h5>
                    <div className="post-medium-block">
                        {
                            context.popularPosts.map((val, i) => {
                                // console.log(val)
                                return (<EachPostSM data={val} key={i} />)
                            })
                        }
                    </div>

                </div>

                <div className="axil-single-widget widget widget_social mb--30">
                    <h5 className="widget-title">Stay In Touch</h5>
                    <ul className="social-icon md-size justify-content-center">
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-slack"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                    </ul>
                </div>

                {/* <div className="axil-single-widget widget widget_instagram mb--30">
                    <h5 className="widget-title">Instagram</h5>
                    <ul className="instagram-post-list-wrapper">
                        <li className="instagram-post-list">
                            <a href="#">
                                <img src="assets/images/small-images/instagram-01.jpg" alt="Instagram Images" />
                            </a>
                        </li>
                        <li className="instagram-post-list">
                            <a href="#">
                                <img src="assets/images/small-images/instagram-02.jpg" alt="Instagram Images" />
                            </a>
                        </li>
                        <li className="instagram-post-list">
                            <a href="#">
                                <img src="assets/images/small-images/instagram-03.jpg" alt="Instagram Images" />
                            </a>
                        </li>
                        <li className="instagram-post-list">
                            <a href="#">
                                <img src="assets/images/small-images/instagram-04.jpg" alt="Instagram Images" />
                            </a>
                        </li>
                        <li className="instagram-post-list">
                            <a href="#">
                                <img src="assets/images/small-images/instagram-05.jpg" alt="Instagram Images" />
                            </a>
                        </li>
                        <li className="instagram-post-list">
                            <a href="#">
                                <img src="assets/images/small-images/instagram-06.jpg" alt="Instagram Images" />
                            </a>
                        </li>
                    </ul>
                </div> */}
            </div>



        </div>
    )
});
