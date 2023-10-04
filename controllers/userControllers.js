const bcrypt = require("bcrypt");
const { saveUser, findUser, checkUser } = require("../services/userServices");

const renderLogin = (req, res) => {
  res.render("login", { errors: [] });
};

const renderRegister = (req, res) => {
  res.render("register", { errors: [] });
};

const registerUser = async (req, res) => {
  //Destructuring  
  const { nombre, apellido, fechaNac, email, password } = req.body;

  // buscar la tabla de usuarios el que coincida con el email, si ninguno coincide, enviar un error
  const user = await checkUser(email);

  if (!user) {
    // Generar un salt (valor aleatorio) para fortalecer el hashing
    const saltRounds = 10;
    // Aplicar el hashing de la contraseña utilizando bcrypt
    bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
      if (error) {        
        res.status(500).send("Error al hashear la contraseña.");
        return;
      }
      // Crear un objeto con el email y la contraseña hasheada
      const nuevoUsuario = {
        nombre,
        apellido,
        fechaNac,
        email,
        password: hashedPassword, // Guardar la contraseña hasheada en lugar de la original
        nivelAcceso: "client",
      };

      saveUser(nuevoUsuario);

      res.redirect("/");
    });
  } else {
    res.render("register", { errors : [{ msg: "Ya existe ese usuario." }] })
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
        if (usuarioOk.nivelAcceso === "client") {
          res.status(200).json({ success: true, message: "Autenticación exitosa", redirectTo: "/productos" });
        } else if (usuarioOk.nivelAcceso === "admin") {
          res.status(200).json({ success: true, message: "Autenticación exitosa", redirectTo: "/productos" });
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
  renderLogin,
  renderRegister,
  registerUser,
  login,
  logout
};
