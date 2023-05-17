import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React from 'react'
import '../../src/css/Favoritos.css';

const Favoritos = () => {
  return (
    <div>
      <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Favoritos</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <h1>holae stas en favoritos</h1>
    </IonContent>
  </IonPage>
    </div>
  )
}

export default Favoritos;
