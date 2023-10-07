const  User  = require('../models/user'); // Importa tu modelo de usuario

// Función para guardar un nuevo usuario en la base de datos
async function saveUser(newUser) {
  try {
    console.log("userService-saveUser:", newUser);
    const usuario = await User.create(newUser);
    return usuario;
  } catch (error) {
    throw error;
  }
}

// Función para buscar un usuario por su email
async function findUser(emailLogin) {
  try {    
    const usuario = await User.findOne({ where: { email: emailLogin } });
       
    return usuario;
  } catch (error) {
    throw error;
  }
}

// Función para verificar si un usuario existe por su email
async function checkUser(emailLogin) {
  try {
    console.log("CheckUser:", emailLogin)
    const usuario = await User.findOne({ where: { email: emailLogin } });
    
    console.log("checkUser-return finOne:", usuario);
    return usuario !== null;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  saveUser,
  findUser,
  checkUser,
};
