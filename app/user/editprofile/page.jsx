'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

  const [uid, setUid] = useState("")

  const [districtData, setDistrictData] = useState([])
  const [placeData, setPlaceData] = useState([])
  const [districtId, setDistrictId] = useState(null)
  const [placeId, setPlaceId] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [address, setAddress] = useState("")
  const [photo, setPhoto] = useState("")
  const [newPhoto, setNewPhoto] = useState(null)

  const router = useRouter()

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/user/${uid}`)
      console.log(res.data.userData);
      setName(res.data.userData.name)
      setEmail(res.data.userData.email)
      setContact(res.data.userData.contact)
      setAddress(res.data.userData.address)
      setPlaceId(res.data.userData.placeId._id)
      setDistrictId(res.data.userData.placeId.districtId._id)
      setPhoto(res.data.userData.photo)
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
      if (newPhoto) {
        formdata.append("photo", newPhoto);
      }
      const res = await axios.put(`http://localhost:3000/api/user/${uid}`, formdata)
      console.log(res.data);
      if (res.status == 200) {
        alert(res.data.msg)
        router.push('/user/myprofile')
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.msg)

    }
  }


  useEffect(() => {
    fetchDistrictData()
    fetchPlaceData()
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
            <td align='center'>
              {(newPhoto || photo) && <img src={newPhoto ? URL.createObjectURL(newPhoto) : photo || null} alt="Profile" width={150} height={150} />}
            </td>
            <td><input type="file" onChange={(e) => setNewPhoto(e.target.files[0])} /></td>
          </tr>
          <tr>
            <td>Name</td>
            <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
          </tr>
          <tr>
            <td>Email</td>
            <td><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
          </tr>
          <tr>
            <td>Contact</td>
            <td><input type="text" value={contact} onChange={(e) => setContact(e.target.value)} /></td>
          </tr>
          <tr>
            <td>Address</td>
            <td><textarea name="" id="" value={address} onChange={(e) => setAddress(e.target.value)}></textarea></td>
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
                <option value="" >--Select Place--</option>
                {placeData.filter((place) => place.districtId._id === districtId).map((data) => (
                  <option key={data._id} value={data._id}>{data.place}</option>
                ))}
              </select>
            </td>
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