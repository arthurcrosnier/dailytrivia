module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "quizz",
    {
      id_quizz: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date_affichage: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      id_statistique: {
        type: DataTypes.INTEGER,
      },
      id_trivia_1: {
        type: DataTypes.INTEGER,
      },
      id_trivia_2: {
        type: DataTypes.INTEGER,
      },
      id_trivia_3: {
        type: DataTypes.INTEGER,
      },
      id_trivia_4: {
        type: DataTypes.INTEGER,
      },
      id_trivia_5: {
        type: DataTypes.INTEGER,
      },
      id_trivia_6: {
        type: DataTypes.INTEGER,
      },
      id_trivia_7: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );
};
