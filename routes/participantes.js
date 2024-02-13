const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

//Crear participante
router.post('/crear', async (req, res) => {
    const { nombres, apellidos, cedula, email, telefono, doi, area, tema, participacion, descuento, totalAPagar } = req.body;
    const participante = await prisma.participante.create({
        data: {
            nombres,
            apellidos,
            cedula,
            email,
            telefono,
            doi,
            area,
            tema,
            participacion,
            descuento,
            totalAPagar,
        },
    });
    res.json(participante);
});

//Actualizar participante
router.put('/actualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, cedula, email, telefono, doi, area, tema, participacion, descuento } = req.body;
    const participante = await prisma.participante.update({
        where: {
            codigo_participante: id,
        },
        data: {
            nombres,
            apellidos,
            cedula,
            email,
            telefono,
            doi,
            area,
            tema,
            participacion,
            descuento,
        },
    });
    res.json(participante);
});

//Eliminar participante
router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    const participante = await prisma.participante.delete({
        where: {
            codigo_participante: id,
        },
    });
    res.json(participante);
});

//Obtener todos los participantes
router.get('/listar', async (req, res) => {
    const participantes = await prisma.participante.findMany();
    res.json(participantes);
});

//Obtener un participante
router.get('/buscar/:id', async (req, res) => {
    const { id } = req.params;
    const participante = await prisma.participante.findUnique({
        where: {
            codigo_participante: id,
        },
    });
    res.json(participante);
});

// Cambiar el estado de un participante
router.put('/cambiarEstado/:id', async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const participante = await prisma.participante.update({
        where: {
            codigo_participante: id,
        },
        data: {
            estado,
        },
    });
    res.json(participante);
});

// Obtener todos los participantes activos
router.get('/activos', async (req, res) => {
    const participantes = await prisma.participante.findMany({
        where: {
            estado: true,
        },
    });
    res.json(participantes);
});

module.exports = router;