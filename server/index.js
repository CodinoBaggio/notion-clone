const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
require('dotenv').config();

// MongoDB
// ユーザー：codinobaggio10
// パスワード：_XW5eE#*Dpk5UEb

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL, {});
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log('ローカルサーバー起動中...');
});
