const Terrain = require("../Model/Terrain");
const bcrypt = require("bcryptjs");
const isEmpty = require("../Validator/IsEmpty");
const Reservation = require("../Model/Reservation");
const path = require("path");
const terrainController = {};

//Add terrain
terrainController.addTerrain = async (req, res) => {
  const newTerrain = req.body;

  try {
    const terrain = new Terrain(newTerrain);
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map((file) => {
        return (
          "http://localhost:5000/terrains/" + file.filename.replace(/\\/g, "/")
        );
      });
      terrain.photo = imagePaths;
    }

    const terrainToAdd = await terrain.save();
    res.status(200).send("Terrain added Successfully 😊");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Get All terrain
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
  console.log("search", req.query);
  const { governorate, city, day, timeSlot } = req.query;
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

    console.log(terrainIds);
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
