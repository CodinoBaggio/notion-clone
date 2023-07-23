import { LogoutOutlined, AddBoxOutlined } from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import assets from '../../assets/images';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import memoApi from '../../api/memoApi';
import { setMemo } from '../../redux/features/memoSlice';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);
  const memos = useSelector((state: any) => state.memo.value);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        console.log(res);
        dispatch(setMemo(res));
        console.log(memos);
      } catch (error) {
        alert(error);
      }
    };
    getMemos();
  }, []);

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: '100vh' }}
    >
      <List
        sx={{
          width: 250,
          height: '100vh',
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={handleLogout}>
              <LogoutOutlined />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: '20px' }}
          component={Link}
          to="/memo/12073864"
        >
          <Typography>✍仮置きのmemo</Typography>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: '20px' }}
          component={Link}
          to="/memo/12073864"
        >
          <Typography>✍仮置きのmemo</Typography>
        </ListItemButton>
        <ListItemButton
          sx={{ pl: '20px' }}
          component={Link}
          to="/memo/12073864"
        >
          <Typography>✍仮置きのmemo</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};
