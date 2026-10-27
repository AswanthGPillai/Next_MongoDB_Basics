import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <h1>Welcome, User</h1><br />
            <Link href={'/user/myprofile'}>My Profile</Link>
        </div>
    )
}

export default page