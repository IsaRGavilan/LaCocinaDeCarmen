import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import SideMenu from '../../src/components/Menu/SideMenu';
import '../../src/css/Buscador.css';

const Buscador = () => {
  return (
      <IonSplitPane contentId="main-content">
        <SideMenu />
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
      </IonSplitPane>
  );
};

export default Buscador;