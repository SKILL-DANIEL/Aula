/* eslint-disable no-unused-expressions */
import { React } from 'react';
import { sendDataLogin } from '../hook/main';
import "../css/styleLogin.css";
import { useForm } from '../hook/useForm';
import { useNavigate } from 'react-router';
export const Login = () =>  {

    const navigate = useNavigate();

    const { id, onInputChange, onResetForm } = useForm({ id: '' });

    const onLogin = async(e)  => {
        e.preventDefault();
        let response = await sendDataLogin(id);
        if (response) {
            const {isLogin, infoUser, location} = response;
            localStorage.setItem('isLogin', isLogin); 
            localStorage.setItem('infoUser', JSON.stringify(infoUser)); 
            navigate(location);
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
