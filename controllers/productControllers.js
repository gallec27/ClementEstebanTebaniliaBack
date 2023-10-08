const {
  saveProduct,
  readProducts,
  findProduct,
  checkProduct,
  deleteProduct,
  readCategories,
} = require("../services/productServices");

const multer = require("multer");
const path = require("path");

// Configura la ubicación y el nombre de los archivos de imágenes cargadas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/products/"); // Ruta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext); // Nombre de archivo único
  },
});

// Crea una instancia de multer con la configuración
const upload = multer({ storage });

const registerProduct = async (req, res) => {
  // Destructuring
  const {
    productCode,
    productName,
    productDetail,
    productPrice,
    productDescription,
  } = req.body;

  // Verifica si se cargó una imagen
  if (!req.file) {
    return res.status(400).json({ error: "Debes cargar una imagen." });
  }

  if (!(await checkProduct(productCode))) {
    const newProduct = {
      productCode,
      productName,
      productDetail,
      productPrice,
      productDescription,
      imagen: req.file.filename,
    };

    await saveProduct(newProduct);

    res.status(201).json({ message: "Producto registrado con éxito." });
  } else {
    res.status(400).json({ error: "Ya existe ese producto." });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await readCategories(); // Obtén todas las categorías desde la base de datos

    res.json(categories); // Envía las categorías como respuesta JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

const getListProduct = async (req, res) => {
  try {
    // Obtener todos los productos usando la función readProducts
    const products = await readProducts();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al cargar la página" });
  }
};

const getActionProduct = async (req, res) => {
  try {
    const productCodigo = req.params.codigo;
    const product = await findProduct(productCodigo);

    res.json(product);
  } catch (error) {
    console.error(error);
    // Manejar el error apropiadamente
    res.status(500).json({ error: "Error al cargar la página" });
  }
};

const actionProductDelete = async (req, res) => {
  try {
    const productCode = req.body.codigo;
    await deleteProduct(productCode);

    const products = await readProducts();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto." });
  }
};

const actionProductSave = async (req, res) => {
  // Destructuring
  const {
    productCode,
    productName,
    productDetail,
    productPrice,
    productDescription,
  } = req.body;

  if (await checkProduct(productCode)) {
    await deleteProduct(productCode);
  }

  const newProduct = {
    productCode,
    productName,
    productDetail,
    productPrice,
    productDescription,
    imagen: req.file.filename,
  };

  await saveProduct(newProduct);
  const products = await readProducts();

  res.json({ products });
};

module.exports = {
  getListProduct,
  registerProduct,
  actionProductDelete,
  actionProductSave,
  getCategories,
  getActionProduct,
};
