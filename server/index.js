const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// MongoDB
// ユーザー：codinobaggio10
// パスワード：_XW5eE#*Dpk5UEb

// DB接続
try {
  mongoose.connect(
    'mongodb+srv://codinobaggio10:_XW5eE#*Dpk5UEb@cluster0.ulwo753.mongodb.net/?retryWrites=true&w=majority',
    {}
  );
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log('ローカルサーバー起動中...');
});
