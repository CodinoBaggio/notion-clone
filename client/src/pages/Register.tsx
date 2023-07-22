import { Box, TextField, Button } from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <>
      <Box>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
        />
        <TextField
          fullWidth
          id="condirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="condirmPassword"
          type="password"
          required
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
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
