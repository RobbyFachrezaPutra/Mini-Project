"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_SECRET = exports.CLOUDINARY_SECRET = exports.CLOUDINARY_KEY = exports.CLOUDINARY_NAME = exports.SECRET_KEY = exports.FE_URL_PRODUCTION = exports.FE_URL = exports.PORT = void 0;
require("dotenv/config");
_a = process.env, exports.PORT = _a.PORT, exports.FE_URL = _a.FE_URL, exports.FE_URL_PRODUCTION = _a.FE_URL_PRODUCTION, exports.SECRET_KEY = _a.SECRET_KEY, exports.CLOUDINARY_NAME = _a.CLOUDINARY_NAME, exports.CLOUDINARY_KEY = _a.CLOUDINARY_KEY, exports.CLOUDINARY_SECRET = _a.CLOUDINARY_SECRET, exports.REFRESH_SECRET = _a.REFRESH_SECRET;
