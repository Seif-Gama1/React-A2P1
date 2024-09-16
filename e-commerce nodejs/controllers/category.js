const categoryModel = require('../models/Category.js');
const productModel = require('../models/Product.js');
const GenericMethods = require('../models/generic.js');
const multer = require("multer");
const {v4: uuidv4} = require("uuid");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/category");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1] //mimetype returns images/....
        //after using split we get ["images","extension"] and we want the extension part only
        cb(null, `category-${uuidv4()}.${ext}`);
    }
})

const uploader = multer({
    storage: multerStorage,
});

//image here is the id of the field of html tag that will carry the file
const uploadMiddleware = uploader.single("image"); 

const categoryMethods = new GenericMethods(categoryModel);
const productMethods = new GenericMethods(productModel);

const mainView = async (req,res) => {
    //get categories
    const categories = await categoryMethods.getAll();
    res.status(200).render("categories", { categories });
}

const renderCreateView = async (req,res) => {
    //get categories?
    res.status(200).render("categories/create");
}

const createCategory = async (req,res) => {
    // console.log(req.body);
    // console.log(req.file);
    // receive file using multir

    // upload image to server
    // then save url into DB
    
    const createData = {
        ...req.body,
        image: `/images/category/${req.file.filename}`,
    };
    await categoryMethods.create(createData);
    
    res.status(200).redirect("/categories");
}

const viewSingleCategoryById = async (req,res) => {
    const category_id = req.params.id;

    const category = await categoryMethods.getById(category_id);
    const products = await productMethods.getAll(
        {cat_id: category_id},
        {ref: "cat_id" , fields:["title"]});
    res.status(200).render("categories/view", { category, products });
}

const renderUpdateView = async (req,res) => {
    //get categories?
    const category_id = req.params.id;

    const category = await categoryMethods.getById(category_id);

    res.status(200).render("categories/update", {category});
}

const updateCategory = async (req,res) => {
    const category_id = req.params.id;
    const updateData = {...req.body};
    
    if(req.file){
        updateData.image = `/images/category/${req.file.filename}`
    }

    await categoryMethods.update(category_id, updateData);
    
    res.status(200).redirect("/categories");
}

const deleteCategory = async (req,res) => {
    const category_id = req.params.id;
    await categoryMethods.delete(category_id);
    
    //// delete
    await productModel.deleteMany({cat_id: category_id});
    //// replace
    // await productModel.updateMany({cat_id: category_id}, {cat_id: newCategoryId});

    res.status(200).redirect("/categories");
}

module.exports = {
    mainView,
    renderCreateView,
    createCategory,
    uploadMiddleware,
    viewSingleCategoryById,
    renderUpdateView,
    updateCategory,
    deleteCategory,
}