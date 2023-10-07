const bcrypt = require("bcrypt");
const { saveUser, findUser, checkUser } = require("../services/userServices");

const registerUser = async (req, res) => {
  // Destructuring
  const {
    firstName,
    surname,
    birthDay,
    address,
    location,
    telephone,
    email,
    password,
  } = req.body;

  // buscar la tabla de usuarios el que coincida con el email, si ninguno coincide, enviar un error
  const user = await checkUser(email);

  if (!user) {
    // Generar un salt (valor aleatorio) para fortalecer el hashing
    const saltRounds = 10;

    // Aplicar el hashing de la contraseña utilizando bcrypt
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Crear un objeto con el email y la contraseña hasheada
      const newUser = {
        firstName,
        surname,
        birthDay,
        address,
        location,
        telephone,
        email,
        password: hashedPassword, // Guardar la contraseña hasheada en lugar de la original
        role: "client",
      };

      console.log("userController-registerUser:", newUser);
      const userSaved = await saveUser(newUser);
      if (userSaved !== null) {
        return await login(userSaved);
      }

      // res.redirect("/");
    } catch (error) {
      res.status(500).send("Error al hashear la contraseña.");
    }
  } else {
    res.status(404).json({ success: false, message: "El usuario ya existe." });
  }
};


const login = async (req, res) => {  
  const { email, password } = req.body;
  
  const usuarioOk = await findUser(email);
  
  if (usuarioOk !== null) {
    bcrypt.compare(password, usuarioOk.password, (error, result) => {
      if (error) {        
        return res.status(400).json({ success: false, message: "Error al comparar la contraseña." });
      }
      
      if (result) {
        if (usuarioOk.role === "client") {
          res.status(200).json({ success: true, message: "Autenticación exitosa", user: usuarioOk, redirectTo: "/productos" });
        } else if (usuarioOk.role === "admin") {
          res.status(200).json({ success: true, message: "Autenticación exitosa", user: usuarioOk, redirectTo: "/productos" });
        }
      } else {
        res.status(401).json({ success: false, message: "Contraseña incorrecta." });
      }
    });
  } else {
    res.status(404).json({ success: false, message: "El usuario no existe." });
  }
};

const logout = (req, res) => {
  res.redirect('/');
}

module.exports = { 
  registerUser,
  login,
  logout
};
