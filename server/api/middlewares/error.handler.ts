import { Request, Response, NextFunction } from 'express';

// Error handler to display the error as HTML
// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(
    err,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    res.status(err.status || 500);
    res.json({
        errors: [
            {
                name: err?.params?.key,
                field: err.schemaPath?.replace(/[^a-zA-Z ]/g, ''),
                message: err.message,
            },
        ],
    });
}
