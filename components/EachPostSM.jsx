import React from 'react'
import Link from 'next/link'

export default function EachPostSM({
    data
}) {
    return (
        <div className="content-block post-medium mb--20">
            {
                data.imageURL ?
                    <div className="post-thumbnail">
                        <Link to={{
                        pathname: `/post/${data.title}/${data.id}`,
                        state: data
                    }}>
                            <img src="assets/images/small-images/blog-sm-01.jpg" alt="Post Images" />
                        </Link>
                    </div> : null
            }
            <div className="post-content">
                <h6 className="title"><Link to={{
                        pathname: `/post/${data.title}/${data.id}`,
                        state: data
                    }}>{data.title}</Link></h6>
                <div className="post-meta">
                    <ul className="post-meta-list">
                        <li>{new Date(data.createdAt).toLocaleDateString()}</li>
                        <li>{data.views} Views</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
