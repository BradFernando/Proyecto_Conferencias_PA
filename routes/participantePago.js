const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Crear o actualizar un ParticipantePago
router.post('/crear', async (req, res) => {
    const { codigo_participante, fecha_pago, monto_pago, direccion_pago, postal_pago,comprobante_pago, estado_pago } = req.body;
    let participantePago = await prisma.participantePago.findUnique({
        where: {
            codigo_participante
        }
    });
    if (participantePago) {
        participantePago = await prisma.participantePago.update({
            where: {
                codigo_participante
            },
            data: {
                fecha_pago,
                monto_pago,
                direccion_pago,
                postal_pago,
                comprobante_pago,
                estado_pago
            }
        });
    } else {
        participantePago = await prisma.participantePago.create({
            data: {
                codigo_participante,
                fecha_pago,
                monto_pago,
                direccion_pago,
                postal_pago,
                comprobante_pago,
                estado_pago
            }
        });
    }
    res.json(participantePago);
});

// Leer todos los ParticipantePago
router.get('/listar', async (req, res) => {
    const participantePagos = await prisma.participantePago.findMany();
    res.json(participantePagos);
});

// Leer un ParticipantePago específico
router.get('/buscar/:id', async (req, res) => {
    const { id } = req.params;
    const participantePago = await prisma.participantePago.findUnique({
        where: {
            codigo_pago: id
        }
    });
    res.json(participantePago);
});

// Actualizar un ParticipantePago
router.put('/actualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { codigo_participante, fecha_pago, monto_pago, direccion_pago, postal_pago,comprobante_pago, estado_pago } = req.body;
    const participantePago = await prisma.participantePago.update({
        where: {
            codigo_pago: id
        },
        data: {
            codigo_participante,
            fecha_pago,
            monto_pago,
            direccion_pago,
            postal_pago,
            comprobante_pago,
            estado_pago
        }
    });
    res.json(participantePago);
});

// Eliminar un ParticipantePago
router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    const participantePago = await prisma.participantePago.delete({
        where: {
            codigo_pago: id
        }
    });
    res.json(participantePago);
});

// Cambiar el estado de un ParticipantePago
router.put('/cambiarEstado/:id', async (req, res) => {
    const { id } = req.params;
    const { estado_pago } = req.body;
    const participantePago = await prisma.participantePago.update({
        where: {
            codigo_pago: id
        },
        data: {
            estado_pago
        }
    });
    res.json(participantePago);
});

// Obtener todos los ParticipantePago con su respectivo participante
router.get('/listarConParticipante', async (req, res) => {
    const participantePagos = await prisma.participantePago.findMany({
        include: {
            participante: true
        }
    });
    res.json(participantePagos);
});

module.exports = router;
