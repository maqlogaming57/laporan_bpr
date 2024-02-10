import React, { useState, useEffect } from 'react'
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
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Change Password</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Old password
              </CFormLabel>
              <CCol xs="auto">
                <CFormInput type="password" id="oldpassword" />
              </CCol>
            </CForm>
            <CForm className="row mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                New password
              </CFormLabel>
              <CCol xs="auto">
                <CFormInput type="password" id="newpassword" />
              </CCol>
            </CForm>
            <CForm className="row mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Confirm password
              </CFormLabel>
              <CCol xs="auto">
                <CFormInput type="password" id="konfirmasipwd" />
              </CCol>
            </CForm>
            <div className="row justify-content-md-center">
              <CCol xs lg={8}>
                <CButton type="submit" color="success" style={{ color: 'white' }}>
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
