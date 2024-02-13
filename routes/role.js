const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

//Crear rol
router.post('/crear', async (req, res) => {
  const { name } = req.body;
  const role = await prisma.role.create({
    data: {
      name
    },
  });
  res.json(role);
});

//Actualizar rol
router.put('/actualizar/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const role = await prisma.role.update({
    where: {
      id: id,
    },
    data: {
      name
    },
  });
  res.json(role);
});

//Eliminar rol
router.delete('/eliminar/:id', async (req, res) => {
  const { id } = req.params;
  const role = await prisma.role.delete({
    where: {
      id: id,
    },
  });
  res.json(role);
});

//Obtener todos los roles
router.get('/listar', async (req, res) => {
  const roles = await prisma.role.findMany();
  res.json(roles);
});

//Obtener un rol
router.get('/buscar/:id', async (req, res) => {
  const { id } = req.params;
  const role = await prisma.role.findUnique({
    where: {
      id: id,
    },
  });
  res.json(role);
});


module.exports = router;