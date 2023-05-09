import React from 'react';
import { Outlet, useLocation } from 'react-router';


export const NavBar = () => {
    const { state } = useLocation();
    return (
        <>
            {
                state?.logged ? (
                    <header id="main-header">
                        <a id="logo-header" href="/inicio">
                            <span className="site-name">{state?.name}</span>
                            <span className="site-desc">{state?.profileDescription}</span>
                        </a>
                        <nav>
                            <ul>
                                <li><a href="/inicio">Inicio</a></li>
                                <li><a href="/aula">Aula</a></li>
                                <li><a href="/horario">Horario</a></li>
                                <li><a href="/login">Cerrar Sesión</a></li>
                            </ul>
                        </nav>
                    </header>
                ) : (
                    <></>
                )
            }
            <Outlet />
        </>
    )
}
