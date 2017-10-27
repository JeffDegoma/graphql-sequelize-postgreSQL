export default (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING

    });

  User.associate = (models) => {
    User.hasMany(models.Board, {
        foreignKey: "owner",
    })

    User.hasMany(models.Suggestion, {
        foreignKey: "creatorId" 
    })
  }

  return User;
};
