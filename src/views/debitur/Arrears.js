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
  CSpinner,
  CButton,
} from '@coreui/react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import * as icon from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Arrears = () => {
  const [dataSekolah, setData] = useState([])
  const [selectedPage, setSelectedPage] = useState(1)
  const [perPage] = useState(20)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDate, setSeletedDate] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(
            `${process.env.REACT_APP_URL_API}/customers/arrears?tanggal=${selectedDate}`,
            {
              headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
              },
            },
          )
          console.log('API Response:', selectedDate)
          const responData = response.data.data
          setData(responData)
        }
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

  const handleExportExcel = () => {
    const header = [
      { Nama: 'Nama', HP: 'HP', Angsuran: 'Angsuran', tgltagih: 'tgltagih', Norek: 'Norek' },
    ]

    const dataHeader = dataSekolah.map((user) => ({
      Nama: user.nm,
      HP: user.hp,
      Angsuran: user.angsuran,
      tgltagih: formatDate(user.tgltagih),
      Norek: user.acdrop,
    }))

    const finalData = [...header, ...dataHeader]

    const worksheet = XLSX.utils.json_to_sheet(finalData, { skipHeader: true })

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Arrears')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(data, `Data_Arrears_${selectedDate}.xlsx`)
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
  const formatDate = (dateString) => {
    // Pastikan dateString memiliki format yang dapat dikenali oleh JavaScript Date
    if (!dateString || dateString.length !== 8) {
      return 'Tanggal tidak valid'
    }

    // Misalnya dateString dalam format YYYYMMDD (contoh: 20240813)
    const year = dateString.slice(0, 4)
    const month = dateString.slice(4, 6)
    const day = dateString.slice(6, 8)

    const date = new Date(`${year}-${month}-${day}`)
    const options = { day: 'numeric', month: 'long', year: 'numeric' }

    // Cek apakah date valid
    if (isNaN(date.getTime())) {
      return 'Tanggal tidak valid'
    }

    return date.toLocaleDateString('id-ID', options)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tunggakan Harian</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol xs="auto">
                <CFormInput type="date" onChange={handleDateChange} />
              </CCol>
              <CCol xs="auto">
                <CButton color="success" onClick={handleExportExcel}>
                  <CIcon icon={icon.cilDescription} title="Export to Excel" />
                </CButton>
              </CCol>
            </CForm>
            {/* <CPagination align="end" aria-label="Page navigation example" mg={true}>
              <CPaginationItem onClick={handleprevtpage} disabled={selectedPage === 1}>
                Previous
              </CPaginationItem>
              <CPaginationItem onClick={handlenextpage}>Next</CPaginationItem>
            </CPagination> */}
          </CCardBody>
          {loading ? (
            <div className="text-center mt-3">
              <CSpinner color="primary" />
              <div>Loading...</div>
            </div>
          ) : (
            <div>
              <CTable responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nokontrak</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Norek</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">HP</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Angsuran</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Jatuh Tempo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                    <CTableHeaderCell scope="col">AO</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Kdprd</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Hari</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataSekolah.map((user, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <CTableRow>
                      <CTableHeaderCell scope="row">{++i}</CTableHeaderCell>
                      <CTableDataCell>{user.nokontrak}</CTableDataCell>
                      <CTableDataCell>{user.acdrop}</CTableDataCell>
                      <CTableDataCell>{user.nm}</CTableDataCell>
                      <CTableDataCell>{user.hp}</CTableDataCell>
                      <CTableDataCell>{formatToRupiah(user.angsuran)}</CTableDataCell>
                      <CTableDataCell>{formatDate(user.tgltagih)}</CTableDataCell>
                      <CTableDataCell>{user.alamat}</CTableDataCell>
                      <CTableDataCell>{user.kdaoh}</CTableDataCell>
                      <CTableDataCell>{user.kdprd}</CTableDataCell>
                      <CTableDataCell>{user.haritgk}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          )}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Arrears
