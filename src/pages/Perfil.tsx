import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane } from '@ionic/react';
import React from 'react'
import '../../src/css/Perfil.css';
import SideMenu from '../components/Menu/SideMenu';

const Perfil = () => {
  return (
    <IonPage>
      <IonSplitPane contentId="main-content">
        <SideMenu />
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Perfil</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <h1>Estás en perfil</h1>
          </IonContent>
        </IonPage>
      </IonSplitPane>
      </IonPage>
  );
};

export default Perfil;
