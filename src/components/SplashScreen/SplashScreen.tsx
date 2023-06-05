import React, { useEffect } from 'react';
import './SplashScreen.css'; //Importa archivo de estilos

const SplashScreen = () => {
  useEffect(() => {
    //Simula un tiempo de carga de 4 segundos
    setTimeout(() => {
    }, 4000);
  }, []);

  return (
    <div className="splash-screen"/>
  );
};

export default SplashScreen;