import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import dotenv from "dotenv/config"
import cors from "cors"
// import session from 'express-session'  // skj 8-24-2023
// import MongoStore from 'connect-mongo'  // skj 8-24-2023

import TakGame from './models/takGame.js'

const app = express()

mongoose.set('strictQuery', true) //globally suppress depreciation warning

// const dbUrl = "mongodb+srv://shawnjararita:ararita%232222@cluster0-skj.4omec.mongodb.net/tak?retryWrites=true&w=majority"
const dbUrl = process.env.MONGO_URI
const secret = process.env.SECRET || 'thisShouldBeASecret'  // skj 8-24-2023

app.use(express.urlencoded({ extended: true })) //parse form-encoded information to access info coming from forms using: req.body 
app.use(express.json())  // parse incoming JSON requests and puts the parsed data in req.body
const __dirname = path.dirname('./tak_back')

const corsOptions = {
    origin: ["http://localhost:5173", "https://tak-game-mern-frontend.onrender.com"]
    // origin: ["http://localhost:3000", "https://tak-game-mern-frontend.onrender.com"]
}
app.use(cors(corsOptions))


// const store = MongoStore.create({  // skj 8-24-2023
//     mongoUrl: dbUrl,
//     touchAfter: 24 * 3600,// "lazy update” session...stops unnecessary resaves/updates (in seconds, not milliseconds)
//     crypto: {
//         secret: secret,
//     }
// })

// const sessionConfig = {  // skj 8-24-2023
//     store: store,
//     name: 'session',
//     secret: secret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,  // true = session cookies ONLY accessiblee over HTTP (not JS)
//         // secure: true, // true = this cookie only works over HTTPS...set to false while working with localhost3000
//         // expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         // maxAge: 1000 * 60 * 60 * 24 * 7
//         expires: Date.now() + 1000 * 60 * 60,
//         maxAge: 1000 * 60 * 60
//     }
// }
// app.use(session(sessionConfig))  // skj 8-24-2023

// store.on("error", function (e) {  // skj 8-24-2023
//     console.log('SESSION STORE ERROR', e)
// })

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        // listen for request
        const PORT = process.env.PORT || 4000
        const server = app.listen(PORT, () => {
            console.log(`Conected to Tak DB and the app started on port ${server.address().port}`)
        })
    })
    .catch(err => {
        console.log('Mongoose failed to connect to Tak DB:', err)
    })

// ----------------------------------------------------------------------------------

const takDefaultSpaces = [
    { space: 'A5', x: 1, y: 5, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'A4', x: 1, y: 4, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'A3', x: 1, y: 3, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'A2', x: 1, y: 2, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'A1', x: 1, y: 1, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'B5', x: 2, y: 5, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'B4', x: 2, y: 4, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'B3', x: 2, y: 3, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'B2', x: 2, y: 2, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'B1', x: 2, y: 1, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'C5', x: 3, y: 5, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'C4', x: 3, y: 4, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'C3', x: 3, y: 3, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'C2', x: 3, y: 2, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'C1', x: 3, y: 1, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'D5', x: 4, y: 5, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'D4', x: 4, y: 4, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'D3', x: 4, y: 3, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'D2', x: 4, y: 2, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'D1', x: 4, y: 1, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'E5', x: 5, y: 5, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'E4', x: 5, y: 4, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'E3', x: 5, y: 3, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'E2', x: 5, y: 2, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'E1', x: 5, y: 1, pieces: [], activeSpace: false, moveSquare: false }
]

const takSpacesTest = [
    { space: 'X5', x: 1, y: 5, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'A4', x: 1, y: 4, pieces: ['BF1', 'BF2'], activeSpace: false, moveSquare: false },
    { space: 'A3', x: 1, y: 3, pieces: ['WF1', 'WF2', 'WF8', 'BF8'], activeSpace: false, moveSquare: false },
    { space: 'A2', x: 1, y: 2, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'A1', x: 1, y: 1, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'B5', x: 2, y: 5, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'B4', x: 2, y: 4, pieces: ['BF3'], activeSpace: false, moveSquare: false },
    { space: 'B3', x: 2, y: 3, pieces: ['WF3'], activeSpace: false, moveSquare: false },
    { space: 'B2', x: 2, y: 2, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'B1', x: 2, y: 1, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'C5', x: 3, y: 5, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'C4', x: 3, y: 4, pieces: ['BF4'], activeSpace: false, moveSquare: false },
    { space: 'C3', x: 3, y: 3, pieces: ['WF4'], activeSpace: false, moveSquare: false },
    { space: 'C2', x: 3, y: 2, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'C1', x: 3, y: 1, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'D5', x: 4, y: 5, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'D4', x: 4, y: 4, pieces: ['BF5', 'WF7'], activeSpace: false, moveSquare: false },
    { space: 'D3', x: 4, y: 3, pieces: ['WF5', 'BF7'], activeSpace: false, moveSquare: false },
    { space: 'D2', x: 4, y: 2, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'D1', x: 4, y: 1, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'E5', x: 5, y: 5, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'E4', x: 5, y: 4, pieces: ['BF6'], activeSpace: false, moveSquare: false },
    { space: 'E3', x: 5, y: 3, pieces: ['WF6'], activeSpace: false, moveSquare: false },
    { space: 'E2', x: 5, y: 2, pieces: [], activeSpace: false, moveSquare: false },
    { space: 'E1', x: 5, y: 1, pieces: [], activeSpace: false, moveSquare: false }
]

