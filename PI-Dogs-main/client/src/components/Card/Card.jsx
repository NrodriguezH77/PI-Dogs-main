import React from 'react';
import { Link } from 'react-router-dom';
import style from  './Card.module.css'

function Card({id, name, temperament, weight, img}) {

    return ( 
        <div className={`${style.padre}`}>
            <img src={ img ?  `https://cdn2.thedogapi.com/images/${img}.jpg`: 'https://img.freepik.com/foto-gratis/lindo-perro-pastor-posando-aislado-sobre-fondo-blanco_155003-46179.jpg?t=st=1663000294~exp=1663000894~hmac=bc083f0d1d74fb3a30c3a2bc20dcb0e40dcbe959e787a26422ef0369be0ea957'} alt='Img not found'/>
            <p>Raza: <Link to={`/api/dogDetail/${id}`}>{name}</Link></p>
            <p>Temperamentos: {temperament}</p>
            <p>Peso: {weight} Kgs</p>
        </div>
     );
}
/* weight === 'NaN' || weight.length < 3 || weight.slice(0,3) === 'NaN'? '5 - 6':  */
export default Card;