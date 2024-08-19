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
  CSpinner,
  CFormSelect,
  CButton,
} from '@coreui/react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import * as icon from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Kolekbilitas = () => {
  const [data, setData] = useState([])
  const [totalNominal, setTotalNominal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedColl, setSeletedColl] = useState('')

  useEffect(() => {
    if (!selectedColl || selectedColl === '') {
      return
    }
    const token = localStorage.getItem('token')
    const fetchData = async () => {
      try {
        if (token) {
          console.log('Selected Coll:', selectedColl)
          const response = await axios.get(
            `${process.env.REACT_APP_URL_API}/colls?kdcoll=${selectedColl}`,
            {
              headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
              },
            },
          )
          const responData = response.data.data
          setData(responData)
          const calculatedTotal = responData.reduce((acc, user) => acc + user.osmdlc, 0)
          setTotalNominal(calculatedTotal)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedColl])

  const handleSelectChange = (event) => {
    setSeletedColl(event.target.value)
    setLoading(true)
  }
  const handleExportExcel = () => {
    const header = [
      {
        A: 'No',
        B: 'Nama',
        C: 'Nokontrak',
        D: 'kdaoh',
        E: 'kdprd',
        F: 'Hari',
        G: 'Osmdlc',
        H: 'Col',
      },
    ]
    const datawithHeader = data.map((user, index) => ({
      A: index + 1,
      B: user.nama,
      C: user.nokontrak,
      D: user.kdaoh,
      E: user.kdprd,
      F: user.haritgkmdl,
      G: formatToRupiah(user.osmdlc),
      H: user.colbaru,
    }))

    const finalData = [...header, ...datawithHeader]
    const worksheet = XLSX.utils.json_to_sheet(finalData, {
      header: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      skipHeader: true,
    })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Kolekbilitas')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const BlobData = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(BlobData, `Kolekbilitas_${selectedColl}.xlsx`)
  }
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
  let i = 0
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Nasabah</strong> <small>COLL 2</small>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol xs="auto">
                  <CFormSelect
                    aria-label="Default select example"
                    value={selectedColl}
                    onChange={handleSelectChange}
                  >
                    <option value="">Pilih coll</option>
                    {/* <option value="1">1</option> */}
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </CFormSelect>
                </CCol>
                <CCol>
                  <CButton color="success" onClick={handleExportExcel}>
                    <CIcon icon={icon.cilDescription} title="Export to Excel" />
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
            {loading ? (
              <div className="text-center mt-3">
                <CSpinner color="primary" />
                <div>Loading...</div>
              </div>
            ) : (
              <div>
                <CTable small striped hover responsive>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nokontrak</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Kdaoh</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Kdprd</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Hari</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Osmdlc</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Col</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.map((user, index) => {
                      return (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{++i}</CTableHeaderCell>
                          <CTableDataCell>{user.nama}</CTableDataCell>
                          <CTableDataCell>{user.nokontrak}</CTableDataCell>
                          <CTableDataCell>{user.kdaoh}</CTableDataCell>
                          <CTableDataCell>{user.kdprd}</CTableDataCell>
                          <CTableDataCell>{user.haritgkmdl}</CTableDataCell>
                          <CTableDataCell>{formatToRupiah(user.osmdlc)}</CTableDataCell>
                          <CTableDataCell>{user.colbaru}</CTableDataCell>
                        </CTableRow>
                      )
                    })}
                    <CTableRow>
                      <CTableHeaderCell colSpan="6" className="text-end">
                        Total
                      </CTableHeaderCell>
                      <CTableDataCell>{formatToRupiah(totalNominal)}</CTableDataCell>
                      <CTableDataCell></CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </div>
            )}
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Kolekbilitas
