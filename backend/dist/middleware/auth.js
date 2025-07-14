"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = signin;
exports.signup = signup;
exports.logout = logout;
exports.authUser = authUser;
const zod_1 = __importStar(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client = new client_1.PrismaClient;
const JWT_SECRET = process.env.JWT_SECRET;
const User = zod_1.default.object({
    name: (0, zod_1.string)(),
    email: (0, zod_1.string)(),
    password: (0, zod_1.string)().min(8)
});
const Signin = zod_1.default.object({
    email: (0, zod_1.string)(),
    password: (0, zod_1.string)().min(8)
});
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = User.safeParse(req.body);
        if (!user.success) {
            return res.status(400).json({ message: "invalid input" });
        }
        try {
            const hashPassword = yield bcrypt_1.default.hash(user.data.password, 10);
            yield client.user.create({
                data: {
                    name: user.data.name,
                    email: user.data.email,
                    password: hashPassword
                }
            });
            res.status(201).json({ message: "User created" });
        }
        catch (e) {
            res.status(500).json({ message: "couldn't create user, try again." });
        }
    });
}
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = Signin.safeParse(req.body);
        if (!user.success) {
            return res.status(401).json({ message: "invalid input" });
        }
        const isExisting = yield client.user.findFirst({
            where: {
                email: user.data.email
            }
        });
        if (!isExisting) {
            return res.status(403).json({ message: "user doesn't exist" });
        }
        const checkPassword = yield bcrypt_1.default.compare(user.data.password, isExisting.password);
        if (checkPassword) {
            if (!JWT_SECRET) {
                return res.status(500).json({ message: "Internal server error" });
            }
            const token = jsonwebtoken_1.default.sign({ userId: isExisting.id }, JWT_SECRET);
            res.cookie('authToken', token, { httpOnly: true });
            res.json({ message: "Logged in." });
        }
    });
}
function authUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authToken = req.cookies['authToken'];
        if (!authToken) {
            return res.status(401).json({ error: "No token provided" });
        }
        if (!JWT_SECRET) {
            return res.status(500).json({ message: "Internal Error" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(authToken, JWT_SECRET);
            req.userId = decoded.userId;
            next();
        }
        catch (e) {
            return res.status(401).json({ error: "Invalid token" });
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie('token');
        res.cookie('token', '');
        res.json({ message: "Logged out." });
    });
}
