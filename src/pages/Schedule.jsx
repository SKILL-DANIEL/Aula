import React, { useEffect, useState } from 'react'
import { getData } from '../hook/main';

export const Schedule = () => {

    const [cargas, setCarga] = useState(null);
    useEffect(() =>{
		getData(setCarga)
	},[]);

    const hours = Array.from({ length: 5 }, (_, i) => i + 6);
  return (
    <>
        {cargas != null ? (
                <>
                    <div className='table-responsive-md'>
                        <table className='table table-primary table-striped-columns'>
                            <thead className="table-primary">
                                <tr>
                                    <th>Horas</th>
                                    <th>Lunes</th>
                                    <th>Martes</th>
                                    <th>Miercoles</th>
                                    <th>Jueves</th>
                                    <th>Viernes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map((hour) => (
                                    <tr key={hour}>
                                        <td>{hour}:00 - {hour + 1}:00</td>
                                        <td>{cargas[1]?.[hour]?.subject}</td>
                                        <td>{cargas[2]?.[hour]?.subject}</td>
                                        <td>{cargas[3]?.[hour]?.subject}</td>
                                        <td>{cargas[4]?.[hour]?.subject}</td>
                                        <td>{cargas[5]?.[hour]?.subject}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : ('No hay datos')}
    </>
  )
}
