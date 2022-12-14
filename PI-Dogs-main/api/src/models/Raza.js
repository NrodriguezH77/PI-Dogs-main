const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Raza', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {//weight.metric
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {//height.metric
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {//life_span
      type: DataTypes.STRING,
    }
  },{
    timestamps: false,
});
};
