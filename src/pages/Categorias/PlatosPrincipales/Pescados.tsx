import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import '../../../css/cssCategorias/cssPlatosPrincipales/Pescados.css';
import RecipeCard from '../../../components/RecipeCard/RecipeCard';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../../../firebaseConfig';

const Pescados = () => {

  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const firestore = getFirestore(firebaseConfig.app);
        const recipesRef = collection(firestore, "recipes");
        const querySnapshot = await getDocs(recipesRef);
        const recipesData = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((recipe) => recipe.categoria === "Pescados");
        setRecipes(recipesData);
      } catch (error) {
        console.log("Error al obtener los documentos:", error);
      }
    };

    fetchRecipes();
  }, []);
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Pescados</IonTitle>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent className="custom-content">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Pescados;