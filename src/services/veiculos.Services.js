import { pool } from "../database/db.js";

class veiculosService{
    async getall() {
        const res = await pool.query("SELECT * FROM veiculos")
        return res.rows
    }

    async create({modelo, marca, ano, placa}) {
        const res = await pool.query("INSERT INTO veiculos (modelo,marca,ano,placa) VALUES ($1, $2, $3, $4) RETURNING *", [modelo,marca,ano,placa]);
        return res.rows[0]
    }
}

export const veiculosServices = new veiculosService()