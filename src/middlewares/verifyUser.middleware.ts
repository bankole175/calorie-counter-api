import {NextFunction, Request, Response} from "express";

function isUserAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.headers.type === undefined) return res.status(401).json({message: 'Only admin can access this resource'});

    if (req.headers.type !== 'admin') return res.status(401).json({message: 'Only admin can access this resource'});

    if (req.headers.type === 'admin') return  next();
}

export {isUserAdmin}
