import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
//* mui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
//* mui icon
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import MicrosoftIcon from '@mui/icons-material/Microsoft';
//* hooks
import { useAuthLDAP } from '@/hooks/useAuth';
//* components
import LoadingBackdrop from '@/components/common/LoadingBackdrop';
import Credit from '@/components/common/Credit';
import AuthBackground from '@/components/common/AuthBackground';
//* assets
import logo from '@/assets/images/dx.svg';
//* schemas
import { loginSchema, LoginType } from '@/pages/auth/Login/schema';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(['username', 'password']);

  const { mutate, data: authData, status, isPending } = useAuthLDAP();

  const handleOnSubmit: SubmitHandler<LoginType> = (data) => {
    if (getValues('remember')) {
      setCookie('username', getValues('username'), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    mutate({ ...data, mode: 'User' });
  };

  useEffect(() => {
    if (status === 'success') {
      setValue('password', '');

      if (authData?.data?.status) {
        navigate(`/${import.meta.env.VITE_BASE_URL}/`);
      }
    }
  }, [status]);

  return (
    <>
      <Box sx={{ minHeight: '100vh' }}>
        <AuthBackground />
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{
            minHeight: '100vh',
          }}
        >
          <Grid size={12} sx={{ pl: 3 }}>
            <Box className="w-10" component={'img'} src={logo}></Box>
          </Grid>
          <Grid
            size={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 112px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid sx={{ padding: 3 }} className="-mt-10">
              <Box
                component={'div'}
                className="flex flex-col gap-6 w-full p-10 md:w-[400px] bg-opacity-40 backdrop-blur-sm dark:bg-opacity-60 bg-gray-200 dark:bg-gray-700 shadow-xl rounded-md"
              >
                <Typography
                  sx={{ fontSize: 'clamp(18px,5vw,22px)' }}
                  className="text-center uppercase !font-bold"
                  color="text.secondary"
                  variant="h5"
                >
                  {import.meta.env.VITE_TITLE}
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit(handleOnSubmit)}
                  //noValidate
                >
                  <Controller
                    control={control}
                    name="username"
                    defaultValue={cookies?.username || ''}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          type="text"
                          fullWidth
                          margin="normal"
                          size="small"
                          placeholder="Username"
                          autoFocus
                          className="bg-white dark:bg-transparent"
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon />
                                </InputAdornment>
                              ),
                            },
                          }}
                          error={errors?.username?.message !== undefined}
                        />
                        <FormHelperText error>{(errors as any)?.username?.message}</FormHelperText>
                      </>
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    defaultValue={cookies?.password || ''}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          fullWidth
                          margin="normal"
                          size="small"
                          placeholder="Password"
                          className="bg-white dark:bg-transparent"
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              ),
                            },
                          }}
                          error={errors?.password?.message !== undefined}
                        />
                        <FormHelperText error>{(errors as any)?.password?.message}</FormHelperText>
                      </>
                    )}
                  />
                  <Box className="flex justify-between">
                    <Controller
                      control={control}
                      name="remember"
                      defaultValue={false}
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormControlLabel
                          label="Remember"
                          control={<Checkbox size="small" onChange={onChange} checked={value ?? false} {...field} />}
                        />
                      )}
                    />
                  </Box>
                  <Button
                    color="primary"
                    type="submit"
                    size="medium"
                    fullWidth
                    variant="contained"
                    startIcon={<LoginIcon className="-mt-1" />}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  {/* <Typography className="text-center">OR</Typography>
                  <Button color="inherit" type="submit" size="medium" fullWidth variant="contained" startIcon={<MicrosoftIcon className='-mt-1' />} sx={{ mt: 2 }}>
                    Microsoft Azure AD
                  </Button> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Credit />
        </Grid>
      </Box>
      <LoadingBackdrop isPending={isPending} />
    </>
  );
};

export default Login;
