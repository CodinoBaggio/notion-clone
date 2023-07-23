import { Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

export const Login = () => {
  const navigate = useNavigate();

  const [userErrText, setUserErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserErrText('');
    setPasswordErrText('');

    const data = new FormData(e.target as HTMLFormElement);
    const username = data.get('username');
    const password = data.get('password');

    let hasError = false;
    if (!username) {
      hasError = true;
      setUserErrText('お名前を入力してください');
    }
    if (!password) {
      hasError = true;
      setPasswordErrText('パスワードを入力してください');
    }

    if (hasError) {
      return;
    }

    // 新規登録APIを叩く
    try {
      setLoading(true);

      const res: any = await authApi.login({
        username,
        password,
      });
      localStorage.setItem('token', res.token);
      console.log('ログインに成功しました');
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
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていない方はこちら
      </Button>
    </>
  );
};
