import React from 'react';
import ReactDOM from 'react-dom';
  // Si tienes estilos globales
import DistributedTransaction from './DistributedTransaction';  // El componente principal de la aplicación

// Renderiza el componente App dentro del div con id="root" en el archivo index.html
ReactDOM.render(
  <React.StrictMode>
    <DistributedTransaction />
  </React.StrictMode>,
  document.getElementById('root')
);
