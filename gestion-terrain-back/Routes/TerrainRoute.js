const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();
const terrainController = require("../Controller/TerrainController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/terrains");
  },
  filename: function (req, file, cb) {
    const newFileName = Date.now() + "-" + file.originalname;
    cb(null, newFileName);
  },
});
const upload = multer({ storage: storage });


router.get('/assets/terrains/:filename',(req,res)=>{
  const {filename} = req.params
  const filePath = path.join(__dirname, '..', 'assets','terrains', filename);
  res.sendFile(filePath)
})

router.post("/add", upload.array("image", 2), terrainController.addTerrain);
router.get("/getTerrains/:id", terrainController.getAllTerrain);
router.get("/getTerrain/:id", terrainController.getTerrainById);
router.get("/search", terrainController.searchTerrain);
router.put("/update/:id", upload.array("image", 2),terrainController.update); 
router.delete("/delete/:id", terrainController.deleteTerrain); // do update controller

module.exports = router;
