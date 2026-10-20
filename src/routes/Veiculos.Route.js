import { Router } from "express";
import { veiculosServices } from "../services/veiculos.Services.js";

export const veiculosRouter = Router();

veiculosRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
        return res.status(400).json({ error: "ID do veículo inválido" });
    }

    try {
        const veiculo = await veiculosServices.getById(id);

        if (!veiculo) {
            return res.status(404).json({ error: "Veículo não encontrado" });
        }

        return res.json(veiculo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar veículo" });
    }
});

veiculosRouter.get("/", async (req, res) => {
    try {
        const veiculos = await veiculosServices.getall();
        res.json(veiculos);
    }catch (error) {
    
        console.error (error);
    }
});
veiculosRouter.post("/", async (req, res) => {
    try {
        const veiculos = await veiculosServices.create(req.body);
         res.status(201).json(veiculos);
    }catch (error) {
        console.error (error);
    }
});
