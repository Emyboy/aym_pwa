import React from 'react'
import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from 'react-placeholder';

export default function PostsLoading() {
    return (
        <>
           {
                [1, 2, 3, 4].map((val, i) => <div className="post-content p-5 rounded border ontent-block post-list-view axil-control mt--30">
                    <div className='mt-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <RectShape color='#c0c0c0' style={{ width: 145, height: 120, marginRight: '60px' }} />
                        <TextBlock rows={4} color='#c0c0c0' />
                    </div>
                </div>)
           }
        </>
    )
}
