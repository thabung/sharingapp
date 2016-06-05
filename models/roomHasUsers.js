/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    var roomHasUsers = sequelize.define('roomHasUsers', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        room_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        },
        created_by: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        updated_by: {
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        classMethods: {
            associate: function (models) {
                roomHasUsers.belongsTo(models.user, {foreignKey: 'user_id'});
            }
        }
    }, {
        tableName: 'roomHasUsers'
    });
    return roomHasUsers;
};
