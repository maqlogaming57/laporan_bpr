import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'

const ViewDebiturs = () => {
  const location = useLocation()
  const { state } = location

  useEffect(() => {
    // Lakukan sesuatu dengan data pengguna yang dikirimkan dari halaman sebelumnya
    if (state && state.selectedUserData) {
      const { nama, nokontrak } = state.selectedUserData
      console.log('Nama:', nama)
      console.log('Nokontrak:', nokontrak)

      // Lakukan operasi atau ambil data berdasarkan data pengguna
    }
  }, [state])
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
            <strong>Detail</strong> <small>Data Nasabah</small>
          </CCardHeader>
          <CTable color="success" striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nokontrak</CTableHeaderCell>
                <CTableDataCell>{state.selectedUserData.nokontrak}</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableDataCell>{state.selectedUserData.nama}</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                <CTableDataCell>
                  {state.selectedUserData.alamat} KEL. {state.selectedUserData.kelurahan} KEC.
                  {state.selectedUserData.kecamatan} KAB./KOTA. {state.selectedUserData.kota}
                </CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No HP</CTableHeaderCell>
                <CTableDataCell>{state.selectedUserData.hp}</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Tempat Bekerja</CTableHeaderCell>
                <CTableDataCell>
                  {state.selectedUserData.namapt} {state.selectedUserData.kotapt}
                </CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Alamat PT</CTableHeaderCell>
                <CTableDataCell>{state.selectedUserData.alamatpt}</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No Rekening</CTableHeaderCell>
                <CTableDataCell>{state.selectedUserData.acdrop}</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Plafon</CTableHeaderCell>
                <CTableDataCell>{formatToRupiah(state.selectedUserData.tghttl)}</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Angsuran</CTableHeaderCell>
                <CTableDataCell>{formatToRupiah(state.selectedUserData.angsttl)}</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Sisa Angsuran</CTableHeaderCell>
                <CTableDataCell>
                  {formatToRupiah(state.selectedUserData.sisa_angsuran)}
                </CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Tgl Akad / Jangka waktu </CTableHeaderCell>
                <CTableDataCell>
                  {state.selectedUserData.tglakad}/{state.selectedUserData.frekmdl}
                </CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Saldo Tabungan</CTableHeaderCell>
                <CTableDataCell>{formatToRupiah(state.selectedUserData.sahirrp)}</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Kolekbilitas</CTableHeaderCell>
                <CTableDataCell>{state.selectedUserData.colbaru}</CTableDataCell>
              </CTableRow>
            </CTableHead>
          </CTable>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ViewDebiturs
