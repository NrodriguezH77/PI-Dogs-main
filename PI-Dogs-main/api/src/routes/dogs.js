const { Router } = require("express");
const axios = require("axios");
const { Op, Raza, Temperamento} = require('../db.js');
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

    dog = dog.data?.map((d) => {
      if(d.weight.metric === 'NaN' || d.weight.metric.slice(0, 3) === 'NaN'  || d.weight.metric.length < 4){
        return false;
       }else{
        return {
          id: d.id,
          name: d.name,
          weight: d.weight.metric,
          height: d.height.metric,
          life_span: d.life_span,
          temperament: d.temperament,
          img: d.reference_image_id
        };
      }
    });

    dog = dog.filter((ele) => ele !== false)

    let dogBd = await Raza.findAll({
        where: {
            name:{ [Op.substring]: name}
        },
        include:[{
            model: Temperamento,
            attributes: ['name']
          }]
    })

    dogBd = dogBd?.map(d => {
        return {
            id: d.id,
            name: d.name,
            weight: d.weight,
            height: d.height,
            life_span: d.life_span,
            temperament: d.Temperamentos.map(t => t.name).join(', ')
        }
    })

    return dog.concat(dogBd);

  } else {
    let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);

    dogs = dogs.data?.map((d) => {
      if(d.weight.metric === 'NaN' || d.weight.metric.slice(0, 3) === 'NaN'  || d.weight.metric.length < 4){
       return false;
      }else{
        return {
          id: d.id,
          name: d.name,
          weight: d.weight.metric,
          height: d.height.metric,
          life_span: d.life_span,
          temperament: d.temperament,
          img: d.reference_image_id,
        };
      }
    });


    dogs = dogs.filter((ele) => ele !== false)
    let dogsBd = await Raza.findAll({
       include:[{
        model: Temperamento,
        attributes: ['name']
      }]
    })
    
    dogsBd = dogsBd?.map(d => {
        return {
            id: d.id,
            name: d.name,
            weight: d.weight,
            height: d.height,
            life_span: d.life_span,
            temperament: d.Temperamentos.map(t => t.name).join(', ')
        }
    })
   // console.log(dogsBd)
    return dogs.concat(dogsBd);
  }
}

async function getDog(idRaza) {
  let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  dogs = dogs.data.filter((d) => d.id == Number(idRaza)).map((d) => {
      return {
        id: d.id,
        name: d.name,
        weight: d.weight.metric,
        height: d.height.metric,
        life_span: d.life_span,
        temperament: d.temperament,
        img: d.image.id,
      };
    });

  if(dogs.length < 1){
    
    const dogbd = await Raza.findByPk(idRaza, {
      include:[{
       model: Temperamento,
       attributes: ['name']
     }]
   })
   console.log(dogbd.Temperamentos)

    return [{
      id: dogbd.id,
      name: dogbd.name,
      weight: dogbd.weight,
      height: dogbd.height,
      life_span: dogbd.life_span,
      temperament: dogbd.Temperamentos.map(t => t.name).join(', ')
      
    }]
  }
  //console.log(dogs);
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
    console.log(error)
    res.status(404).send("ERROR!");
  }
});

router.post('/', async (req, res) => {
    const {name, weight, height, life_span, temperament} = req.body;
    if(!name || !weight || !height || !life_span || !temperament) return res.status(404).send("Falta enviar datos obligatorios")

    try {
        const raza = await Raza.create({  //req.body
          name,
          weight,
          height,
          life_span,
        });

        if(temperament.length > 1){
            const promises = temperament.map(a => raza.setTemperamentos(a))
            await Promise.all(promises)
            
        }else if(temperament.length === 1){
            await raza.setTemperamentos(temperament[0])
        }

        res.status(201).send('Raza creada y vinculada')
      } catch (error) {
        res.status(404).send("Error en alguno de los datos provistos");
      }
})

module.exports = router;
