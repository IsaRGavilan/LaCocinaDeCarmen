import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import '../../../css/cssCategorias/cssPlatosPrincipales/Pastas.css';

const Pastas = () => {
  return (
        <IonPage id="main-content" className="main-page">
          <IonHeader className="custom-header">
            <IonToolbar className="custom-toolbar">
            <IonTitle className="main-title">Pastas y arroces</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent className="custom-content">
            <h1>Estás en pastas</h1>
          </IonContent>
        </IonPage>
  );
};

export default Pastas;