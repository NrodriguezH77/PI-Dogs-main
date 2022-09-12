import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import style from  './Home.module.css'
import { Link } from 'react-router-dom';
import Cards from '../Cards/Cards';
import { getAllDogs, getDogsName, orderBy} from '../../actions';




function Home() {
  
  const [name, setName] = useState('');
  const [dog, setDog] = useState([]);
  let Dogs =  useSelector(state => state.dogsLoaded)
  const dispatch = useDispatch();
 
  
console.log(Dogs, 'c1')
//console.log(dog, 'c2')
  useEffect(() => {
    dispatch(getAllDogs())
   console.log('uss')
  }, [])

  

  function handleChange(e) {
    setName(e.target.value)
    //handleSubmit(e)
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsName(name))
  }

  function orderBy_(e){
    //console.log(e.target.name)
    let dogg;
    switch(e.target.value){
      case 'descendente':
        dogg = Dogs?.sort((a, b) => {
          
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        } )
        
        dispatch(orderBy(dogg))
        setDog('actuliza1')
      break;

      case 'ascendente':
        dogg = Dogs?.sort((a, b) => {
          
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        } )
       
        dispatch(orderBy(dogg))
        setDog('actuliza2')
        break;
      case 'max':
        dogg = Dogs?.sort((a, b) => {
          if (Number(a.weight.slice(-2))< Number(b.weight.slice(-2))) {
            return 1;
          }
          if (Number(a.weight.slice(-2)) > Number(b.weight.slice(-2))) {
            return -1;
          }
          // a must be equal to b
          return 0;
        } )
        
        dispatch(orderBy(dogg))
        setDog('actuliza3')
        break;

        case 'min':
          dogg = Dogs?.sort((a, b) => {
            if (Number(a.weight.slice(0,2))> Number(b.weight.slice(0,2))) {
              return 1;
            }
            if (Number(a.weight.slice(0,2)) < Number(b.weight.slice(0,2))) {
              return -1;
            }
            // a must be equal to b
            return 0;
          } )
          
          dispatch(orderBy(dogg))
          setDog('actuliza4')
          break;

      default:
        break;
    }

  }

    return ( 
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name='name' value={name}  onChange={handleChange}/>
            <input type="submit" value='Buscar'/>
          </form>
          
        <select  name="orderby" onChange={orderBy_}>
          <option value="">Orden alfabetico</option>
          <option value="ascendente">Ascendente</option> {/* key */}
          <option value="descendente">Descendente</option>
        </select>

        <select  name="orderby" onChange={orderBy_}>
          <option value="">Orden por peso</option>
          <option value="max">Max</option> {/* key */}
          <option value="min">Min</option>
        </select>

          <Link to={'/'}>INICIO</Link>

          <Cards 
          
            allDogs = {Dogs}

          />



        </div>
     );
}

export default Home;

