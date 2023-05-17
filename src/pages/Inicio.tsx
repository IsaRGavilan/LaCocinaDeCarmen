import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react';
import SideMenu from '../../src/components/Menu/SideMenu';
import '../../src/css/Inicio.css';

const Inicio = () => {
  return (
      <IonSplitPane contentId="main-content">
        <SideMenu />
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Página principal</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <h1>Estás en el inicio</h1>
          </IonContent>
        </IonPage>
      </IonSplitPane>
  );
};

export default Inicio;