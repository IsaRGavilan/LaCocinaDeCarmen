import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React from 'react'
import '../../src/css/Lista.css';

const Lista = () => {
  return (
    <div>
      <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Lista</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <h1>holae stas en la lista de la compra</h1>
    </IonContent>
  </IonPage>
    </div>
  )
}

export default Lista;
