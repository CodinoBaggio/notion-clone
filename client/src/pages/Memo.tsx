import React, { useEffect, useState } from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Box, IconButton, TextField } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMemo } from '../redux/features/memoSlice';
import { EmojiPicker } from '../components/common/EmojiPicker';

export const Memo = () => {
  const { memoId } = useParams<{ memoId: string }>();
  const [title, setTtile] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const memos = useSelector((state: any) => state.memo.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res: any = await memoApi.getOne(memoId);
        // console.log(res);
        if (!res) return;
        setTtile(res.title);
        setDescription(res.description);
        setIcon(res.icon);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getMemo();
  }, [memoId]);

  let timer: any;
  const timeout = 500;

  const updateTitle = async (e: any) => {
    clearTimeout(timer);

    const newTitle = e.target.value;
    setTtile(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId!, { title: newTitle });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  const updateDescription = async (e: any) => {
    clearTimeout(timer);

    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId!, { description: newDescription });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      await memoApi.delete(memoId!);
      const newMemos = memos.filter((memo: any) => memo._id !== memoId);
      if (newMemos.length === 0) {
        navigate('/memo');
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }

      dispatch(setMemo(newMemos));
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };

  const onIconChange = async (newIcon: any) => {
    let temp = [...memos];
    const index = temp.findIndex((memo: any) => memo._id === memoId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemo(temp));
    try {
      await memoApi.update(memoId!, { icon: newIcon });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          dislplay: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: ' 10px 50px' }}>
        <EmojiPicker icon={icon} onChange={onIconChange} />
        <Box>
          <TextField
            value={title}
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '.MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' },
            }}
            onChange={updateTitle}
          />
          <TextField
            value={description}
            placeholder="追加"
            variant="outlined"
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '.MuiOutlinedInput-root': { fontSize: '0,8rem' },
            }}
            onChange={updateDescription}
          />
        </Box>
      </Box>
    </>
  );
};
