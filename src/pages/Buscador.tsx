import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import '../../src/css/Buscador.css';

const Buscador = () => {
  return (
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Buscador</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <h1>Estás en el buscador</h1>
          </IonContent>
        </IonPage>
  );
};

export default Buscador;