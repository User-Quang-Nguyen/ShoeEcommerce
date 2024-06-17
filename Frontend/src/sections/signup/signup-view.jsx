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

import { Signup } from 'src/api/signup';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import FilledAlerts from 'src/components/notification/alter-view';


// ----------------------------------------------------------------------

export default function SignupView() {
  const theme = useTheme();

  const router = useRouter();

  const [signupError, setSignupError] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSignupError(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [signupError]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const formData = {
        "name": name,
        "email": email,
        "password": password
    }
    try {
        const result = await Signup(formData);
        if (result.data.state === true) {
            setIsSignedUp(true);
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        }else{
            setSignupError(true);
        }
    } catch (error) {
        setSignupError(true);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField 
          name="name" 
          label="Họ và tên" 
          value={name} 
          onChange={handleNameChange} />

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

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        sx = {{mt : 3}}
      >
        Đăng ký
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
          <Typography variant="h4">Đăng ký</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Bạn đã có tài khoản ?
            <Link href = "/login"  variant="subtitle2" sx={{ ml: 0.5 }}>
              Đăng nhập
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
          {signupError && (
            <FilledAlerts severity="error" content="Đăng ký thất bại"/>
          )}
          {isSignedUp && (
              <FilledAlerts severity="success" content="Đăng ký thành công"/>
            )}
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
