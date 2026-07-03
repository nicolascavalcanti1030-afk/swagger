console.log("🚀 APP.TS CARREGADO!");

import dotev from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";
import authRouter from "./auth/auth.routes";
import swaggerUi from "swagger-ui-express";
//import swaggerJson from "./swagger.json";
import swaggerSpec from './user/swagger';


dotev.config();

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
  }

  private middleware(): void {
    this.express.use((req, res, next) => {
      console.log("📥 Requisição:", req.method, req.url);
    next();
    })
    this.express.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    this.express.use(express.json());
    this.express.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec)
    );
  }

  private async database() {
    try {
      console.log("Raw MONGODB_URI from .env:", process.env.MONGODB_URI); 
      const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/books';
      console.log("Chars:", [...MONGODB_URI].map(c => c.charCodeAt(0))); 
      await mongoose.connect(MONGODB_URI);
      console.log("connect database success");
    } catch (err) {
      console.error("Fail to connect database", err);
    }
  }

  private routes(): void {
    this.express.use(routes);
    this.express.use("/auth", authRouter);
  }
}

export default new App().express;
