import React from 'react'
import { Route, Routes } from 'react-router'
import { Login, Dashboard } from "../pages";
import { PrivateRoute } from './PrivateRoute';
import { Horario } from '../pages/Horario';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='login' element={<Login />} />
                <Route path='dashboard' element={
                    <PrivateRoute>
                        <Dashboard><Route path='horario' element={<Horario/>}></Route></Dashboard>
                    </PrivateRoute>
                } />
            </Routes>
        </>
    )
}
