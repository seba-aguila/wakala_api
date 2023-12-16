const { db, admin } = require('../config/firebase');
const { Timestamp } = require('firebase-admin/firestore')

const createWakala = async (req, res) => {
  const { autor, descripcion, linkFoto1, linkFoto2, sector } = req.body;
  try {
    const wakala = await db.collection('wakalas').add({
      autor,
      descripcion,
      linkFoto1,
      linkFoto2,
      sector,
      comentarios: [],
      sigueAhi: [],
      yaNoEsta: [],
      fecha: Timestamp.fromDate(new Date)
    })
    return res.status(200).json("Wakala creado correctamente");
  } catch (error) {
    console.log(error)
    return res.status(500).json("Error al crear wakala");
  }
}

const getWakalas = async (req, res) => {
  try {
    const wakalas = [];
    const wakalasSnapshot = await db.collection('wakalas').get();
    wakalasSnapshot.forEach((wakala) => wakalas.push({ id: wakala.id, ...wakala.data() }));
    return res.status(200).json(wakalas);
  } catch (error) {
    return res.status(500).json("Error al obtener wakalas");
  }
}

const addComment = async (req, res) => {
  const { wakalaId, autor, comentario } = req.body;
  try {
    const wakala = (await db.collection('wakalas').doc(wakalaId).get()).data();
    const comentarios = [...wakala.comentarios, { autor, descripcion: comentario }];
    await db.collection('wakalas').doc(wakalaId).update({
      comentarios
    })
    return res.status(200).json("Comentario agregado correctamente");
  } catch (error) {
    return res.status(500).json("Error al ingresar comentario");
  }
}

const markStillThere = async (req, res) => {
  const { wakalaId, username } = req.body;
  try {
    const wakala = (await db.collection('wakalas').doc(wakalaId).get()).data();
    const index = wakala.yaNoEsta.indexOf(username);
    if (index != -1) {
      wakala.yaNoEsta.splice(index, 1);
      await db.collection('wakalas').doc(wakalaId).update({
        yaNoEsta: wakala.yaNoEsta,
        sigueAhi: [...wakala.sigueAhi, username]
      })
    }
    else {
      await db.collection('wakalas').doc(wakalaId).update({
        sigueAhi: [...wakala.sigueAhi, username]
      })
    }
    return res.status(200).json("Sigue ahí marcado correctamente");
  } catch (error) {
    return res.status(500).json("Error al marcar");
  }
}

const markIsNotThere = async (req, res) => {
  const { wakalaId, username } = req.body;
  try {
    const wakala = (await db.collection('wakalas').doc(wakalaId).get()).data();
    const index = wakala.sigueAhi.indexOf(username);
    console.log(index);
    if (index != -1) {
      wakala.sigueAhi.splice(index, 1);
      await db.collection('wakalas').doc(wakalaId).update({
        sigueAhi: wakala.sigueAhi,
        yaNoEsta: [...wakala.yaNoEsta, username]
      })
    }
    else {
      await db.collection('wakalas').doc(wakalaId).update({
        yaNoEsta: [...wakala.yaNoEsta, username]
      })
    }
    return res.status(200).json("Ya no está marcado correctamente");
  } catch (error) {
    return res.status(500).json("Error al marcar");
  }
}

module.exports = { createWakala, getWakalas, addComment, markStillThere, markIsNotThere }