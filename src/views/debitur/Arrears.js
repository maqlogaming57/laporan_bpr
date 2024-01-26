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
  CFormSelect,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import axios from 'axios'

const Arrears = () => {
  const [dataSekolah, setData] = useState([])
  const [selectedKabKota, setSelectedKabKota] = useState('')
  const [selectedJenjang, setSelectedJenjang] = useState('')
  const [selectedPage, setSelectedPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [perPage] = useState(20)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-sekolah-indonesia.vercel.app/sekolah/${selectedJenjang}?kab_kota=${selectedKabKota}&page=${selectedPage}&perPage=15`,
        )
        const responData = response.data
        setData(responData.dataSekolah)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error fetching data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedKabKota, selectedPage, perPage, selectedJenjang])

  const handleSelectChange = (event) => {
    setSelectedKabKota(event.target.value)
  }
  const handleSelectjenjang = (event) => {
    setSelectedJenjang(event.target.value)
  }
  const handlenextpage = () => {
    setSelectedPage((nextPage) => nextPage + 1)
  }
  const handleprevtpage = () => {
    setSelectedPage((nextPage) => nextPage - 1)
  }

  let i = (selectedPage - 1) * perPage

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
                <CFormSelect
                  aria-label="Default select example"
                  value={selectedKabKota}
                  onChange={handleSelectChange}
                >
                  <option>Wilayah</option>
                  <option value="036500">Kota Tegal</option>
                  <option value="032800">Kab. Tegal</option>
                  <option value="032900">Kab. Brebes</option>
                  <option value="032700">Kab. Pemalang</option>
                  <option value="030200">Kab. Banyumas</option>
                  <option value="030700">Kab. Wonosobo</option>
                  <option value="036400">Kota Pekalongan</option>
                  <option value="032511">Kab. Batang</option>
                  <option value="030500">Kab. Kebumen</option>
                </CFormSelect>
              </CCol>
              <CCol xs="auto">
                <CFormSelect
                  aria-label="Default select example"
                  value={selectedJenjang}
                  onChange={handleSelectjenjang}
                >
                  <option>Jenjang</option>
                  <option value="sd">SD</option>
                  <option value="smp">SMP</option>
                  <option value="sma">SMK</option>
                  <option value="smk">SMA</option>
                </CFormSelect>
              </CCol>
            </CForm>
            <CPagination align="end" aria-label="Page navigation example" mg>
              <CPaginationItem onClick={handleprevtpage} disabled={selectedPage === 1}>
                Previous
              </CPaginationItem>
              <CPaginationItem onClick={handlenextpage}>Next</CPaginationItem>
            </CPagination>
          </CCardBody>

          <CTable>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama Sekolah</CTableHeaderCell>
                <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                <CTableHeaderCell scope="col">NPSN</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataSekolah.map((user, index) => (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableHeaderCell scope="row">{++i}</CTableHeaderCell>
                    <CTableDataCell>{user.sekolah}</CTableDataCell>
                    <CTableDataCell>
                      {user.alamat_jalan} {user.kecamatan} {user.kabupaten_kota}
                    </CTableDataCell>
                    <CTableDataCell>{user.npsn}</CTableDataCell>
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
