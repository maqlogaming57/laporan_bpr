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
} from '@coreui/react'
import axios from 'axios'

const Kolekbilitas = () => {
  const [data, setData] = useState([])
  const [totalNominal, setTotalNomial] = useState(0)
  const [loading, setLoading] = useState(true)
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
          setTotalNomial(calculatedTotal)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedColl])

  const handleSelectChange = (event) => {
    setSeletedColl(event.target.value)
    setLoading(true)
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
