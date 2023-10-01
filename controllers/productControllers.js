const {
  saveProduct,
  readProducts,
  findProduct,
  checkProduct,
  deleteProduct,
  readCategories
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

const renderCart = (req, res) => {
  // Envía una respuesta JSON en lugar de renderizar una vista
  res.json({ message: "Cart Page" });
};

const renderDetails = async (req, res) => {
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

const renderCreate = (req, res) => {
  // Envía una respuesta JSON en lugar de renderizar una vista
  res.json({ message: "Create Product Page" });
};

const registerProduct = async (req, res) => {
  // Destructuring
  const { codigo, nombre, detalle, precio, descripcion } = req.body;

  // Verifica si se cargó una imagen
  if (!req.file) {
    return res.status(400).json({ error: "Debes cargar una imagen." });
  }

  if (!(await checkProduct(codigo))) {
    const nuevoProducto = {
      codigo,
      nombre,
      detalle,
      precio,
      descripcion,
      imagen: req.file.filename,
    };

    await saveProduct(nuevoProducto);

    res.status(201).json({ message: "Producto registrado con éxito" });
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

const renderListProduct = async (req, res) => {
  try {
    // Obtener todos los productos usando la función readProducts
    const products = await readProducts();     

    res.json(products);
  } catch (error) {
    console.error(error);
    // Manejar el error apropiadamente
    res.status(500).json({ error: "Error al cargar la página" });
  }
};

const renderActionProduct = async (req, res) => {
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

const actionProduct = async (req, res) => {
  const accion = req.body.accion;
  // Destructuring
  const { codigo, nombre, detalle, precio, descripcion } = req.body;

  if (accion === "guardar") {
    if (await checkProduct(codigo)) {
      await deleteProduct(codigo);
    }

    const nuevoProducto = {
      codigo,
      nombre,
      detalle,
      precio,
      descripcion,
      imagen: req.file.filename,
    };

    await saveProduct(nuevoProducto);
    const products = await readProducts();

    res.json({ products });
  } else if (accion === "eliminar") {
    await deleteProduct(codigo);
    const products = await readProducts();
    res.json({ products });
  }
};

module.exports = {
  renderCart,
  renderDetails,
  renderCreate,
  registerProduct,
  renderListProduct,
  renderActionProduct,
  actionProduct,
  getCategories
};
