module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  return Provider;
};
