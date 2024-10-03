const categoryModel = require("../../models/Category.js");
const GenricMethods = require("../../models/generic.js");
const AppError =  require("../../utilities/appError.js");
const asyncCatch =  require("../../utilities/asyncCatch.js");
const QueryBuilder = require("../../models/QueryBuilder.js");

const categoryMethods = new GenricMethods(categoryModel);

const getAllCategories = asyncCatch(async (req,res) => {   

    const query = new QueryBuilder(categoryModel, req.query);
    const categories = await query.getAll();
    // const categories = await categoryMethods.getAll();
    res.status(200).json({
        status: "success",
        count: categories.length,
        categories: categories,
    });
});

module.exports = {
    getAllCategories,
}