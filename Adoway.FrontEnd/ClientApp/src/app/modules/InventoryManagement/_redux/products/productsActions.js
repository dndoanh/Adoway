import * as requestFromServer from "./productsCrud";
import {productsSlice, callTypes} from "./productsSlice";

const {actions} = productsSlice;

export const fetchProducts = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProducts(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.productsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find products";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAllProducts = dispatch => {
    debugger;
    return requestFromServer
        .getAllProducts()
        .then(response => {
            const workplaces = response.data;
            dispatch(actions.allProductsFetched(workplaces));
        })
        .catch(error => {
            error.clientMessage = "Can't find Owners";
        });
};
export const selectProduct = id => dispatch => {
    dispatch(actions.productSelected({ id: id }));
};

export const createProduct = productForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createProduct(productForCreation)
    .then(response => {
      const product = response.data;
      dispatch(actions.productCreated({ product }));
    })
    .catch(error => {
      error.clientMessage = "Can't create product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProduct = product => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProduct(product)
    .then(() => {
        dispatch(actions.productUpdated({ product }));
    })
    .catch(error => {
      error.clientMessage = "Can't update product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteProduct = id => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .deleteProduct(id)
        .then(response => {
            dispatch(actions.productDeleted({ id }));
        })
        .catch(error => {
            error.clientMessage = "Can't delete product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};