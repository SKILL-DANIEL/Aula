import { Link } from "react-router-dom";
import { logOut } from "../hook/main";

export const NavBar = () => {
    const isLoggedIn = localStorage.getItem('isLogin');
    const infoUser = JSON.parse(localStorage.getItem('infoUser'));
    return (
        <>
            {
                isLoggedIn ? (
                    <nav className="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
                        <div className="container-fluid">
                            <div>
                                <Link className="navbar-brand" to="/dashboard">{infoUser?.name}</Link>
                                <h7 className="offcanvas">{infoUser?.profileDescription}</h7>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Mi Aula</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/dashboard">Inicio</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/dashboard/aula">Aula</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/dashboard/horario">Horario</Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" to="/dashboard/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Opciones
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li><Link className="dropdown-item" to="/dashboard/perfil">Perfil</Link></li>
                                                <li><Link className="dropdown-item" to="/dashboard/configuracion">Configuración</Link></li>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>
                                                <li><Link className="dropdown-item" to="/" onClick={logOut}>Cerrar Sesión</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                ) : (
                    <></>
                )
            }
        </>
    )
}
