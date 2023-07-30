import { Box, Typography } from '@mui/material';
import React, { FC, useState, useEffect } from 'react';
import Picker from '@emoji-mart/react';

export const EmojiPicker: FC<{ icon: any; onChange: any }> = ({
  icon,
  onChange,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState('' as any);
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  const showPicker = () => {
    setIsShowPicker(!isShowPicker);
  };

  const selectEmoji = (e: any) => {
    const emojiCode = e.unified.split('-');
    let codesArray: any[] = [];
    emojiCode.forEach((el: any) => codesArray.push('0x' + el));
    const emoji = String.fromCodePoint(...codesArray);
    console.log(emoji);
    setIsShowPicker(false);
    onChange(emoji);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: 'pointer' }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? 'display' : 'none',
          position: 'absolute',
          zIndex: 100,
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};
