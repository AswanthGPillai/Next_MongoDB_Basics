import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <nav>
        <h1>Welcome, User ....</h1>
        <Link href={"/userregistration"}>User Registration</Link><br />
        <Link href={"/login"}>Login</Link>
      </nav>
    </div>
  )
}

export default page