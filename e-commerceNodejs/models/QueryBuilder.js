module.exports = class QueryBuilder {
    #queryObject; //query data we're going to query on
    #filters={};
    #Model;
    constructor(model, queryObject){
        this.#Model = model;
        this.#queryObject = queryObject;
        this.query = model.find(); //load data from model (DB) 
    }

    filter(filters) {
        this.#filters = { ...this.#filters, ...filters };
        this.query.find(this.#filters);
        return this;
    }

    mySearch() {
        const { search, search_field } = this.#queryObject;
        if (search && search_field) {
          this.#filters[search_field] = { $regex: search };
          this.query = this.query.find(this.#filters);
        }
        return this;
    }

    sort() {
        const { sort_by, sort_order } = this.#queryObject;
        if (sort_by) {
          this.query.sort({ [sort_by]: sort_order === "asc" ? 1 : -1 });
        }
        return this;
    }

    pagination() {
        const { page = 1, limit = 10 } = this.#queryObject;
        const skip = (page - 1) * limit;
        this.query.skip(skip).limit(limit);
        return this;
    }

    customizeFields() {
        const { fields } = this.#queryObject;
        if (fields) {
          const selectedFields = fields.split(",").join(" "); //"["title", "description"]"
          this.query.select(selectedFields);
        }
        return this;
    }

    async countAllPages() {
      try{
        const { limit = 10 } = this.#queryObject;
        const totalDocs = await this.#Model.countDocuments();
        return Math.ceil(totalDocs / limit);
      } catch (e) {
        throw e;
      }
    }

    populate(ref, fields) {
        //""
        if (ref) {
          this.query.populate(ref, fields);
        }
        return this;
    }

    async getAll() {
        // return await this.query; //original code
        try {
            return await this.query.exec();
          } catch (error) {
            // Handle error appropriately
            console.error("Error executing query:", error);
            throw error;
          }
    }
}