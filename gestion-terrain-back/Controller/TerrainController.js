const Terrain = require("../Model/Terrain");
const bcrypt = require("bcryptjs");
const isEmpty = require("../Validator/IsEmpty");
const Reservation = require("../Model/Reservation");
const path = require("path");
const terrainController = {};

//Add terrain
terrainController.addTerrain = async (req, res) => {
  const { newTerrain } = req.body;

  try {
    const terrain = new Terrain(JSON.parse(newTerrain));

    if (req.files && req.files.length > 0) {
      const photoPaths = req.files.map((file) => {
        const imagePath = file.path.replace(/\\/g, "/");
        const photoPath = `http://localhost:${process.env.PORT}/terrains/${imagePath}`;
        return photoPath;
      });
      terrain.photo = photoPaths;
    }

    const terrainToAdd = await terrain.save();
    res.status(200).send("Terrain added Successfully 😊");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a terrain
terrainController.update = async (req, res) => {
  const { id } = req.params;

  const terrainToUpdate = JSON.parse(req.body.editTerrain);

  const updatedFields = {
    name: terrainToUpdate.name,
    description: terrainToUpdate.description,
    price: terrainToUpdate.price,
    surface: terrainToUpdate.surface,
    partner: terrainToUpdate.partner,
    address: terrainToUpdate.address,
    password: terrainToUpdate.password,
  };

  if (req.files && req.files.length > 0) {
    const photoPaths = req.files.map((file) => {
      const imagePath = file.path.replace(/\\/g, "/");
      return `http://localhost:${process.env.PORT}/terrains/${imagePath}`;
    });
    updatedFields.photo = photoPaths;
  } else if (!updatedFields.photo) {
    delete updatedFields.photo;
  }

  if (!isEmpty(updatedFields.password)) {
    updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
  }

  try {
    const updatedTerrain = await Terrain.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedTerrain) {
      res.status(200).json(updatedTerrain);
    } else {
      res.status(404).json("Terrain not found ⚠️");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get All terrain
terrainController.getAllTerrains = async (req, res) => {
  try {
    const terrains = await Terrain.find();
    terrains
      ? res.status(200).json(terrains)
      : res.status(404).json("No terrain was found 😔");
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get All terrain by partner
terrainController.getAllTerrain = async (req, res) => {
  try {
    const terrains = await Terrain.find({ partner: req.params.id });
    terrains
      ? res.status(200).json(terrains)
      : res.status(404).json("No terrain was found 😔");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a terrain
terrainController.deleteTerrain = async (req, res) => {
  try {
    const terrain = await Terrain.findByIdAndDelete(req.params.id);
    const terrains = await Terrain.find();
    terrains
      ? res.status(200).json(terrains)
      : res.status(404).json("Terrain not found 😔");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get terrain Byid
terrainController.getTerrainById = async (req, res) => {
  try {
    const terrain = await Terrain.findById(req.params.id);
    terrain
      ? res.status(200).json(terrain)
      : res.status(404).json({ message: "Terrain not found 😔" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//serach for terrain
terrainController.searchTerrain = async (req, res) => {

  const { governorate, city, day, timeSlot } = req.body;
  try {
    const query = {};

    if (!isEmpty(governorate)) {
      query["address.governorate"] = { $regex: governorate, $options: "i" };
    }

    if (!isEmpty(city)) {
      query["address.city"] = { $regex: city, $options: "i" };
    }

    const terrains = await Terrain.find(query);

    const terrainIds = terrains.map((terrain) => terrain._id);

    const reservations = await Reservation.find({
      terrain: { $in: terrainIds },
      date: day,
      timeSlot: timeSlot,
      confirmation: true,
    });

    const terrainIdres = reservations.map((reservation) => reservation.terrain);

    const availableTerrains = terrains.filter(
      (objA) => !terrainIdres.some((id) => id.equals(objA._id))
    );

    availableTerrains
      ? res.status(200).json(availableTerrains)
      : res.status(404).json("Terrains not found 😔");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = terrainController;
