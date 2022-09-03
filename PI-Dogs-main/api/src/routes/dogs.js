const { Router } = require("express");
const axios = require("axios");
const { Op, Raza} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function getDogs(name) {
  if (name) {
    let dog = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}`
    );

    dog = {
      id: dog.data[0].id,
      name: dog.data[0].name,
      weight: dog.data[0].weight.metric,
      height: dog.data[0].height.metric,
      life_span: dog.data[0].life_span,
      temperament: dog.data[0].temperament,
    };
    console.log(dog);
    return dog;
  } else {
    let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);

    dogs = dogs.data.map((d) => {
      return {
        id: d.id,
        name: d.name,
        weight: d.weight.metric,
        height: d.height.metric,
        life_span: d.life_span,
        temperament: d.temperament,
      };
    });
    return dogs;
  }
}

async function getDog(idRaza) {
  let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  dogs = dogs.data.filter((d) => d.id == idRaza).map((d) => {
      return {
        id: d.id,
        name: d.name,
        weight: d.weight.metric,
        height: d.height.metric,
        life_span: d.life_span,
        temperament: d.temperament,
      };
    });
  console.log(dogs);
  return dogs;
}

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    try {
      const dogs = await getDogs();
      res.status(201).json(dogs);
    } catch (error) {
      res.status(404).send("ERROR!");
    }
  } else {
    try {
      const dog = await getDogs(name);
      //console.log(dog)
      res.status(201).json(dog);
    } catch (error) {
      res.status(404).send("Raza no encontrada");
    }
  }
});

router.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  try {
    const dog = await getDog(idRaza);
    res.status(201).json(dog);
  } catch (error) {
    res.status(404).send("ERROR!");
  }
});

router.post('/', async (req, res) => {
    const {name, weight, height, life_span, temperaments} = req.body;
    if(!name || !weight || !height || !life_span || !temperaments) return res.status(404).send("Falta enviar datos obligatorios")

    try {
        const raza = await Raza.create({  //req.body
          name,
          weight,
          height,
          life_span,
        });

        if(temperaments.length > 1){
            const promises = temperaments.map(a => raza.setTemperamentos(a))
            await Promise.all(promises)
            
        }else if(temperaments.length === 1){
            await raza.setTemperamentos(temperaments[0])
        }

        res.status(201).send('Raza creada y vinculada')
      } catch (error) {
        res.status(404).send("Error en alguno de los datos provistos");
      }
})

module.exports = router;
