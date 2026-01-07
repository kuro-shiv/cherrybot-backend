import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.Routes.js"

dotenv.config()

const app =express()
const PORT =process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Cherrybot Backend is running!")
})


app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})