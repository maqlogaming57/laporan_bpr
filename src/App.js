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
        return decodedToken.exp && decodedToken.exp * 1000 < Date.now()
      } catch (error) {
        return true
      }
    }

    return true
  }

  logout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token')
    // Arahkan pengguna ke halaman login
    return <Navigate to={Login} />
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
              element={isLoggedIn && !isTokenExpired ? <Navigate to="/" /> : <Login />}
            />
            {/* Sisipkan Route lain sesuai kebutuhan Anda */}
            <Route
              path="*"
              element={isLoggedIn && !isTokenExpired ? <DefaultLayout /> : <Navigate to="/login" />}
            />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App

// import React, { Component, Suspense } from 'react'
// import { HashRouter, Route, Routes } from 'react-router-dom'
// import './scss/style.scss'

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// )

// // Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// // Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// class App extends Component {
//   render() {
//     return (
//       <HashRouter>
//         <Suspense fallback={loading}>
//           <Routes>
//             <Route exact path="/login" name="Login Page" element={<Login />} />
//             <Route exact path="/register" name="Register Page" element={<Register />} />
//             <Route exact path="/404" name="Page 404" element={<Page404 />} />
//             <Route exact path="/500" name="Page 500" element={<Page500 />} />
//             <Route path="*" name="Home" element={<DefaultLayout />} />
//           </Routes>
//         </Suspense>
//       </HashRouter>
//     )
//   }
// }

// export default App
