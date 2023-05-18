import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/react';
import React from 'react';
import '../../../css/cssCategorias/cssCocinaTipica/Catalunya.css';

const Catalunya = () => {
  return (
        <IonPage id="main-content" className="main-page">
          <IonHeader className="custom-header">
            <IonToolbar className="custom-toolbar">
            <IonTitle className="main-title">Cataluña</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent className="custom-content">
            <h1>Estás en cataluña</h1>
          </IonContent>
        </IonPage>
  );
};

export default Catalunya;