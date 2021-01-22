import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className='bg-white'>
            <div className="footer-top bg-white pt-4">
                <div className="container bg-white">
                    <div className="row">

                        <div className="col-lg-4 col-md-4">
                            <div className="logo">
                                <Link href="/">
                                    <img width='10%' className="dark-logo" src="https://i.pinimg.com/originals/12/d9/a9/12d9a922420b6a9ec08e9b0b6c0b06f3.png" alt="Logo Images" />
                                    {/* <img className="white-logo" src="https://i.pinimg.com/originals/12/d9/a9/12d9a922420b6a9ec08e9b0b6c0b06f3.png" alt="Logo Images" /> */}
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-8">
                            <div className="d-flex justify-content-start mt_sm--15 justify-content-md-end align-items-center flex-wrap">
                                <h5 className="follow-title mb--0 mr--20">Follow Us</h5>
                                <ul className="social-icon color-tertiary md-size justify-content-start">
                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <hr />


            <div className="copyright-area pb-5 bg-white">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-9 col-md-8">
                            <div className="copyright-left">
                                <ul className="mainmenu justify-content-start">
                                    <li>
                                        <a className="hover-flip-item-wrapper" href="#">
                                            <span className="hover-flip-item">
                                                <span data-text="Contact Us">Contact Us</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover-flip-item-wrapper" href="#">
                                            <span className="hover-flip-item">
                                                <span data-text="Terms of Use">Terms of Use</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover-flip-item-wrapper" href="#">
                                            <span className="hover-flip-item">
                                                <span data-text="AdChoices">AdChoices</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover-flip-item-wrapper" href="#">
                                            <span className="hover-flip-item">
                                                <span data-text="Advertise with Us">Advertise with Us</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="hover-flip-item-wrapper" href="#">
                                            <span className="hover-flip-item">
                                                <span data-text="Blogar Store">Blogar Store</span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <div className="copyright-right text-left text-md-right mt_sm--20">
                                <p className="b3">All Rights Reserved © 2020</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