// const A3 = { space: 'A3', x: 1, y: 3, pieces: ['WF1', 'WF2', 'WF8', 'BF8', 'WF9'], activeSpace: false, moveSquare: false }

// ----------------------------------------------------------------------------------

// new takGame
app.post('/takGame', async (req, res) => {
    // req.session.spaces = "skj"    // skj 8-24-2023
    // console.log("skj", req.session._id, req.session.spaces)    // skj 8-24-2023

    try {
        const newTakGame = await TakGame.create({ takSpaces: takDefaultSpaces })
        console.log(`backend: new Tak game initiated. Have fun!`)
        res.status(200).setHeader("Access-Control-Allow-Credentials", "true").json(newTakGame)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
})

// join takGame
app.get('/takGame/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const foundTakGame = await TakGame.findOne({ _id: id })
        if (foundTakGame) {
            res.status(200).json(foundTakGame)
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
})

// edit takGame
app.put('/takGame/:id', async (req, res) => {
    const { id } = req.params
    let takSpaces = [...req.body]

    try {
        const foundTakGame = await TakGame.findOne({ _id: id })
        foundTakGame.takSpaces = takSpaces
        await foundTakGame.save()

        const foundUpdatedTakGame = await TakGame.findOne({ _id: id })
        res.status(200).json(foundUpdatedTakGame)
        // console.log('takSpaces updated!')
    }
    catch (err) {
        res.status(400).json({ error: err.message })
        console.log(err)
    }
})

// delete takGame; NOTE the formatting where I have to create a POST request with an async function inside to delete
app.post('/takGame/delete', (req, res) => {
    const { id } = req.body
    // const id = '64e1441730e725ddce002848'

    async function deleteTakGame() {
        try {
            const deletedTakGame = await TakGame.findOneAndRemove({ _id: id })
            console.log(`backend: previous tak game deleted: ${deletedTakGame._id}`)
            res.status(200).json(deletedTakGame._id)
        }
        catch (err) { console.log(err) }
    }
    deleteTakGame()
})

app.post('/takGame/deleteOnExit', (req, res) => {
    const { id } = req.body
    // const id = '64e1441730e725ddce002848'

    async function deleteTakGame() {
        try {
            const deletedTakGame = await TakGame.findOneAndRemove({ _id: id })
            console.log(`backend: previous tak game deleted on exit`)
            res.status(200)
        }
        catch (err) { console.log(err) }
    }
    deleteTakGame()
})

// ----------------------------------------------------------------------------------
// ----- functions() for testing ----------------------------------------------------

const importTakGame = async () => {
    try {
        const newTakGame = await TakGame.create({ takSpaces: takDefaultSpaces })
        console.log(newTakGame)
    }
    catch (err) {
        console.log(err.message)
    }
}
// importTakGame()


const findTakGame = async (id) => {
    try {
        const foundTakGame = await TakGame.findOne({ _id: id })

        if (foundTakGame) {
            console.log(foundTakGame)
        }
    }
    catch (err) {
        console.log(err.message)
    }
}
// findTakGame('64d8e871dc1cec30d061ce91')


const updateTakSpace = async (id, space) => {
    try {
        const foundTakGame = await TakGame.findOne({ _id: id })
        // ...find one space and index
        const foundGameSpace = foundTakGame.takSpaces.find((sp) => sp.space === space)
        const foundGameIndex = foundTakGame.takSpaces.findIndex((sp) => sp.space === space)

        // ...update full takSpaces array
        // foundTakGame.takSpaces = takSpacesTest
        // ...update one space
        foundTakGame.takSpaces.splice(foundGameIndex, 1, A3)
        await foundTakGame.save()

        const foundUpdatedTakGame = await TakGame.findOne({ _id: id })
        const foundUpdatedGameSpace = foundUpdatedTakGame.takSpaces.find((sp) => sp.space === space)
        console.log('index :', foundGameIndex, 'space: ', foundUpdatedGameSpace.pieces)
    }
    catch (err) { console.log(err) }
}
// updateTakSpace('64d8e871dc1cec30d061ce91', 'A3')


// NOTE: the express version of this required different formatting, see note above code
const deleteTakGame = async (id) => {
    try {
        // const deletedTakGame = await TakGame.findByIdAndRemove(id)  // this works too
        const deletedTakGame = await TakGame.findOneAndRemove({ _id: id })
        console.log(deletedTakGame._id)
    }
    catch (err) { console.log(err) }
}
// deleteTakGame('64e14187b479a787c7b95e5e')