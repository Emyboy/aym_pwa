import React from 'react'

export default function SubHeading({title}) {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="section-title">
                    <h2 className="title">{title}</h2>
                </div>
            </div>
        </div>
    )
}
