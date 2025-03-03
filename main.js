import express from "express"
import { config } from "dotenv"
import mainRouter from "./routes/index.js"
import { specs } from "./config/swagger.js"
import swaggerUi from "swagger-ui-express";
import cors from "cors"
config()
const app = express()
app.use(
    cors({
       origin: "*",
       methods: "GET,POST,PATCH,DELETE",
       allowedHeaders: "Content-Type,Authorization",
    })
 );

app.use(express.json())
app.use("/",mainRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.listen(process.env.PORT,()=>console.log("serveris run on port",process.env.PORT)
)