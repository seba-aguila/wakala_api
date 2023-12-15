import admin from '../config/firebase.js'

const createUser = async (req, res) => {
  const { email, password, businessName, firstName, lastName, phone, location } = req.body;
  const uid = businessName.trim().toLowerCase();
  try {
    const user = await admin.auth().createUser({
      uid: uid,
      email: email,
      password: password,
      // phoneNumber: phone,
    })
    db.collection('users').doc(businessName).set({
      firstName: firstName,
      lastName: lastName,
      businessName: businessName,
      email: email,
      phone: phone,
      location: location,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    return res.status(500).json("We couldn't create the user");
  }
}

export default createUser