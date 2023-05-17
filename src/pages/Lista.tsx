import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react'
import '../../src/css/Lista.css';
import SideMenu from '../components/Menu/SideMenu';

const Lista = () => {
  return (
      <IonSplitPane contentId="main-content">
        <SideMenu />
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Lista de la compra</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <h1>Estás en ls lista de la compra</h1>
          </IonContent>
        </IonPage>
      </IonSplitPane>
  );
};

export default Lista;
