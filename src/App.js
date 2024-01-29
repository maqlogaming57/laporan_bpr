import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  isTokenExpired = () => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        // Check if the token has an expiration time and if it's in the past
        return decodedToken.exp && decodedToken.exp * 1000 < Date.now()
      } catch (error) {
        // Token decoding failed
        return true
      }
    }
    // Token not present
    return true
  }
  logout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token')

    // Arahkan pengguna ke halaman login
    window.location.href = '/login'
  }
  render() {
    const isLoggedIn = localStorage.getItem('token') !== null
    const isTokenExpired = this.isTokenExpired()

    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              exact
              path="/login"
              name="Login Page"
              element={isLoggedIn && !isTokenExpired ? <Navigate to="/" /> : <Login />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              element={isLoggedIn && !isTokenExpired ? <Navigate to="/" /> : <Register />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              path="*"
              name="Home"
              element={isLoggedIn && !isTokenExpired ? <DefaultLayout /> : <Navigate to="/login" />}
            />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
