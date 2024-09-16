module.exports = class ModelGeneric {
    
    #Model;
    constructor(model){
        this.#Model = model;
    }

    // Get all users with optional filters
    //{ref, fields}

    //config
    async getAll(
        filters = {},
        populateObj = { ref: "", fields: [] },
        sortBy = null,
        sortOrder = "asc",
        page,
        limit,
        fields
      ) {
        try{
            const query = this.#Model.find(filters);
        
            if (populateObj.ref) {
              query.populate(populateObj.ref, populateObj.fields);
            }
            if (sortBy) {
              query.sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });
            }
        
            if (page && limit) {
              //page => 11 , 15
              //20 / 5 = 4
              // page4 => 16, 20
              const skip = (page - 1) * limit;
              query.skip(skip).limit(limit);
            }
        
            if (fields) {
              //title,desc,price
              const selectedFields = fields.split(",").join(" "); //"["title", "desc"]"
              query.select(selectedFields);
            }
            return await query;
        }catch(err){
            throw err;
        }
      }

      async create(data, populateObj = { ref: "", fields: [] }) {
        try{
            const instance = new this.#Model(data); //now created an object in runtime but still not added to DB
            return await instance.save();   //save to DB + return newly created object
        }catch(err){
            throw err;
        }
    }
    
    async getById(id, populateObj = {ref: "", fields:[]}){
        try{
            const query = this.#Model.findById(id);
    
            if (populateObj.ref) {
              query.populate(populateObj.ref, populateObj.fields);
            }
            return await query;
        }catch(err){
            throw err;
        }
    }
    
    async update(id, data, populateObj = { ref: "", fields: [] }) {
        try{
            return await this.#Model.findByIdAndUpdate(id,data,{new:true});
        }
        catch(err){
            throw err;
        }
        // mongo by default adds date at which document created
        // new true here tells mongo to update the date
    }
    
    async delete(id){
        try{
            return await this.#Model.findByIdAndDelete(id);
        }
        catch(err){
            throw err;
        }
    }
    async getDoucmnetsCount() {
        try{
            return await this.#Model.countDocuments();
        }catch(err){
            throw err;
        }
    }
};