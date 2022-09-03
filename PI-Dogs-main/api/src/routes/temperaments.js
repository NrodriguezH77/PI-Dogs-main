const { Router } = require('express');
const axios = require("axios");
const { Op, Raza, Temperamento } = require('../db.js');
const { get } = require('./dogs');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function getTemperaments(){
    let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);

    let arrTemperaments = []
     dogs.data.forEach(dog => {
        dog.temperament?.split(',').forEach(element => {
            arrTemperaments.push(element)
        });
     });
    
    let arrTempswd = [... new Set(arrTemperaments)] //163 temperamentos
    
    arrTempswd.forEach(t => {
        Temperamento.findOrCreate({
            where: {name: t}
        })
    });

    const temperamentsBD = await Temperamento.findAll();
    return temperamentsBD
   
}

router.get('/', async(req, res) => {
    const temperaments = await getTemperaments()
    res.json(temperaments)
})

module.exports = router;
