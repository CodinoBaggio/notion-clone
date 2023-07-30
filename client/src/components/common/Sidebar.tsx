import { LogoutOutlined, AddBoxOutlined } from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import assets from '../../assets/images';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import memoApi from '../../api/memoApi';
import { setMemo } from '../../redux/features/memoSlice';

export const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
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
        dispatch(setMemo(res));
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    console.log(memos);
  }, [memos]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e: any) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, [navigate]);

  const addMemo = async () => {
    try {
      const res: any = await memoApi.create();
      dispatch(setMemo([res, ...memos]));
      navigate(`/memo/${res._id}`);
    } catch (error) {
      alert(error);
    }
  };

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
            <IconButton onClick={addMemo}>
              <AddBoxOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((memo: any, index: number) => {
          return (
            <ListItemButton
              key={memo._id}
              sx={{ pl: '20px' }}
              component={Link}
              to={`/memo/${memo._id}`}
              selected={index === activeIndex}
            >
              <Typography>
                {memo.icon} {memo.title}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};
