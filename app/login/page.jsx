'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Method	                                                                       Purpose
    // ---------------------                                                           --------------------------------------------
    // router.push('/home')	                                                           Navigate to a page
    // router.replace('/home')	                                                       Navigate without keeping the current page in history
    // router.back()	                                                               Go to the previous page
    // router.refresh()	                                                               Refresh the current route's server-rendered data

    const router = useRouter()

    const handleLogin = async () => {
        try {
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("password", password);
            const res = await axios.post('http://localhost:3000/api/login', formdata);
            console.log(res.data);
            if (res.data.userData) {
                sessionStorage.setItem('uid', res.data.userData._id)
                alert(res.data.msg)
                router.push('/user')
            } else {
                alert(res.data.msg)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <table border={1} align='center' cellPadding={10}>
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td><input type="text" onChange={(e) => setEmail(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" onChange={(e) => setPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'>
                            <button onClick={handleLogin}>Login</button>
                            <button>Reset</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default page