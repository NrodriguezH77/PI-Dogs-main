import React from 'react';
import style from  './LandingPage.module.css'
import { Link } from 'react-router-dom';
function LandingPage() {
    return ( 
        <div /* className={`${style.main}`} */>
           <Link to={'/api/home'}> <button className={`${style.btn}`} type=""> INGRESAR </button>  </Link>  
           
        </div>
     );
}

export default LandingPage;