const Collector = require('../models/collector');
const Center = require('../models/center'); 
const bcrypt = require('bcrypt');

const registerCollector = async (req, res) => {
  let{ 
    fullName, 
    username, 
    email, 
    phoneNo, 
    password, 
    centerUsername,
  } = req.body;

  // trim and convert to lowercase
  fullName = fullName.trim();
  username = username.trim().toLowerCase();
  email = email.trim().toLowerCase();
  centerUsername = centerUsername.trim();


  try {
    //Check if the center exists
    const center = await Center.findOne({centerUsername:centerUsername});
    if (!center) {
      return res.status(404).json({ message: "collection center with the username not found" });
    }

    //hash password
    const hashedPassword=await bcrypt.hash(password,10);

    const newCollector = new Collector({
      fullName,
      username,
      email,
      phoneNo,
      password:hashedPassword,
      center: center._id,
    });

    await newCollector.save();

    res.status(201).json({ 
        message: "Collector registered successfully",
        collector: newCollector,
        success: true
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering collector", error: err });
  }
};

module.exports = {
    registerCollector
}
