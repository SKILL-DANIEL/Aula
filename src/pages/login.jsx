/* eslint-disable no-unused-expressions */
import { React } from 'react';
import { sendData } from '../hook/main';
import "../css/styleLogin.css";
import { useForm } from '../hook/useForm';
import { useNavigate } from 'react-router';
export const Login = () =>  {

    const navigate = useNavigate()

    const { id, onInputChange, onResetForm } = useForm({
        id: ''
    })

    const onLogin = async(e)  => {
        e.preventDefault();
        let response = await sendData(id);
        if (response) {
            const {isLogin, infoUser, location} = response;
            navigate(location,{
                replace: true,
                state: {
                    logged: isLogin,
                    id: infoUser.identification,
                    name: infoUser.name,
                    profile: infoUser.profile,
                    profileDescription: infoUser.profileDescription
                }
            });
            onResetForm();
        }
    }

    return (
        <div className='content-form'>
            <form id="login-form" className="form" onSubmit={onLogin}>
                <h2 className="form-title">Inicia Sesión</h2>
                <div className="form-container">
                    <div className="form-group">
                        <input type="text" className="form-input" id="id" name='id' value={id} placeholder=" " onChange={onInputChange}/>
                        <label className="form-label">Identificación</label>
                        <span className="form-line"></span>
                    </div>
                    <input type="submit" className="form-submit" value="Enviar"/>
                </div>
            </form>
        </div>
    )
}
