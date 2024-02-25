import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDatabase from "./src/config/database.js"
import routes from "./src/routes/index.js"

const connection = await connectDatabase();

connection.on("error", (erro) => {
    console.error(`Falha ao conectar com o banco de dados: ${erro}`)
});

connection.once("open", () => {
    console.log("A conexão foi feita com sucesso!")
});

const app = express();

routes(app);

app.use(cors())

const port = 3000;

app.listen(port, () => console.log("Servidor online em http://localhost:3000/"))