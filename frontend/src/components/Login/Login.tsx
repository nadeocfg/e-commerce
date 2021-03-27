import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
} from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../../store/actions/userActions';

const Login = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChangeDialog = () => setIsOpen(!isOpen);

  const handleChange = (input: string) => (e: any) => {
    setForm({ ...form, [input]: e.target.value });
  };

  const handleLogin = () => {
    axios
      .post('/api/users/login', form)
      .then(({ data }) => {
        window.localStorage.setItem('token', data.token);
        dispatch(userActions.setUser(data));
        handleChangeDialog();
        dispatch(userActions.setAuthorized());
      })
      .catch((err) => {
        console.log({ ...err });
      });
  };

  return (
    <>
      <Button onClick={handleChangeDialog} variant="contained">
        Default
      </Button>

      <Dialog
        open={isOpen}
        onClose={handleChangeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Авторизация'}</DialogTitle>
        <DialogContent>
          <TextField
            value={form.email}
            label={'Email'}
            onChange={handleChange('email')}
          />
          <TextField
            value={form.password}
            label={'Password'}
            type="password"
            onChange={handleChange('password')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangeDialog} color="primary">
            Закрыть
          </Button>
          <Button onClick={handleLogin} color="primary" autoFocus>
            Войти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
