export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", 
      {
        username: DataTypes.STRING,
      },
  );

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
