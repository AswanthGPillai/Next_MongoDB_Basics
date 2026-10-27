'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [uid, setUid] = useState("")
    const [userData, setUserData] = useState({})

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/user/${uid}`)
            console.log(res.data.userData);
            setUserData(res.data.userData)
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        const id = sessionStorage.getItem('uid')
        if (id) {
            setUid(id)
        }
    }, [])

    useEffect(() => {
        if (uid) {
            fetchUserData()
        }
    }, [uid])

    return (
        <div>
            <table border={1} align='center' cellPadding={10}>
                <tbody>
                    <tr>
                        <td colSpan={2} align='center'>
                            <img src={userData.photo} alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{userData.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{userData.email}</td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td>{userData.contact}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{userData.address}</td>
                    </tr>
                    <tr>
                        <td>Place</td>
                        <td>{userData.placeId?.place}</td>
                    </tr>
                    <tr>
                        <td>District</td>
                        <td>{userData.placeId?.districtId?.district}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'>
                            <Link href={'/user/editprofile'}>Edit Profile</Link>
                            <Link href={'/user/changepassword'}>Change Password</Link>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default page