"use strict";
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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const nanoid_1 = require("nanoid");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = require("./middleware/auth");
const prisma = new client_1.PrismaClient();
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'http://localhost:5173/'
}));
app.use((0, cookie_parser_1.default)());
app.post('/signup', auth_1.signup);
app.post('/signin', auth_1.signin);
app.post('/logout', auth_1.logout);
app.post('/content', auth_1.authUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = req.body;
    if (!userId) {
        return res.status(403);
    }
    try {
        yield prisma.blogs.create({
            data: {
                title: content.title,
                createrid: userId,
                content: content.description,
            }
        });
        res.status(201).json({ message: "Blog created" });
    }
    catch (e) {
        console.log(e);
    }
}));
app.post('/share', auth_1.authUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const id = req.body.id;
    const content = yield prisma.blogs.findFirst({
        where: {
            id: id
        }
    });
    if (!content) {
        return res.status(404).json({ message: "content doesn't exist." });
    }
    if (content.createrid === userId) {
        const linkId = (0, nanoid_1.nanoid)(10);
        yield prisma.link.create({
            data: {
                link: linkId,
                content: id
            }
        });
        res.status(201).json({ link: `http://localhost/5173/share/${nanoid_1.nanoid}` });
    }
}));
app.get('/share/:nanoid', auth_1.authUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.nanoid;
    const content = yield prisma.link.findFirst({
        where: {
            link: id
        },
        include: {
            blogs: true
        }
    });
    res.status(200).json({ content });
}));
app.listen(PORT, () => {
    console.log('Server Running on ' + PORT);
});
