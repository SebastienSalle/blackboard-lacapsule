const mongoose = require('mongoose')

const name = process.env.NAME;
const password = process.env.PASS_W;

const options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect(`mongodb+srv://${name}:${password}@cluster0.oyfjvw4.mongodb.net/blackboard`,
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose