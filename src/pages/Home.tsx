import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React from 'react'

const Home = () => {
  return (
    <div>
      <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <h1>holae stas en el home</h1>
    </IonContent>
  </IonPage>
    </div>
  )
}

export default Home;
