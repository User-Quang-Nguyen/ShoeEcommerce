import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { setAuthToken } from 'src/utils/jwt';

import { login } from 'src/api/login';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import FilledAlerts from 'src/components/notification/alter-view';


// ----------------------------------------------------------------------

export default function LoginView() {
  const [loginError, setLoginError] = useState(false);
  const [message, setMessage] = useState('Đăng nhập thất bại!');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoginError(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [loginError]);

  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const formData = {
      "email": email,
      "password": password
    }
    try{
     const result = await login(formData); 

     if(result.data.state === false){
      setLoginError(true);
      setMessage(result.data.message);
     }

     if(result.data.state === true){
      const {token} = result.data;
      console.log(result.data);
      setAuthToken(token)

      const {role} = result.data.result;
      if(role === 1){
        router.push('/');
      }else if(role === 0){
        router.push('/');
      }else{
        router.push('/404');
      }
    }

    }catch(err){
      setLoginError(true);
      setMessage(result.data.message);
      console.log(err);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField 
          name="email" 
          label="Email" 
          value={email} 
          onChange={handleEmailChange} />

        <TextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Đăng nhập
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Đăng nhập</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Bạn chưa có tài khoản ?
            <Link href = "/signup" variant="subtitle2" sx={{ ml: 0.5 }}>
              Đăng ký
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {loginError && (
            <FilledAlerts severity="error" content={message}/>
          )}
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
