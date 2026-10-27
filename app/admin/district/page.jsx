'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [district, setDistrict] = useState("")
    const [districtData, setDistrictData] = useState([])
    const [editId, setEditId] = useState(null)

    const handleSubmit = async () => {
        try {
            if (editId) {
                const formdata = new FormData();
                formdata.append("district", district);
                const res = await axios.put(`http://localhost:3000/api/district/${editId}`, formdata)
                console.log(res.data);
                alert(res.data.message)
                setEditId(null)
                setDistrict("")
                fetchDistrictData()
            } else {
                const formdata = new FormData();
                formdata.append("district", district);
                const res = await axios.post('http://localhost:3000/api/district', formdata)
                console.log(res.data);
                alert(res.data.message)
                fetchDistrictData()
            }
        } catch (error) {
            console.log(error);

        }
    }


    const fetchDistrictData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/district')
            console.log(res.data);
            setDistrictData(res.data.districtData)
        } catch (error) {
            console.log(error);

        }
    }


    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/district/${id}`)
            console.log(res.data);
            alert(res.data.message)
            fetchDistrictData()
        } catch (error) {
            console.log(error);

        }
    }

    const handleEdit = (data) => {
        setEditId(data._id);
        setDistrict(data.district);
    }

    useEffect(() => {
        fetchDistrictData()
    }, [])

    return (
        <div>
            <table border={1} cellPadding={10} align='center'>
                <tbody>
                    <tr>
                        <td>District</td>
                        <td><input type="text" onChange={(e) => setDistrict(e.target.value)} value={district} /></td>
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
                        <td>Sl.No</td>
                        <td>District</td>
                        <td>Action</td>
                    </tr>
                    {districtData.map((data, index) => (
                        <tr key={data._id}>
                            <td>{index + 1}</td>
                            <td>{data.district}</td>
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