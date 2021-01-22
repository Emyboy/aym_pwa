import React from 'react'

export default function EachCat({
    data
}) {
    return (
        <li className="cat-item">
            <a href="#" className="inner">
                {data.image ? <div className="thumbnail">
                    <img src={data.image} alt={data.value+"'s image"} />
                </div>: null}
                <div className="content">
                    <h5 className="title">{data.value.toUpperCase()}</h5>
                </div>
            </a>
        </li>
    )
}
