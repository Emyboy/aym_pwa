import React from 'react'
import Link from 'next/link'

export default function EachPostSM({
    data
}) {
    return (
        <div className="content-block post-medium mb--20">
            {
                <div className="post-thumbnail">
                    <Link href={`/post/${data.title}/${data.id}`}>
                        <img src={data.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNkx6ybpAzHalWhT4UMEkvg2MTvPYw6Fwnlg&usqp=CAU'} alt="Post Images" />
                    </Link>
                </div>
            }
            <div className="post-content">
                <h6 className="title"><Link href={`/post/${data.title}/${data.id}`}>{data.title}</Link></h6>
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
