import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import '../../cssCategorias/PlatosPrincipales.css';

const PlatosPrincipales = () => {
  return (
        <IonPage id="main-content" className="main-page">
          <IonHeader className="custom-header">
            <IonToolbar className="custom-toolbar">
            <IonTitle className="main-title">Platos principales</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent className="custom-content">
            <h1>Estás en platos principales</h1>
          </IonContent>
        </IonPage>
  );
};

export default PlatosPrincipales;