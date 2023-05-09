import { Navigate, useLocation } from "react-router"

export const PrivateRoute = ({ children }) => {

    const { state } = useLocation();

    return state?.logged ? children : <Navigate to='/login' />
}
