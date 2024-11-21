const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const BookSchema = new mongoose.Schema({
  user:{
    type: ObjectId,
    ref: 'user'
},
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('book', BookSchema);
