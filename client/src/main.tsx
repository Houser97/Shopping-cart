import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ShoppingApp } from './ShoppingApp';
import { Provider } from 'react-redux'
import { persistor, store } from './presentation/store/store';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ShoppingApp />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)