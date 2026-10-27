'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [districtData, setDistrictData] = useState([])
    const [placeData, setPlaceData] = useState([])
    const [districtId, setDistrictId] = useState(null)
    const [placeId, setPlaceId] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [photo, setPhoto] = useState("")

    const router = useRouter()

    const fetchDistrictData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/district')
            console.log(res.data);
            setDistrictData(res.data.districtData)
        } catch (error) {
            console.log(error);

        }
    }


    const fetchPlaceData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/place')
            console.log(res.data);
            setPlaceData(res.data.placeData)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("contact", contact);
            formdata.append("address", address);
            formdata.append("placeId", placeId);
            formdata.append("photo", photo);
            formdata.append("password", password);
            const res = await axios.post('http://localhost:3000/api/user', formdata)
            console.log(res.data);
            alert(res.data.msg)
            router.push('/login')
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        fetchDistrictData()
        fetchPlaceData()
    }, [])

    return (
        <div>
            <table border={1} cellPadding={10} align='center'>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" onChange={(e) => setName(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="email" onChange={(e) => setEmail(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td><input type="text" onChange={(e) => setContact(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            <textarea name="" id="" onChange={(e) => setAddress(e.target.value)}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>District</td>
                        <td>
                            <select name="" id="" onChange={(e) => setDistrictId(e.target.value)} value={districtId ?? ""}>
                                <option value="" disabled>--Select District--</option>
                                {districtData.map((data) => (
                                    <option key={data._id} value={data._id}>{data.district}</option>
                                ))}

                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Place</td>
                        <td>
                            <select name="" id="" onChange={(e) => setPlaceId(e.target.value)} value={placeId ?? ""}>
                                <option value="" disabled>--Select Place--</option>
                                {placeData.filter((place) => place.districtId._id === districtId).map((data) => (
                                    <option key={data._id} value={data._id}>{data.place}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Photo</td>
                        <td><input type="file" onChange={(e) => setPhoto(e.target.files[0])} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" onChange={(e) => setPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'>
                            <button onClick={handleSubmit}>Submit</button>
                            <button>Reset</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default page