/* eslint-disable no-unused-expressions */
import { React } from 'react';
import { NavBar } from '../components/NavBar';
import { Outlet } from 'react-router';

export const Dashboard = () => {
    return (
        <>
            <NavBar/>
            <main className='container'>
                <Outlet/>
            </main>
            <footer>
            </footer>
        </>
    );
};
