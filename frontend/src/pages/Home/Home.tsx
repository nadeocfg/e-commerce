import './Home.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../store/actions/productsActions';
import { SET_SNACKBAR } from '../../store/storeConstants/snackbarConstants';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Home page</h1>

      <button
        onClick={() =>
          dispatch({
            type: SET_SNACKBAR,
            payload: {
              message: 'test',
              type: 'error',
            },
          })
        }
      >
        error
      </button>

      <button
        onClick={() =>
          dispatch({
            type: SET_SNACKBAR,
            payload: {
              message: 'test 1',
              type: 'success',
            },
          })
        }
      >
        success
      </button>

      <button
        onClick={() =>
          dispatch({
            type: SET_SNACKBAR,
            payload: {
              message: 'test 1',
              type: 'warning',
            },
          })
        }
      >
        warning
      </button>
    </>
  );
}

export default Home;
