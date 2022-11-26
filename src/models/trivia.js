const validThemes = [
  "entertainment",
  "science",
  "sport",
  "history",
  "geography",
  "art",
  "other",
];

const validDifficulty = [1, 2, 3];
const validAnswer = [1, 2, 3, 4];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Trivia",
    {
      id_trivia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La difficulté ne peut pas être vide." },
          notNull: { msg: "La difficulté est une propriété requise." },
          isBetweenNumber(value) {
            if (!validDifficulty.includes(value)) {
              throw new Error(
                `Le niveau de difficulté doit appartenir à la liste suivante : ${validDifficulty}`
              );
            }
          },
        },
      },
      language: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      used_in_quizz: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Cette question éxiste déjà.",
        },
        validate: {
          len: {
            args: [5, 255],
            msg: "Le nom doit contenir entre 5 et 255 caractères.",
          },
          notEmpty: { msg: "La question ne peut pas être vide." },
          notNull: { msg: "La question une propriété requise." },
        },
      },
      reponse1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: "La réponse doit contenir entre 5 et 255 caractères.",
          },
          notEmpty: { msg: "La réponse ne peut pas être vide." },
          notNull: { msg: "La réponse une propriété requise." },
        },
      },
      reponse2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: "La réponse doit contenir entre 5 et 255 caractères.",
          },
          notEmpty: { msg: "La réponse ne peut pas être vide." },
          notNull: { msg: "La réponse une propriété requise." },
        },
      },
      reponse3: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: "La réponse doit contenir entre 5 et 255 caractères.",
          },
          notEmpty: { msg: "La réponse ne peut pas être vide." },
          notNull: { msg: "La réponse une propriété requise." },
        },
      },
      reponse4: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: "La réponse doit contenir entre 5 et 255 caractères.",
          },
          notEmpty: { msg: "La réponse ne peut pas être vide." },
          notNull: { msg: "La réponse une propriété requise." },
        },
      },
      good_answer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La bonne réponse ne peut pas être vide." },
          notNull: { msg: "La bonne réponse est une propriété requise." },
          isBetweenNumber(value) {
            if (!validAnswer.includes(value)) {
              throw new Error(
                `La bonne réponse doit appartenir à la liste suivante : ${validAnswer}`
              );
            }
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: { msg: "Utilisez uniquement une URL valide pour l'image." },
        },
      },
      themes: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("themes").split(",");
        },
        set(themes) {
          if (!Array.isArray(themes)) {
            themes = [themes];
          }
          this.setDataValue("themes", themes.join());
        },
        validate: {
          isThemesValid(value) {
            if (!value) {
              throw new Error("Une question doit avoir au moins un thème.");
            }
            if (value.split(",").length > 3) {
              throw new Error(
                "Une question ne peut pas avoir plus de 3 thèmes."
              );
            }
            value.split(",").forEach((theme) => {
              if (!validThemes.includes(theme)) {
                throw new Error(
                  `Le theme de la question doit appartenir à la liste siuvante : ${validThemes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );
};
