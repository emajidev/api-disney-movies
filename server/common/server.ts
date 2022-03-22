import config from 'config';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import os from 'os';
import path from 'path';
import cors from 'cors';

import l from './logger';
import installValidator from './swagger';

const app = express();
export default class ExpressServer {
    private routes: (app: Application) => void;

    constructor() {
        const root = path.normalize(__dirname + '/../..');
        app.use(
            bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' })
        );
        app.use(
            bodyParser.urlencoded({
                extended: false,
                limit: process.env.REQUEST_LIMIT || '100kb',
            })
        );
        app.use(
            bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' })
        );
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cors());
        // Static
        app.use(
            `${config.get('basePath')}/docs`,
            express.static(`${root}/public`)
        );
    }

    router(routes: (app: Application) => void): ExpressServer {
        this.routes = routes;
        return this;
    }

    listen(port: number): Application {
        const welcome = (p: number) => (): void => {
            // Service details
            console.log(config.get('basePath'));
            console.log(
                `up and running in ${
                    process.env.NODE_ENV || 'development'
                } @: ${os.hostname()} on port: ${p} `
            );
        };

        installValidator(app, this.routes)
            .then(() => {
                app.listen(port, welcome(port));
                app.emit('appStarted');
            })
            .catch((e) => {
                l.error(e);
                process.exit(1);
            });

        return app;
    }
}
