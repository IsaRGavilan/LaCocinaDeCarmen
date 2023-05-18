import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import '../../css/cssCategorias/CocinaTipica.css';

const CocinaTipica = () => {
  return (
        <IonPage id="main-content" className="main-page">
          <IonHeader className="custom-header">
            <IonToolbar className="custom-toolbar">
            <IonTitle className="main-title">Cocina Típica Española</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent className="custom-content">
            <h1>Estás en cocina tipica</h1>
          </IonContent>
        </IonPage>
  );
};

export default CocinaTipica;