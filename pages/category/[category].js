import React from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';

export default () => {
    const router = useRouter()
    const { category } = router.query
    return (
        <div>
            <h1>{category}</h1>
        </div>
    )
}
