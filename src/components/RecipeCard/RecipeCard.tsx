import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import firebaseConfig from '../../../../LaCocinaDeCarmen/src/firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Definir el tipo para la prop 'recipe'
interface RecipeCardProps {
    recipe: {
      imagen: string;
      nombre: string;
      categoria: string;
      dificultad: string;
      ingredientes: string[];
      preparacion: string[];
      tiempo: number;
      tipo: string;
    };
  }

// Componente para mostrar una tarjeta de receta
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <IonCard>
      <img alt="Silhouette of mountains" src={recipe.imagen} />
      <IonCardHeader>
        <IonCardTitle>{recipe.nombre}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{recipe.categoria}</IonCardContent>
    </IonCard>
  );
};

export default RecipeCard;