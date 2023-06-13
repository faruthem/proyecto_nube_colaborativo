const express = require('express');
const router = express.Router();
const multer = require('multer'); // Importa multer
const fs = require('fs'); // Importa el módulo fs para trabajar con archivos
const cloudinary = require('cloudinary').v2;



cloudinary.config({
    cloud_name: "dofiqshb8",
    api_key: "483757338352375",
    api_secret: "rY3OkyHGuJzf7neu03hSXMy_3vo"
})

const storage = multer.diskStorage({ // Configura el almacenamiento en disco para las imágenes
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes cargadas uploads/
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Genera un nombre de archivo único basado en la fecha y el nombre original del archivo
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }//Limite a 5 MB
}); // Crea una instancia de multer con la configuración de almacenamiento

const Product = require('../models/Product');
const { isAuthenticated } = require('../helpers/auth');
const User = require('../models/User');

//agregué
router.get('/products/tienda', async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.render('products/tienda', { products });
    } catch (error) {
        console.error(error);
        // Manejo del error, redireccionamiento o respuesta apropiada
    }
});
//agregué

router.get('/products/add', isAuthenticated, (req, res) => {
    res.render('products/new-product');
});

//Si algo sale mal borra esto
// Borrar aquí 

router.post('/products/new-product', isAuthenticated, upload.single('image'), async (req, res) => {
    const { title, description, precio } = req.body;
    const errors = [];

    if (!title) {
        errors.push({ text: 'Por favor escribe un nombre para tu producto' });
    }
    if (!description) {
        errors.push({ text: 'Por favor escribe una descripción para tu producto' });
    }

    if (errors.length > 0) {
        res.render('products/new-product', {
            errors,
            title,
            description
        });
    } else {
        try {

            const result = await cloudinary.uploader.upload(req.file.path);
            const newProduct = new Product({
                title,
                description,
                precio,
                image: {
                    url: result.secure_url,
                    public_id: result.public_id
                }
            });
            newProduct.user = req.user._id;
            await newProduct.save();

            req.flash('success_msg', 'Producto agregado');
            res.redirect('/products');
            // Eliminar archivo de la carpeta "uploads"
            fs.unlinkSync(req.file.path);

        } catch (error) {
            console.error(error);
            // Manejo del error, redireccionamiento o respuesta apropiada
        }
    }
});

router.get('/products', isAuthenticated, async (req, res) => {
    try {
        const products = await Product.find({ user: req.user._id }).lean().sort({ precio: 1 });
        res.render('products/all-products', { products });
    } catch (error) {
        console.error(error);
        // Manejo del error, redireccionamiento o respuesta apropiada
    }
});



router.get('/products/edit/:id', isAuthenticated, async (req, res) => {
    const product = await Product.findById(req.params.id).lean();
    res.render('products/edit-product', { product });
});

router.put('/products/edit-product/:id', isAuthenticated, upload.single('image'), async (req, res) => {
    const { title, description, precio } = req.body;
    const image = req.file;

    try {
        let updatedProduct = {
            title,
            description,
            precio
        };

        if (image) {
            // Procesa y almacena la nueva imagen si se proporciona
            const result = await cloudinary.uploader.upload(image.path);
            updatedProduct.image = {
                url: result.secure_url,
                public_id: result.public_id
            };
            // Elimina la imagen anterior de Cloudinary
            await cloudinary.uploader.destroy(req.body.imagePublicId);
        }

        await Product.findByIdAndUpdate(req.params.id, updatedProduct);
        req.flash('success_msg', 'Producto actualizado');
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        // Manejo del error, redireccionamiento o respuesta apropiada
    }
});

router.delete('/products/delete/:id', isAuthenticated, async (req, res) => {
    await Product.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Producto eliminado');
    res.redirect('/products');
});

module.exports = router;