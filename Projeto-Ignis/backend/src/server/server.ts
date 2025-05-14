import express from "express";
import cors from "cors";
import ocorrenciaRoutes from "../routes/OcorrenciaRoutes";

const server = express();
server.use(cors());
server.use(express.json());
server.use("/api", ocorrenciaRoutes);
server.get("/", (_, res) => res.send("API do Projeto Ignis está ativa!"));
export { server };
