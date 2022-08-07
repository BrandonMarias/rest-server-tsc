import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({ msg: "Get usuarios", ok: true, status: 200, usuarios });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mesg: "Error del servidor",
            ok: false,
            status: 500,
            usuarios: null,
        });
    }
};

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
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
    } catch (error) {
        console.log(error);
        return res.json({
            mesg: "Error del servidor",
            ok: false,
            status: 500,
            usuario: null,
        });
    }
};

export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    delete body.id;
    try {
        const usuario = await Usuario.create(body);
        return res.json({
            msg: "Usuario Creado",
            ok: true,
            status: 201,
            usuario,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            mesg: "Error del servidor",
            ok: false,
            status: 500,
            usuario: null,
        });
    }
};

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    delete body.id;
    try {
        const usuario = await Usuario.findByPk(id);
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
        await usuario.update(body);
        return res.json({
            msg: "Usuario Actualizado",
            ok: true,
            status: 200,
            usuario,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            mesg: "Error del servidor",
            ok: false,
            status: 500,
            usuario: null,
        });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: "el usuario no existe",
                ok: false,
                status: 404,
                usuario: null,
            });
        }
        await usuario.update({ estado: false });
        return res.json({
            msg: "Usuario borrado correctamente",
            ok: true,
            status: 200,
            usuario,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            mesg: "Error del servidor",
            ok: false,
            status: 500,
            usuario: null,
        });
    }
};
