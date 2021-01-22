import React from 'react'
import Link from 'next/link'

export default function EachCat({
    data
}) {
    return (
        <Link href={`/category/${data.value.toLowerCase()}`}>
            <li className="cat-item">
                <a href="#" className="inner">
                    {/* <div className="thumbnail">
                        <img src="assets/images/post-images/category-image-03.jpg" alt="" />
                    </div> */}
                    <div className="content">
                        <h5 className="title">{data.value.toUpperCase()}</h5>
                    </div>
                </a>
            </li>
        </Link>
    )
}
