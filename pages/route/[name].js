import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Name() {
    const router = useRouter()
    // console.log('PROPS ---', props, router);
    const { name } = router.query
    return (
        <div>
            <h1>Welcome {name}</h1>
            <h2><Link href='/'>Go Back Home</Link></h2>
        </div>
    )
}
