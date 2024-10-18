import { Routes, Route } from 'react-router-dom'

import './assets/base.css'
import CircleLayout from './layouts/CircleLayout'
import HomePage from './pages/Home-Page'
import VibeDetailPage from './pages/Detail-Page'
import MePage from './pages/MePage'
import SearchPage from './pages/Search-Page'
import LoginPage from './pages/Login-Page'
import RegisterPage from './pages/Register-Page'
import ResetPasswordPage from './pages/Reset-Password-Page'
import ForgotPasswordPage from './pages/ForgotPassword=Page'
import FollowsPage from './pages/Follows-Page'
import ProfilePage from './pages/Profile-Page'

function App() {
    // const isPreloaded = useSelector((states: RootState) => states.isPreloaded.value)
    // const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    // const { pathname } = useLocation()
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         left: 0,
    //         behavior: 'smooth',
    //     })
    // }, [pathname])

    // useEffect(() => {
    //     async function isUserLogged() {
    //         try {
    //             const loggedUser: UserType = await API.GET_LOGGED_USER()

    //             dispatch(setLoggedUser(loggedUser))
    //         } catch (error) {
    //             dispatch(unsetLoggedUser())
    //         } finally {
    //             // might be deleted later XD
    //             setTimeout(() => {
    //                 dispatch(setPreloaded(false))
    //             }, 2000)
    //         }
    //     }

    //     isUserLogged()
    // }, [dispatch])

    // if (window.innerWidth < 1280) {
    //     return (
    //         <div className="app">
    //             <CircleAlert />
    //         </div>
    //     )
    // }

    // if (isPreloaded) {
    //     return (
    //         <div className="app">
    //             <SplashScreen />
    //         </div>
    //     )
    // }

    // if (!loggedUser) {
    //     return (
    //         <div className="app">
    //             <Routes>
    //                 <Route path="/*" element={<LoginPage />} />
    //                 <Route path="/register" element={<RegisterPage />} />
    //                 <Route path="/help/forgot" element={<ForgotPasswordPage />} />
    //                 <Route path="/help/reset/:token" element={<ResetPasswordPage />} />
    //             </Routes>
    //         </div>
    //     )
    // }

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<CircleLayout />}>
                <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/help/forgot" element={<ForgotPasswordPage />} />
                    <Route path="/help/reset/:token" element={<ResetPasswordPage />} />
                    <Route index element={<HomePage />} />
                    <Route path="/vibe/:id" element={<VibeDetailPage />} />
                    <Route path="/user/:id" element={<ProfilePage />} />
                    <Route path="/me" element={<MePage />} />
                    <Route path="/follows" element={<FollowsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
