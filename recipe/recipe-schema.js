import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: String,
    image: String,
    ownerId: String,
    description: String,
    ingredients: [{
        ingredient: String,
        amount: Number,
        measurement: String
    }],
    steps: [{ step: String }]
}, { collection: 'recipe' })

export default schema;