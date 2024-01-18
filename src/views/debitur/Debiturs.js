import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormSelect,
  CTable,
  CFormInput,
  CForm,
  CFormLabel,
  CButton,
} from '@coreui/react'
import axios from 'axios'

const Debiturs = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedUserData, setSelectedUserData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/customers')
        const data = response.data.data

        if (data && data.length > 0) {
          console.log('Fetched users successfully:', data)
          setUsers(data)

          // Perbarui selectedUserData jika selectedUser ada di dalam data
          const selectedData = data.filter((user) => user.nocif === selectedUser)
          setSelectedUserData(selectedData)

          // Jika selectedUser tidak ada di dalam data, pilih data pertama
          if (!selectedData.length) {
            setSelectedUser(data[0].nocif)
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchData()
  }, [selectedUser])

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
            <CForm className="row g-3">
              <CCol xs="auto">
                <CFormLabel htmlFor="staticEmail2" className="visually-hidden">
                  Email
                </CFormLabel>
              </CCol>
              <CCol xs="auto">
                <CFormInput type="text" id="inputPassword2" placeholder="Nama " />
              </CCol>
              <CCol xs="auto">
                <CButton type="submit" className="mb-3">
                  <CIcon icon={icon.cilZoom} size="l" />
                </CButton>
              </CCol>
            </CForm>
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
          <CTable
            columns={[
              { key: 'id', label: 'ID', _props: { scope: 'col' } },
              { key: 'class', _props: { scope: 'col' } },
              { key: 'heading_1', label: 'Heading', _props: { scope: 'col' } },
              // ... tambahkan kolom lain sesuai kebutuhan
            ]}
            items={selectedUserData.map((user, index) => ({
              id: index + 1,
              class: user.nama,
              heading_1: user.mdlawal,
              // ... tambahkan properti lain sesuai kebutuhan
            }))}
          />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Debiturs
