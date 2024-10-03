const dbSecure = process.env.DB_SECURE;
// const DB_URL = `mongodb+srv://${dbSecure}@e-commerce.nf0vn.mongodb.net/?retryWrites=true&w=majority&appName=e-commerce`;
// const DB_URL = `mongodb://${dbSecure}@rowad-ec-shard-00-00.wiz7q.mongodb.net:27017,rowad-ec-shard-00-01.wiz7q.mongodb.net:27017,rowad-ec-shard-00-02.wiz7q.mongodb.net:27017/?ssl=true&replicaSet=atlas-tpg2hf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=rowad-ec`;
const DB_URL = `mongodb://seif_gamal:sMBIzLKSxiTLgOfQ@rowad-ec-shard-00-00.wiz7q.mongodb.net:27017,rowad-ec-shard-00-01.wiz7q.mongodb.net:27017,rowad-ec-shard-00-02.wiz7q.mongodb.net:27017/e-commerce?ssl=true&replicaSet=atlas-tpg2hf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=rowad-ec`;
module.exports = DB_URL;