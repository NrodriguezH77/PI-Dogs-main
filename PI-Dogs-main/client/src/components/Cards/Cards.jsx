import React from 'react';
import style from  './Cards.module.css'
import Card from '../Card/Card';

export default function Cards({allDogs}) {
    return ( 
        <div className={`${style.padre}`}>
           {
            allDogs?.map(dog => 
                    <Card
                    key = {dog.id}
                    id = {dog.id}
                    name = {dog.name}
                    temperament = {dog.temperament}
                    weight = {dog.weight}
                    img = {dog.img}
                    />
                
            )
           }
        </div>
     );
}

