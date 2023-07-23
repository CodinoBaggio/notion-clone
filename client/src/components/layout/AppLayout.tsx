import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import { Sidebar } from '../common/Sidebar';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';

export const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // JWTを持っているのか確認する
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        dispatch(setUser(user));
        // console.log(user);
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};
