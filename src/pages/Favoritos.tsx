import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import '../../src/css/Favoritos.css';

const Favoritos = () => {
  return (
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Favoritos</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <h1>Estás en favoritos</h1>
          </IonContent>
        </IonPage>
  );
};

export default Favoritos;