import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ShoppingApp } from './ShoppingApp';
import { Provider } from 'react-redux'
import { store } from './presentation/store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ShoppingApp />
    </Provider>
  </React.StrictMode>,
)