const Realm = require("realm");
const { ProductSchema } = require("./ProductSchema");

const realm = new Realm({
    schema: [ProductSchema]
})

export default realm