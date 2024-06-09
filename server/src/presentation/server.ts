import express, { Router } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { Passport } from '../config/passport';
import session from 'express-session';

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
                origin: "http://localhost:3001",
                credentials: true,
            }))
        }
        //* Passport
        this.passport.configure();
        this.app.use(session(
            {
                secret: 'cats',
                resave: false,
                saveUninitialized: true,
                cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 } // Opciones de la cookie
            }
        ));
        this.app.use(this.passport.initialize());
        this.app.use(this.passport.createSession());


        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded
        this.app.use(cookieParser());

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