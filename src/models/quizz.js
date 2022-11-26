module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "quizz",
    {
      id_quizz: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      language: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
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
