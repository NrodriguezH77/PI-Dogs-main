const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Temperamento', {
    name: {
      type: DataTypes.STRING,
    },
  },{
    timestamps: false,
});
};
