import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React from 'react'
import '../../src/css/Buscador.css';

const Buscador = () => {
  return (
    <div>
      <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Buscador</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <h1>holae stas en el buscador</h1>
    </IonContent>
  </IonPage>
    </div>
  )
}

export default Buscador;
