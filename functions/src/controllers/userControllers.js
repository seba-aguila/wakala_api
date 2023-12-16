const { admin } = require('../config/firebase');

const createUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    await admin.auth().createUser({
      uid: username,
      email: email,
      password: password,
    })
    return res.status(200).json("Usuario creado correctamente");
  } catch (error) {
    console.log(error)
    return res.status(500).json("Error al crear usuario");
  }
}

module.exports = { createUser }