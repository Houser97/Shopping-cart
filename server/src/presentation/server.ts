import path from 'path';
import fileUpload from 'express-fileupload';
import express, { Router } from 'express';
import { Passport } from '../config/passport/passport';

interface Options {
    port: number;
    routes: Router;
    passport: Passport;
    public_path?: string;
}

export class Server {
    public readonly app = express();
    private readonly port: number;
    private serverListener?: any;
    private readonly routes: Router;
    private readonly public_path: string;
    private readonly passport: Passport;

    constructor(options: Options) {
        const { port, routes, passport, public_path = 'public' } = options;
        this.port = port;
        this.routes = routes;
        this.public_path = public_path;
        this.passport = passport;
    }

    async start() {
        if (process.env.NODE_ENV !== 'production') {
            require('dotenv').config();
            const cors = require('cors');
            this.app.use(cors({
                origin: "http://localhost:5173",
                credentials: true,
            }))
        }
        //* Passport
        this.passport.configure();
        this.app.use(this.passport.initialize());

        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 4096 * 4096 }
        }))


        //* Public Folder
        this.app.use(express.static(this.public_path));

        //* Routes
        this.app.use(this.routes);

        //* SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        });

        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    public close() {
        this.serverListener?.close();
    }
}