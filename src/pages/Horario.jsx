import React, { useEffect, useState } from 'react'
import { getData } from '../hook/main';

export const Horario = () => {
    const [cargas, setCarga] = useState(null);
    useEffect(() =>{
		getData(setCarga)
	},[]);

    const hours = Array.from({ length: 4 }, (_, i) => i + 6);
  return (
    <>
        {cargas != null ? (
                <>
                    <div className='content-body'>
                        <div className='content-table'>
                            <table className='table' border={1} cellPadding={50} cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <td className='title' colSpan={20}>Horas</td>
                                        <td className='title' colSpan={50}>Lunes</td>
                                        <td className='title' colSpan={50}>Martes</td>
                                        <td className='title' colSpan={50}>Miercoles</td>
                                        <td className='title' colSpan={50}>Jueves</td>
                                        <td className='title' colSpan={50}>Viernes</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hours.map((hour) => (
                                        <tr key={hour}>
                                            <td colSpan={20}>{hour}:00 - {hour + 1}:00</td>
                                            <td colSpan={50}>{cargas[1]?.[hour]?.subject}</td>
                                            <td colSpan={50}>{cargas[2]?.[hour]?.subject}</td>
                                            <td colSpan={50}>{cargas[3]?.[hour]?.subject}</td>
                                            <td colSpan={50}>{cargas[4]?.[hour]?.subject}</td>
                                            <td colSpan={50}>{cargas[5]?.[hour]?.subject}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : ('No hay datos')}
    </>
  )
}
