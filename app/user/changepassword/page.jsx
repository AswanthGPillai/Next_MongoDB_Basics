'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [uid, setUid] = useState("")


  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      if (newPassword == confirmPassword) {
        const formData = new FormData();
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
        const res = await axios.patch(`http://localhost:3000/api/user/${uid}`, formData)
        console.log(res.data);
        if (res.status == 200) {
          alert(res.data.msg)
          router.push('/user/myprofile')
        } 
      } else {
        alert("New Password and Confirm Password Mismatch...")
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);

    }
  }

  useEffect(() => {
    const id = sessionStorage.getItem('uid')
    if (id) {
      setUid(id)
    }
  }, [])

  return (
    <div>
      <table border={1} align='center' cellPadding={10}>
        <tbody>
          <tr>
            <td>Old Password</td>
            <td><input type="password" onChange={(e) => setOldPassword(e.target.value)} /></td>
          </tr>
          <tr>
            <td>New Password</td>
            <td><input type="password" onChange={(e) => setNewPassword(e.target.value)} /></td>
          </tr>
          <tr>
            <td>Confirm Password</td>
            <td><input type="password" onChange={(e) => setConfirmPassword(e.target.value)} /></td>
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