const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

// Importa Multer
const multer = require("multer");

// Configura la ubicación y el nombre de los archivos de imágenes cargadas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/products/"); // Ruta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop(); // Obtén la extensión del archivo original
    cb(null, uniqueSuffix + "." + ext); // Nombre de archivo único con extensión
  },
});

// Crea una instancia de multer con la configuración
const upload = multer({ storage });

// Utiliza Multer como middleware en la ruta de creación de productos
router.post("/create", upload.single("imagen"), productController.registerProduct);
router.get("/list", productController.getListProduct);
router.post("/delete", productController.actionProductDelete);
router.get("/edit", productController.getProduct);
router.post("/edit", upload.single("imagen"), productController.actionProductSave);
router.get("/categories", productController.getCategories);

module.exports = router;
