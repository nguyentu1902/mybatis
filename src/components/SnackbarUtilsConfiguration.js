import {useSnackbar} from 'notistack'

let useSnackbarRef;
export const SnackbarUtilsConfiguration = () => {
  useSnackbarRef = useSnackbar();
  return null;
};
const toast = (msg, options = { variant: "default" }) => {
  useSnackbarRef.enqueueSnackbar(msg, {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    }, ...options
  });
};
export const success = (msg, options = {}) => {
  toast(msg, {
    variant: "success", anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    }, ...options
  });
};
export const warning = (msg, options = {}) => {
  toast(msg, {
    variant: "warning", anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    }, ...options
  });
};
export const info = (msg, options = {}) => {
  toast(msg, {
    variant: "info", anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    }, ...options
  });
};
export const error = (msg, options = {}) => {
  toast(msg, {
    variant: "error", anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    }, ...options
  });
};


export default {
    success,
    warning,
    info,
    error,
    toast
}