import mongoose from 'mongoose'
const Schema = mongoose.Schema


// { space: 'A5', x: 1, y: 5, pieces: [], activeSpace: false, moveSquare: false },
const takSpacesSchema = new Schema({
    space: String,
    x: Number,
    y: Number,
    pieces: [String],
    activeSpace: Boolean,
    moveSquare: Boolean
})

const takGameSchema = new Schema({
    takSpaces: [takSpacesSchema]
},
    { timestamps: true }
)
const TakGame = mongoose.model('TakGame', takGameSchema)
export default TakGame