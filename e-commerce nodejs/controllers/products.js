const productModel = require('../models/Product.js');
const categoryModel = require('../models/Category.js');
const GenericMethods = require('../models/generic.js');
const multer = require("multer");
const {v4: uuidv4} = require("uuid");

const productMethods = new GenericMethods(productModel);
const categoryMethods = new GenericMethods(categoryModel);

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/product");
    },
    filename: (req, file, cb) => {
        //mimetype returns images/....
        const ext = file.mimetype.split("/")[1] //after using split we get ["images","extension"] and we want the extension part only
        cb(null, `product-${uuidv4()}.${ext}`);
    }
})

const uploader = multer({ //give multer its storage property
    storage: multerStorage,
});

const uploaderFiles = uploader.fields([
    {
        name: "main_image",
        maxCount: 1
    },
    {
        name: "images", //images field with max 12 elements
        maxCount: 12
    }
]); //create the middleware


const indexController = async (req,res) => {
    const products = await productMethods.getAll(
        {},
        {ref:"cat_id", fields:["title", "description", "main_image"]}
    );
    console.log(products);
    
    res.status(200).render("products", {products}); //passes products as parameter to index file
}

const renderCreateView = async (req,res) => {
    // const products = await productMethods.getAll(); (NOT NEEDED)
    const categories = await categoryMethods.getAll();
    res.status(200).render("products/create", {categories});
}

const CreateProduct = async (req,res) => {
    //receive images (req.files)
    // req.body
    // upload file public/product
    // save URL of img into DB
        // main_img -> 1 img
        // images -> array of URLs
    
    console.log(req.body); console.log(req.files);
    
    const main_image = req.files["main_image"] 
            //here req.files["main_image"] returns [0]: file_name [1]:file_extension 
        ? `/images/product/${req.files["main_image"][0].filename}`
        : null;
    const images = req.files["images"] ? req.files["images"].map((singleImg) => 
        `/images/product/${singleImg.filename}` 
    )
    : [];

    const product = {...req.body, main_image, images};
    
    await productMethods.create(product);
    
    res.status(200).redirect("/products");
}

const DeleteProduct = async (req,res) => {
    console.log(req.body);
    const id = req.body.id;
    const data = req.body.data;
    await productMethods.delete(data);
    
    res.status(200).redirect("/products");
}

const UpdateProduct = async (req,res) => {
    const data = req.body;
    await productMethods.update(id,data);
    
    res.status(200).redirect("/products/update"); //implement /products/update
}

module.exports = {
    indexController,
    renderCreateView,
    CreateProduct,
    DeleteProduct,
    UpdateProduct,
    uploaderFiles,
};