import config from 'config';
import { Application } from 'express';
import errorHandler from '../api/middlewares/error.handler';

const createMiddleware = require('@apidevtools/swagger-express-middleware');
const path = require('path');
const express = require('express');

export default function (
    app: Application,
    routes: (app: Application) => void
): Promise<void> {
    return new Promise((resolve, reject) => {
        createMiddleware(
            path.join(__dirname, 'api.yml'),
            app,
            (err: Error, middleware) => {
                if (err) {
                    return reject(err);
                }
                app.use(middleware.metadata());
                app.use(
                    middleware.files(app, {
                        apiPath: config.get('SWAGGER_API_SPEC'),
                    })
                );
                app.use(
                    middleware.parseRequest({
                        // Configure the cookie parser to use secure cookies
                        cookie: {
                            secret: process.env.SESSION_SECRET,
                        },
                        // Don't allow JSON content over 100kb (default is 1mb)
                        json: {
                            limit: process.env.REQUEST_LIMIT,
                        },
                    })
                );

                app.use(middleware.CORS(), middleware.validateRequest());
                app.use(errorHandler);
               
            }
          
        );
        routes(app);
        resolve();
    });
}
// Initialize Swagger Express Middleware with our Swagger file
let swaggerFile = path.join(__dirname, 'api.yaml');
