import {NextFunction, Response, Request} from "express";

function headerToken(req: Request, res: Response, next: NextFunction) {
    const predefinedToken = 'toptalAssessment12345!'
    if (req.headers.authorization === undefined) return res.status(401).json({message: 'Please Set The Authorization Header!'});

    if (!/(?=^[Bb]earer)/.test(req.headers.authorization)) return res.status(401).json({message: '"Bearer" not found Invalid token!'});

    const token = req.headers.authorization.split(' ')[1];

    if (token !== predefinedToken) return res.status(401).json({message: 'Invalid token!'});

    if (token === predefinedToken) return next();
}

export {headerToken}
