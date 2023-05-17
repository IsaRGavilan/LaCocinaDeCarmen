import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { home, heart, search, cart, person } from 'ionicons/icons';
import './SideMenu.css';

const SideMenu = () => {
  return (
    <IonMenu side="start" contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menú</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/inicio" routerDirection="none">
            <IonIcon slot="start" icon={home} />
            <IonLabel>Inicio</IonLabel>
          </IonItem>
          <IonItem routerLink="/favoritos" routerDirection="none">
            <IonIcon slot="start" icon={heart} />
            <IonLabel>Favoritos</IonLabel>
          </IonItem>
          <IonItem routerLink="/buscador" routerDirection="none">
            <IonIcon slot="start" icon={search} />
            <IonLabel>Buscador</IonLabel>
          </IonItem>
          <IonItem routerLink="/lista" routerDirection="none">
            <IonIcon slot="start" icon={cart} />
            <IonLabel>Lista de la compra</IonLabel>
          </IonItem>
          <IonItem routerLink="/perfil" routerDirection="none">
            <IonIcon slot="start" icon={person} />
            <IonLabel>Perfil</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;