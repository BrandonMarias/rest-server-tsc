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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_1.default.findAll();
        res.json({ msg: "Get usuarios", ok: true, status: 200, usuarios });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            mesg: "Error del servidor",
            ok: false,
            status: 500,
            usuarios: null,
        });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (usuario) {
            return res.json({
                msg: "Get Usuario",
                ok: true,
                status: 200,
                usuario,
            });
        }
        return res.status(404).json({
            msg: `no de encontro el usuario con el id ${id}`,
            ok: true,
            status: 404,
            usuario: null,
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            mesg: "Error del servidor",
            ok: false,
            status: 500,
            usuario: null,
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    delete body.id;
    try {
        const usuario = yield usuario_1.default.create(body);
        return res.json({
            msg: "Usuario Creado",
            ok: true,
            status: 201,
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            mesg: "Error del servidor",
            ok: false,
            status: 500,
            usuario: null,
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    delete body.id;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: "el usuario no existe",
                ok: false,
                status: 404,
                usuario: null,
            });
        }
        if (usuario.getDataValue("estado") !== 1) {
            return res.status(404).json({
                msg: "el usuario ha sido eliminado",
                ok: false,
                status: 404,
                usuario: null,
            });
        }
        yield usuario.update(body);
        return res.json({
            msg: "Usuario Actualizado",
            ok: true,
            status: 200,
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            mesg: "Error del servidor",
            ok: false,
            status: 500,
            usuario: null,
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: "el usuario no existe",
                ok: false,
                status: 404,
                usuario: null,
            });
        }
        yield usuario.update({ estado: false });
        return res.json({
            msg: "Usuario borrado correctamente",
            ok: true,
            status: 200,
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            mesg: "Error del servidor",
            ok: false,
            status: 500,
            usuario: null,
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.controller.js.map