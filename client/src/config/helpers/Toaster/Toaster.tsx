import { Toaster as ToasterSonner, toast as toastSonner } from 'sonner';
import './Toaster.css';

export enum ToastTypes {
  ERROR = 'error',
  NORMAL = 'normal',
}


export const Toaster = () => {
  return (
    <ToasterSonner
      toastOptions={{
        className: 'toaster'
      }}
    />
  )
}

export const toast = (message: string, type: ToastTypes) => {
  if (type === ToastTypes.ERROR) {
    return toastSonner.error(message)
  }
  return toastSonner(message)
};
