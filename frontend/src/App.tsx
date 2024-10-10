import { Routes, Route } from 'react-router-dom'

import './assets/base.css'
import HomePage from './pages/Home-Page'
import MePage from './pages/MePage'
import ProfilePage from './pages/Profile-Page'
import FollowsPage from './pages/Follows-Page'
import SearchPage from './pages/Search-Page'
import LoginPage from './pages/Login-Page'
import RegisterPage from './pages/Register-Page'
import ForgotPasswordPage from './pages/ForgotPassword=Page'
import ResetPasswordPage from './pages/Reset-Password-Page'
import DetailPage from './pages/Detail-Page'
import './css.css'
function App() {

    return (
        <div className="app">
            <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="/detail" element={<DetailPage />} />
                    <Route path="/user" element={<ProfilePage />} />
                    <Route path="/me" element={<MePage />} />
                    <Route path="/follows" element={<FollowsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot" element={<ForgotPasswordPage />} />
                    <Route path="/reset" element={<ResetPasswordPage />} />
            </Routes>
        </div>
    )
  }

export default App
