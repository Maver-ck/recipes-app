const Recipe = require("../models/recipe-model");

createRecipe = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a recipe",
    });
  }

  const recipe = new Recipe(body);

  if (!recipe) {
    return res.status(400).json({ success: false, error: err });
  }

  recipe
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: recipe._id,
        message: "Recipe created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Recipe not created!",
      });
    });
};

updateRecipe = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Recipe not found!",
      });
    }
    recipe.name = body.name;
    recipe.type = body.type;
    recipe
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: recipe._id,
          message: "Recipe updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Recipe not updated!",
        });
      });
  });
};

deleteRecipe = async (req, res) => {
  await Recipe.findOneAndDelete({ _id: req.params.id }, (err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: `Recipe not found` });
    }

    return res.status(200).json({ success: true, data: recipe });
  }).catch((err) => console.log(err));
};

getRecipeById = async (req, res) => {
  await Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: `Recipe not found` });
    }
    return res.status(200).json({ success: true, data: recipe });
  }).catch((err) => console.log(err));
};

getRecipes = async (req, res) => {
  await Recipe.find({}, (err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!recipe.length) {
      return res
        .status(404)
        .json({ success: false, error: `Recipe not found` });
    }
    return res.status(200).json({ success: true, data: recipe });
  }).catch((err) => console.log(err));
};

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  getRecipeById,
};
