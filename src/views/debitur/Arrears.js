import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CForm,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import axios from 'axios'

const Arrears = () => {
  const [dataSekolah, setData] = useState([])
  const [selectedPage, setSelectedPage] = useState(1)
  const [perPage] = useState(20)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDate, setSeletedDate] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/customers/arrears?tanggal=${selectedDate}`,
        )
        console.log('API Response:', selectedDate)
        const responData = response.data.data
        setData(responData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error fetching data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedDate, selectedPage, perPage])

  const handleDateChange = (event) => {
    const selectedDate = event.target.value

    const formattedDate = new Date(selectedDate).toISOString().slice(0, 10).replace(/-/g, '')
    setSeletedDate(formattedDate)
  }

  let i = (selectedPage - 1) * perPage
  const formatToRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace('Rp', '')
      .trim()
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
            <CForm className="row g-3">
              <CCol xs="auto">
                <CFormInput type="date" onChange={handleDateChange} />
              </CCol>
            </CForm>
            {/* <CPagination align="end" aria-label="Page navigation example" mg={true}>
              <CPaginationItem onClick={handleprevtpage} disabled={selectedPage === 1}>
                Previous
              </CPaginationItem>
              <CPaginationItem onClick={handlenextpage}>Next</CPaginationItem>
            </CPagination> */}
          </CCardBody>

          <CTable responsive>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nokontrak</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">Angsuran</CTableHeaderCell>
                <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                <CTableHeaderCell scope="col">Kdprd</CTableHeaderCell>
                <CTableHeaderCell scope="col">Hari</CTableHeaderCell>
                <CTableHeaderCell scope="col">HP</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataSekolah.map((user, index) => (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableHeaderCell scope="row">{++i}</CTableHeaderCell>
                    <CTableDataCell>{user.nokontrak}</CTableDataCell>
                    <CTableDataCell>{user.nm}</CTableDataCell>
                    <CTableDataCell>{formatToRupiah(user.angsuran)}</CTableDataCell>
                    <CTableDataCell>{user.alamat}</CTableDataCell>
                    <CTableDataCell>{user.kdprd}</CTableDataCell>
                    <CTableDataCell>{user.hari}</CTableDataCell>
                    <CTableDataCell>{user.hp}</CTableDataCell>
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

export default Arrears
