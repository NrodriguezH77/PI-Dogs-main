import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogId } from '../../actions';

function DogDetail(props) {
    const dispatch = useDispatch()
    let dog = useSelector(state => state.dogDetail)
    let id = props.match.params.id
    useEffect(() => {
        dispatch(getDogId(id))
    }, [])

    return (  
        <div>
            <img src={dog.img ? `https://cdn2.thedogapi.com/images/${dog.img}.jpg` : 'https://img.freepik.com/foto-gratis/lindo-perro-pastor-posando-aislado-sobre-fondo-blanco_155003-46179.jpg?t=st=1663000294~exp=1663000894~hmac=bc083f0d1d74fb3a30c3a2bc20dcb0e40dcbe959e787a26422ef0369be0ea957'} alt='Img not found'/>
            <p>Raza: {dog.name}</p>
            <p>Temperamentos: {dog.temperament}</p>
            <p>Peso: Entre {dog.weight} Kgs</p>
            <p>Altura: Entre {dog.height} Cm</p>
            <p>Años de vida: {dog.life_span}</p>
            <Link to={'/api/home'}>Atrás</Link>
        </div>
    );
}

export default DogDetail;