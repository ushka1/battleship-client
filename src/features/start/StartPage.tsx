import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { socket } from 'services/socket';

export default function StartPage() {
  const { t } = useTranslation();
  const [username, setUsername] = useState(
    `user-${Math.floor(Math.random() * 100000)}`,
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('Emiting user-join event.');
    socket.emit('user-join', { username });
  };

  useEffect(() => {
    const handler = (response: unknown) => {
      console.log(response);
    };

    socket.on('user-join', handler);

    return () => {
      socket.off('user-join', handler);
    };
  }, []);

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <Typography variant='h1' mb={8}>
        {t('start-page.title')}
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label={t('start-page.text')}
          inputProps={{
            inputMode: 'text',
            minLength: 1,
            maxLength: 32,
          }}
          InputProps={{
            endAdornment: (
              <IconButton type='submit'>
                <ArrowForwardIcon />
              </IconButton>
            ),
          }}
        ></TextField>
      </form>
    </Box>
  );
}
