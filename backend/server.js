const express = require('express')
const cors = require('cors') //connect both back and front
const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
    res.json({message: 'Backend is live!'})
})

app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`)
})