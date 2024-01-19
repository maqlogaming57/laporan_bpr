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
  CCollapse,
} from '@coreui/react'
import axios from 'axios'

const Debiturs = () => {
  const [selectedUserData, setSelectedUserData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/customers/', {
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
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nokontrak</CTableHeaderCell>
                <CTableHeaderCell scope="col">Class</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {selectedUserData.map((user, index) => (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableHeaderCell scope="row">
                      <CButton
                        className="mb-3"
                        onClick={() => setVisible(!visible)}
                        aria-expanded={visible}
                        aria-controls="collapseWidthExample"
                      >
                        !
                      </CButton>
                      <div>
                        <CCol xs={12}>
                          <CCollapse visible={visible}>
                            <CTable small borderless>
                              <CTableHead>
                                <CTableRow>
                                  <CTableHeaderCell scope="col">Angsuran</CTableHeaderCell>
                                  <CTableHeaderCell scope="col">{user.angsttl}</CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                            </CTable>
                          </CCollapse>
                        </CCol>
                      </div>
                    </CTableHeaderCell>
                    <CTableDataCell>{user.nokontrak}</CTableDataCell>
                    <CTableDataCell>{user.nama}</CTableDataCell>
                    <CTableDataCell>{user.mdlawal}</CTableDataCell>
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
