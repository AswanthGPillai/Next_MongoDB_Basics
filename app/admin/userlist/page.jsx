'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [usersData, setUsersData] = useState([])

    const fetchUsersData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/user')
            console.log(res.data);
            setUsersData(res.data.userData)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchUsersData()
    }, [])
    return (
        <div>
            <table border={1} align='center' cellPadding={10}>
                <tbody>
                    <tr>
                        <td>Sl.No</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Contact</td>
                        <td>Address</td>
                        <td>Place</td>
                        <td>District</td>
                        <td>Photo</td>
                    </tr>
                    {usersData.map((data, index) => (
                        <tr key={data._id}>
                            <td>{index + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.contact}</td>
                            <td>{data.address}</td>
                            <td>{data.placeId?.place}</td>
                            <td>{data.placeId?.districtId?.district}</td>
                            <td>
                                <img src={data.photo} alt="" width={150} height={150}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default page