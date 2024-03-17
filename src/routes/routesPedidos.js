import express from "express";
import PedidosController from "../controllers/PedidosController.js";

const routesPedidos = express.Router()

routesPedidos.get("/pedidos", PedidosController.buscaTodosOsPedidos);
routesPedidos.get("/pedidos/:id", PedidosController.buscaUmPedido);
routesPedidos.post("/pedidos", PedidosController.cadastraPedido);
routesPedidos.put("/pedidos/:id", PedidosController.atualizaPedido);
routesPedidos.delete("/pedidos/:id", PedidosController.deletaPedido);

export default routesPedidos;