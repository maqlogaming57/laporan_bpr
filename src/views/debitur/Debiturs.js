import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CFormSelect } from '@coreui/react'
import axios from 'axios'

const Debiturs = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')

  useEffect(() => {
    const API_URL = 'http://localhost:4000/users'

    axios
      .get(API_URL)
      .then((response) => {
        const data = response.data.data // Ubah ini sesuai dengan struktur respons API Anda

        if (data && data.length > 0) {
          console.log('Fetched users successfully:', data)
          setUsers(data)
          setSelectedUser(data[0].nocif) // Opsional: Set nilai default berdasarkan properti yang sesuai
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>-based
              tables look in CoreUI.
            </p>
            <CFormSelect
              aria-label="Default select example"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option>Select a user</option>
              {users.map((user, index) => (
                <option key={index} value={user.nocif}>
                  {user.nama}_{user.nokontrak}
                </option>
              ))}
            </CFormSelect>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Debiturs
