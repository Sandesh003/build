import { verifyJwtToken } from '../utils/jwtHelper.js';
import { InternalServerError, UnAuthorizedError } from '../config/apiError.js';
import { settings } from '../config/settings.js';
export const authMiddleware = async (req, res, next) => {
    const token = req.cookies[settings.jwt.tokenCookieKey];
    try {
        if (!token) {
            throw new UnAuthorizedError();
        }
        ;
        console.log({ token });
        const decoded = verifyJwtToken(token);
        req.userId = decoded.userId;
        req.tenantId = decoded.tenantId;
        next();
    }
    catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            throw new UnAuthorizedError();
        }
        ;
        throw new InternalServerError('Internal server error');
    }
};
