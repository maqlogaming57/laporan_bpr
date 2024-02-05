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

const Realisasi = () => {
  const [dataSekolah, setData] = useState([])
  //   const [selectedPage, setSelectedPage] = useState(1)
  //   const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDateStart, setSeletedDateStart] = useState('')
  const [selectedDateEnd, setSeletedDateEnd] = useState('')
  const [totalNoa, setTotalNoa] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')

        if (token) {
          const response = await axios.get(
            `${process.env.REACT_APP_URL_API}/customers/realisasi?datestart=${selectedDateStart}&dateend=${selectedDateEnd}`,
            {
              headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
              },
            },
          )
          const responData = response.data.data
          setData(responData)
          const calculatedNoa = responData.reduce((acc, user) => acc + user.nominalrp, 0)
          setTotalNoa(calculatedNoa)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error fetching data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedDateStart, selectedDateEnd, loading])

  const handleDateChange = (event) => {
    const selectedDateStart = event.target.value

    const formattedDate = new Date(selectedDateStart).toISOString().slice(0, 10).replace(/-/g, '')
    setSeletedDateStart(formattedDate)
  }
  const handleDateChangeEnd = (event) => {
    const selectedDateEnd = event.target.value

    const formattedDate = new Date(selectedDateEnd).toISOString().slice(0, 10).replace(/-/g, '')
    setSeletedDateEnd(formattedDate)
  }

  let i = 0
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
            <strong className="text-medium-emphasis small">Periode</strong>
            <CForm className="row g-3">
              <CCol xs="auto">
                <CFormInput type="date" onChange={handleDateChange} />
              </CCol>
              <CCol xs="auto">
                <CFormInput type="date" onChange={handleDateChangeEnd} />
              </CCol>
              {/* <CCol xs="auto">
                <CFormSelect
                  aria-label="Default select example"
                  value={selectedKdprd}
                  onChange={(e) => setSelectedKdprd(e.target.value)}
                >
                  <option>Kdprd</option>
                  <option value="43">43</option>
                  <option value="28">28</option>
                  <option value="27">27</option>
                  <option value="12">12</option>
                  <option value="50">50</option>
                  <option value="21">21</option>
                  <option value="29">29</option>
                  <option value="53">53</option>
                  <option value="22">22</option>
                  <option value="60">60</option>
                  <option value="16">16</option>
                  <option value="41">41</option>
                  <option value="11">11</option>
                  <option value="23">23</option>
                  <option value="13">13</option>
                  <option value="42">42</option>
                  <option value="44">44</option>
                  <option value="55">55</option>
                  <option value="24">24</option>
                  <option value="26">26</option>
                  <option value="54">54</option>
                  <option value="25">25</option>
                  <option value="40">40</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </CFormSelect>
              </CCol> */}
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
                <CTableHeaderCell scope="col">Kdaoh</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">Realisasi</CTableHeaderCell>
                <CTableHeaderCell scope="col">Kdprd</CTableHeaderCell>
                <CTableHeaderCell scope="col">Kdloc</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataSekolah.map((user, index) => (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableHeaderCell scope="row">{++i}</CTableHeaderCell>
                    <CTableDataCell>{user.kdaoh}</CTableDataCell>
                    <CTableDataCell>{user.nama}</CTableDataCell>
                    <CTableDataCell>{formatToRupiah(user.nominalrp)}</CTableDataCell>
                    <CTableDataCell>{user.noa}</CTableDataCell>
                    <CTableDataCell>{user.kdloc}</CTableDataCell>
                  </CTableRow>
                </React.Fragment>
              ))}
              <CTableRow>
                <CTableHeaderCell colSpan="3" className="text-end">
                  Total
                </CTableHeaderCell>
                <CTableDataCell>{formatToRupiah(totalNoa)}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Realisasi
