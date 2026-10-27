'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [districtData, setDistrictData] = useState([])
    const [districtId, setDistrictId] = useState(null)
    const [place, setPlace] = useState("")
    const [placeData, setPlaceData] = useState([])
    const [editId, setEditId] = useState(null)


    const fetchDistrictData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/district')
            console.log(res.data);
            setDistrictData(res.data.districtData)
        } catch (error) {
            console.log(error);

        }
    }


    const handleSubmit = async () => {
        try {
            if (editId) {
                const formdata = new FormData();
                formdata.append("districtId", districtId);
                formdata.append("place", place);
                const res = await axios.put(`http://localhost:3000/api/place/${editId}`, formdata)
                console.log(res.data);
                alert(res.data.message)
                fetchPlaceData()
                setEditId(null)
                setDistrictId(null)
                setPlace("")
            } else {
                const formdata = new FormData();
                formdata.append("districtId", districtId);
                formdata.append("place", place);
                const res = await axios.post('http://localhost:3000/api/place', formdata)
                console.log(res.data);
                alert(res.data.message)
                fetchPlaceData()
                setDistrictId(null)
                setPlace("")
            }
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



    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/place/${id}`)
            console.log(res.data);
            alert(res.data.message)
            fetchPlaceData()
        } catch (error) {
            console.log(error);
        }
    }


    const handleEdit = (data) => {
        setEditId(data._id)
        setDistrictId(data.districtId._id)
        setPlace(data.place)
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
                        <td><input type="text" value={place} onChange={(e) => setPlace(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'>
                            <button onClick={handleSubmit}>Submit</button>
                            <button>Reset</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <br /><br /><br />

            <table border={1} cellPadding={10} align='center'>
                <tbody>
                    <tr>
                        <td>Sl. No.</td>
                        <td>District</td>
                        <td>Place</td>
                        <td>Action</td>
                    </tr>
                    {placeData.map((data, index) => (
                        <tr key={data._id}>
                            <td>{index + 1}</td>
                            <td>{data.districtId?.district}</td>
                            <td>{data.place}</td>
                            <td>
                                <button onClick={() => handleEdit(data)}>Edit</button>
                                <button onClick={() => handleDelete(data._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default page