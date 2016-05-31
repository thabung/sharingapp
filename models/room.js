/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    updated_by: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'room'
  });
};
