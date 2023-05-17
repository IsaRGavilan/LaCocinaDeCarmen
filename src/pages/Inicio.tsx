import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import '../../src/css/Inicio.css';

const Inicio = () => {
  return (
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Página principal</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <h1>Estás en el inicio</h1>
          </IonContent>
        </IonPage>
  );
};

export default Inicio;