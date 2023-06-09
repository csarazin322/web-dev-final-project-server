import * as recipeDao from './recipe-dao.js'
import mongoose from 'mongoose';

const createRecipe = async (req, res) => {
    const newRecipe = req.body;
    newRecipe._id = new mongoose.Types.ObjectId();
    const insertedRecipe = await recipeDao.createRecipe(newRecipe);
    return (insertedRecipe == 409) ? res.sendStatus(409) : res.json(insertedRecipe);
}

const findRecipes = async (_, res) => {
    const recipes = await recipeDao.findRecipes()
    res.json(recipes)
}

const findRecipeById = async (req, res) => {
    const idToFind = req.params._id;
    const recipe = await recipeDao.findRecipeById(idToFind);
    return (recipe === null) ? res.status(404) : res.json(recipe)
}

const updateRecipe = async (req, res) => {
    const idToUpdate = req.params._id
    const updates = req.body
    const status = await recipeDao.updateRecipe(idToUpdate, updates)
    res.json(status)
}

const deleteRecipe = async (req, res) => {
    const idToDelete = req.params._id
    const status = await recipeDao.deleteRecipe(idToDelete)
    res.json(status);
}


export default (app) => {
    app.post('/api/recipes', createRecipe)
    app.get('/api/recipes', findRecipes)
    app.get('/api/recipes/:_id', findRecipeById)
    app.put('/api/recipes/:_id', updateRecipe)
    app.delete('/api/recipes/:_id', deleteRecipe)
}


