import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CFormInput,
  CForm,
  CButton,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Debiturs = () => {
  const [selectedUserData, setSelectedUserData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL_API}/customers/`, {
          nama: searchTerm,
        })
        const data = response.data.data

        if (data && data.length > 0) {
          console.log('Fetched users successfully:', data)
          setSelectedUserData(data) // Perbarui selectedUserData dengan data yang diambil dari API
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchData()
  }, [searchTerm])

  const handleSearch = (e) => {
    e.preventDefault()
    // Panggil fungsi fetch data di sini untuk memperbarui data dengan pencarian
  }
  const handleButtonClick = (user) => {
    // Simpan data pengguna dalam state lokal
    setSelectedUserData(user)

    // Navigasi ke halaman ViewDebiturs
    navigate('../theme/debitur/ViewDebiturs', { state: { selectedUserData: user } })
  }
  let i = 0

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Using the most basic table CoreUIs how <code>&lt;CTable&gt;</code>-based tables look
              in CoreUI.
            </p>
            <CForm className="row g-3" onSubmit={handleSearch}>
              <CCol xs="auto">
                <CFormInput
                  type="text"
                  placeholder="Nama / Nokontrak"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CCol>
            </CForm>
          </CCardBody>
          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nokontrak</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {selectedUserData.map((user, index) => (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableHeaderCell scope="row">{++i}</CTableHeaderCell>
                    <CTableDataCell>{user.nama}</CTableDataCell>
                    <CTableDataCell>{user.nokontrak}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="dark" onClick={() => handleButtonClick(user)}>
                        <CIcon icon={icon.cilFolder} size="s" />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                </React.Fragment>
              ))}
            </CTableBody>
          </CTable>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Debiturs
