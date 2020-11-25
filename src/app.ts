// src/app.ts
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

const app = express();

export default function appInit(): Promise<Express> {
    return new Promise(async (resolve) => {
        app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        // Use body parser to read sent json payloads
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        const swaggerHtml = swaggerUi.generateHTML(await import('./swagger.json'));
        app.use("/docs", swaggerUi.serve, (_: Request, res: Response) => res.send(swaggerHtml));

        return resolve(app);
    });
}
