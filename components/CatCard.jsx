import React from 'react'
import { Link } from 'react-router-dom';

export default function CatCard({ data }) {
    // console.log(data);
    return (
        <div className="content-block image-rounded shadow m-2 p-3">
            <div className="post-thumbnail">
                {data.imageURL ?
                    <a href="post-details.html">
                        <img src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'} alt="Post Images" />
                    </a> : null
                }
            </div>
            <div className="post-content pt--20">
                <div className="post-cat">
                    <div className="post-cat-list">
                        <a className="hover-flip-item-wrapper" href="#">
                            <span className="hover-flip-item">
                                {/* <span data-text={data.category.label.toUpperCase()}>{data.category.label.toUpperCase()}</span> */}
                            </span>
                        </a>
                    </div>
                </div>
                <h5 className="title"><Link to={{
                    pathname: `/post/${data.title}/${data.id}`,
                    state: data
                }}>{data.title}</Link></h5>
            </div>
        </div>
    )
}
