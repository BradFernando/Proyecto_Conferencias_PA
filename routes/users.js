const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

//Crear usuario
router.post('/crear', async (req, res) => {
  const {username, password, roleName} = req.body;

  // Buscar el rol por su nombre
  const role = await prisma.role.findUnique({
    where: {
      name: roleName
    }
  });

  // Si el rol no existe, devolver un error
  if (!role) {
    return res.status(400).json({ error: 'Role does not exist' });
  }

  // Crear el usuario con el ID del rol
  const user = await prisma.user.create({
    data: {
      username,
      password,
      roleId: role.id
    },
  });

  res.json(user);
});

//Actualizar usuario
router.put('/actualizar/:id', async (req, res) => {
  const { id } = req.params;
  const {username, password, roleName} = req.body;

  // Buscar el rol por su nombre
  const role = await prisma.role.findUnique({
    where: {
      name: roleName
    }
  });

  // Si el rol no existe, devolver un error
  if (!role) {
    return res.status(400).json({ error: 'Role does not exist' });
  }

  // Actualizar el usuario con el ID del rol
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username,
      password,
      roleId: role.id
    },
  });

  res.json(user);
});

//Eliminar usuario
router.delete('/eliminar/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.json(user);
});

//Obtener todos los usuarios
router.get('/listar', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      role: true, // incluir los detalles del rol en la respuesta
    },
  });
  res.json(users);
});

//Obtener un usuario
router.get('/buscar/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      role: true, // incluir los detalles del rol en la respuesta
    },
  });
  res.json(user);
});

//Listar todos los usuarios con sus respectivos nombres de rol
router.get('/listarUsuarios', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      role: true
    }
  });
  res.json(users);
});

module.exports = router;
