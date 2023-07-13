const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '名前を入力してください'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'メールアドレスを入力してください'],
  },
});

module.exports = mongoose.model('User', userSchema);
