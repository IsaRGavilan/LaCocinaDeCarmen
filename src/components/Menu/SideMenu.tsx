import React from 'react';
import { IonMenu, IonContent, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { home, heart, search, cart, person } from 'ionicons/icons';
import './SideMenu.css';

const SideMenu = () => {
  
  return (
    <IonMenu side="start" contentId="main-content">
      <IonContent>
        <IonList className="menu-list">
          <IonItem routerLink="/inicio" routerDirection="forward" className="menu-item">
            <IonIcon slot="start" icon={home} className="menu-icon" />
            <IonLabel className="menu-label">Página principal</IonLabel>
          </IonItem>
          <IonItem routerLink="/favoritos" routerDirection="forward" className="menu-item">
            <IonIcon slot="start" icon={heart} className="menu-icon" />
            <IonLabel className="menu-label">Favoritos</IonLabel>
          </IonItem>
          <IonItem routerLink="/buscador" routerDirection="forward" className="menu-item">
            <IonIcon slot="start" icon={search} className="menu-icon" />
            <IonLabel className="menu-label">Buscador</IonLabel>
          </IonItem>
          <IonItem routerLink="/lista" routerDirection="forward" className="menu-item">
            <IonIcon slot="start" icon={cart} className="menu-icon" />
            <IonLabel className="menu-label">Lista de la compra</IonLabel>
          </IonItem>
          <IonItem routerLink="/perfil" routerDirection="forward" className="menu-item">
            <IonIcon slot="start" icon={person} className="menu-icon" />
            <IonLabel className="menu-label">Perfil</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;