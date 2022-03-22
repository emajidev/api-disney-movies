import pino from 'pino';
const pinoOptions =
    process.env.NODE_ENV != 'test'
        ? { name: process.env.APP_ID }
        : { name: process.env.APP_ID, level: process.env.LOG_LEVEL };
const l = pino(pinoOptions);

export default l;
