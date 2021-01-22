import React from 'react'
import { Spinner } from 'react-activity'

export default function AppLoader() {
    return (
        <div>
            <div className='text-center' style={{ marginTop: '200px' }}>
                <Spinner size={30} color='#007bff' />
            </div>
        </div>
    )
}
