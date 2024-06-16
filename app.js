import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDatabase from "./src/config/database.js"
import routes from "./src/routes/index.js"
import manipulaErros from "./src/middleware/middlewareErros.js";
import manipula404 from "./src/middleware/middleware404.js";

const connection = await connectDatabase();

connection.on("error", (erro) => {
    console.error(`Falha ao conectar com o banco de dados: ${erro}`)
});

connection.once("open", () => {
    console.log("A conexão foi feita com sucesso!")
});

const app = express();

app.use(cors({credentials: true, origin: ['http://localhost:5173', 'https://qgelado.netlify.app/']}));

routes(app);

const port = 3000;

// Caso tenha um erro nos controllers, execute essas funções
app.use(manipula404);
app.use(manipulaErros);

app.listen(port, () => console.log("Servidor online em http://localhost:3000/"))
