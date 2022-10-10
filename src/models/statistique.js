module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "statistique",
    {
      id_statistique: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_quizz: {
        type: DataTypes.INTEGER,
      },
      total_player: {
        type: DataTypes.INTEGER,
      },
      total_reach_1: {
        type: DataTypes.INTEGER,
      },
      total_reach_2: {
        type: DataTypes.INTEGER,
      },
      total_reach_3: {
        type: DataTypes.INTEGER,
      },
      total_reach_4: {
        type: DataTypes.INTEGER,
      },
      total_reach_5: {
        type: DataTypes.INTEGER,
      },
      total_reach_6: {
        type: DataTypes.INTEGER,
      },
      total_reach_7: {
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
