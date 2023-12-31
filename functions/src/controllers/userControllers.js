const { admin } = require('../config/firebase');

const createUser = async (req, res) => {
  // El password debe ser de minimo 6 caracteres
  const { email, password, username } = req.body;
  try {
    await admin.auth().createUser({
      uid: username,
      email: email,
      password: password,
    })
    return res.status(200).json("Usuario creado correctamente");
  } catch (error) {
    if (error.errorInfo.code == 'auth/uid-already-exists')
      return res.status(500).json("Nombre de usuario ya registrado");
    else if (error.errorInfo.code == 'auth/email-already-exists')
      return res.status(500).json("Email ya registrado");

    return res.status(500).json("Error al crear usuario");
  }
}

module.exports = { createUser }