import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import '../../css/Lista.css';

const Lista = () => {
  return (
        <IonPage id="main-content" className="main-page">
          <IonHeader className="custom-header">
            <IonToolbar className="custom-toolbar">
            <IonTitle className="main-title">Lista de la compra</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent className="custom-content">
            <h1>Estás en la lista de la compra</h1>
          </IonContent>
        </IonPage>
  );
};

export default Lista;