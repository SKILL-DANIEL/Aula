import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2';

const sendData = async (id) => {
    try {
        if (id === '') {
            Swal.fire({
                icon: 'info',
                title: 'Campo Incompleto',
                text:'Llenar los campos correspondientes',
            });
            return false;
        }
        const { data } = await axios.post('http://localhost/proyecto-final/controller/login.php', {action: "loginUser", id}, {headers: {'Content-Type': 'multipart/form-data'}})
        if (!data.isLogin) {
            const {type, title, text} = data.alert;
            Swal.fire({ 
                icon: type, 
                title: title, 
                text: text
            });
            return false;
        }
        return data;
    } catch (error) {
        console.log('Error: ', error);
        Swal.fire({
            icon: 'error',
            title: error.message
        });
    }
}

const getData = async (state) => {
    try {
        const { data } = await axios.post('http://localhost/proyecto-final/controller/controller.php', {id: 1}, {headers: {'Content-Type': 'multipart/form-data'}})
        const horario = {};
        data.forEach(carga => {
            const { subject, day, hour } = carga;
            if (!horario[day]) horario[day] = {};
            horario[day][hour] = { subject };
        });
        state(horario);
    } catch (error) {
        console.log('Error: ', error);
        Swal.fire({
            icon: 'error',
            title: error.message
        });
    }
}

export {
    sendData,
    getData
}