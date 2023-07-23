import { Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

export const Register = () => {
  const navigate = useNavigate();

  const [userErrText, setUserErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserErrText('');
    setPasswordErrText('');
    setConfirmPasswordErrText('');

    const data = new FormData(e.target as HTMLFormElement);
    const username = data.get('username');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    let hasError = false;
    if (!username) {
      hasError = true;
      setUserErrText('お名前を入力してください');
    }
    if (!password) {
      hasError = true;
      setPasswordErrText('パスワードを入力してください');
    }
    if (!confirmPassword) {
      hasError = true;
      setConfirmPasswordErrText('確認用パスワードを入力してください');
    }
    if (password !== confirmPassword) {
      hasError = true;
      setConfirmPasswordErrText('パスワードが一致しません');
    }

    if (hasError) {
      return;
    }

    // 新規登録APIを叩く
    try {
      setLoading(true);

      const res: any = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      localStorage.setItem('token', res.token);
      console.log('新規登録に成功しました');
      navigate('/');
    } catch (err: any) {
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((error: any) => {
        if (error.path === 'username') {
          setUserErrText(error.msg);
        }
        if (error.path === 'password') {
          setPasswordErrText(error.msg);
        }
        if (error.path === 'confirmPassword') {
          setConfirmPasswordErrText(error.msg);
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={userErrText}
          error={userErrText !== ''}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ''}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          helperText={confirmPasswordErrText}
          required
          error={confirmPasswordErrText !== ''}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントをお持ちの方はこちら
      </Button>
    </>
  );
};
