import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import '../../src/css/Lista.css';

const Lista = () => {
  return (
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Lista</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <h1>Estás en la lista</h1>
          </IonContent>
        </IonPage>
  );
};

export default Lista;