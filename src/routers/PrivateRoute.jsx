import { Navigate, Outlet } from "react-router"

export const PrivateRoute = ({ redirectTo = '/' }) => {
    const isLoggedIn = localStorage.getItem('isLogin');
    return isLoggedIn ? <Outlet/> : <Navigate to={redirectTo} />
}
