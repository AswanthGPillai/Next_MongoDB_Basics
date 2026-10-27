'use client'

import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <h1>Welcome, Admin ....</h1><br />
            <Link href={'/admin/district'}>District</Link><br />
            <Link href={'/admin/place'}>Place</Link><br />
            <Link href={'/admin/userlist'}>User List</Link>
        </div>
    )
}

export default page