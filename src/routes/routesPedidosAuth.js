import express from "express";
import PedidosController from "../controllers/PedidosController.js";
import paginacao from "../middleware/middlewarePaginacao.js";

const routesPedidos = express.Router()

routesPedidos.get("/pedidos", PedidosController.buscaTodosOsPedidos, paginacao);
routesPedidos.get("/pedidos/sorvetes-valor-total", PedidosController.buscaValorTotalDosSorvetes);
routesPedidos.get("/pedidos/sorvetes", PedidosController.buscaTodosOsSorvetesMaisVendidos);
routesPedidos.get("/pedidos/usuarios", PedidosController.buscaTodosOsUsuariosQueMaisCompraram);
routesPedidos.get("/pedidos/valor-total", PedidosController.buscaValorTotalDosPedidos);
routesPedidos.get("/pedidos/valor-por-meses", PedidosController.buscaValoresAoLongoDosMeses);
routesPedidos.get("/pedidos/busca", PedidosController.buscaPorURL);
routesPedidos.get("/pedidos/:id", PedidosController.buscaUmPedido);
routesPedidos.post("/pedidos", PedidosController.cadastraPedido);
routesPedidos.put("/pedidos/:id", PedidosController.atualizaPedido);
routesPedidos.delete("/pedidos/:id", PedidosController.deletaPedido);

export default routesPedidos;