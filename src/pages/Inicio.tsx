import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React from 'react'

const Inicio = () => {
  return (
    <div>
      <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Inicio</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <h1>holae stas en inicio</h1>
    </IonContent>
  </IonPage>
    </div>
  )
}

export default Inicio;
