import React from 'react'
// import { Link } from 'react-router-dom'
import Link from 'next/link'
import Image from 'next/image'
// import black from '../assets/images/logo/logo-black.png'
// import white from '../assets/images/logo/logo-white2.png'
// import author from '../assets/images/others/author.png'
// import black from '../'
// import black from '../'
// import a from './A.png'
import { withTheme } from '../context/AppContext'

export default withTheme(props => {
    const { context } = props;
    const { auth } = context;
    return (
        <header className="header axil-header  header-light header-sticky header-with-shadow">
            <div className="header-wrap">
                <div className="row justify-content-between align-items-center">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-3 col-12">
                        <div className="logo">
                            {/* <Link href='/'>
                                <Image className="dark-logo" src={a} height='40%' style={{ width: '60%', height: '20%' }} alt="Blogar logo" />
                                <Image className="light-logo" src={a} height='40%' style={{ width: '60%', height: '20%' }} alt="Blogar logo" />
                            </Link> */}
                        </div>
                    </div>

                    <div className="col-xl-6 d-none d-xl-block">
                        <div className="mainmenu-wrapper">
                            <nav className="mainmenu-nav">
                                <ul className="mainmenu">
                                    <li className="menu-item-has-children"><Link href='/'>Home</Link>
                                    </li>

                                    {/* <li><a href="home-lifestyle-blog.html">Lifestyle</a></li>
                                    <li><a href="home-tech-blog.html">Gadgets</a></li> */}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-8 col-md-8 col-sm-9 col-12">
                        <div className="header-search text-right d-flex align-items-center">
                            <form className="header-search-form">
                                <div className="axil-search form-group">
                                    <button type="submit" className="search-button"><i className="fal fa-search"></i></button>
                                    <input type="text" className="form-control" placeholder="Search" />
                                </div>
                            </form>
                            <ul className="metabar-block">
                                <li className="icon"><Link href="/"><i className="fas fa-home"></i></Link></li>
                                {auth ? <li className="icon"><Link href="/editor"><i className="fas fa-pencil-alt"></i></Link></li>: null}
                                {/* {
                                    auth ?
                                        <li><Link onClick={() => { }} to={auth ? `/user/${auth.uid}` : '#'}><img src={auth.photoURL} alt="Author Images" /></Link></li> :
                                        <li onClick={context.openGoogleLogin} className="icon"><Link to="#"><i className="fas fa-user-alt"></i></Link></li>
                                } */}
                            </ul>
                            <div className="hamburger-menu d-block d-xl-none">
                                <div className="hamburger-inner">
                                    <div className="icon"><i className="fal fa-bars"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
});
