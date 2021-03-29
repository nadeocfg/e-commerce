import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { ProductModel } from '../../models/productModel';
import { SET_PRODUCTS } from '../storeConstants/productsConstants';
import { SET_SNACKBAR } from '../storeConstants/snackbarConstants';

export const getProducts = () => async (dispatch: Dispatch<any>) => {
  try {
    const response: Promise<AxiosResponse<ProductModel[]>> = axios.get(
      '/api/products'
    );
    const data: ProductModel[] = (await response).data;

    dispatch({
      type: SET_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_SNACKBAR,
      payload: {
        message:
          error.response && error.response.data
            ? error.response.data.message
            : 'Ошибка при загрузке товаров',
        type: 'error',
      },
    });
  }
};
