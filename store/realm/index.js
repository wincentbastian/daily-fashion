const Realm = require("realm");
const { ProductSchema } = require("./ProductSchema");
const { TrainingSchema } = require("./TrainingSchema")

const realm = new Realm({
    schema: [TrainingSchema]
})

export default realm