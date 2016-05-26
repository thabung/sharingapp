/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('expense', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    room_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'room',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expense: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    created_by: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'expense'
  });
};
