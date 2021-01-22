import React from 'react'

export default function Wrapper(props) {
    return (
        <div className='container'>
            <div className='main-wrapper'>
                {props.children}
            </div>
        </div>
    )
}
