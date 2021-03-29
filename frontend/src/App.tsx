import './App.css';
import Home from './pages/Home';
import { Route, Switch } from 'react-router';
import NotFound from './pages/NotFound';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { snackbarModel } from './models/snackbarModel';

function App() {
  const snackbarStore: snackbarModel = useSelector(
    (state: any) => state.snackbarStore
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (snackbarStore.message) {
      enqueueSnackbar(snackbarStore.message, {
        variant: snackbarStore.type,
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
      });
    }
  }, [snackbarStore.message, snackbarStore.type, enqueueSnackbar]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
