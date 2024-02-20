import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'

const Changepwd = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewpassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alertMessage, setalertMessage] = useState('')

  const handleChangePwd = async () => {
    const token = localStorage.getItem('token')
    try {
      if (newPassword !== confirmPassword) {
        setalertMessage('New password & confirm password do not  match')
        return
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_URL_API}/users/changepwd`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      console.log(response.data)
      setalertMessage(response.data.message)

      setOldPassword('')
      setNewpassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error('Error changing password:', error)
      setalertMessage('Failed to change password. Please try again.')
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Change Password</strong>
          </CCardHeader>
          <CCardBody>
            {alertMessage && (
              <div
                className={`alert ${
                  alertMessage.includes('success') ? 'alert-success' : 'alert-danger'
                }`}
                role="alert"
              >
                {alertMessage}
              </div>
            )}
            <CForm className="row mb-3">
              <CFormLabel htmlFor="oldPassword" className="col-sm-2 col-form-label">
                Old password
              </CFormLabel>
              <CCol xs="auto">
                <CFormInput
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </CCol>
            </CForm>
            <CForm className="row mb-3">
              <CFormLabel htmlFor="newPassword" className="col-sm-2 col-form-label">
                New password
              </CFormLabel>
              <CCol xs="auto">
                <CFormInput
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                />
              </CCol>
            </CForm>
            <CForm className="row mb-3">
              <CFormLabel htmlFor="confirmPassword" className="col-sm-2 col-form-label">
                Confirm password
              </CFormLabel>
              <CCol xs="auto">
                <CFormInput
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </CCol>
            </CForm>
            <div className="row justify-content-md-center">
              <CCol xs lg={8}>
                <CButton
                  type="submit"
                  color="success"
                  style={{ color: 'white' }}
                  onClick={handleChangePwd}
                >
                  Change password
                </CButton>
              </CCol>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Changepwd
