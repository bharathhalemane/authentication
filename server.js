const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()

connectDB()

const app = express() 

app.use(express.json())

app.use("/api/auth", require("./routes/authRoutes"))

const PORT = process.env.PORT || 5000 

app.listen(PORT, () => console.log(`server running on port ${PORT}`))

app.get('/force', async (req, res) => {
  const User = require('./models/User')

  const user = await User.create({
    name: 'FORCE USER',
    email: `force${Date.now()}@gmail.com`,
    password: 'forcepass'
  })

  res.json(user)
})
