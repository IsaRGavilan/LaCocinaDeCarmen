import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import '../../src/css/Perfil.css';

const Perfil = () => {
  return (
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Perfil</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <h1>Estás en el perfil</h1>
          </IonContent>
        </IonPage>
  );
};

export default Perfil;