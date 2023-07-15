const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '名前を入力してください'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'パスワードを入力してください'],
  },
});

module.exports = mongoose.model('User', userSchema);
