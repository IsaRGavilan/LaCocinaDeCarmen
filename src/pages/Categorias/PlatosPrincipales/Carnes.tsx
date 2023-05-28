import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import '../../../css/cssCategorias/cssPlatosPrincipales/Carnes.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import RecipeCard from '../../../components/RecipeCard/RecipeCard';
import firebaseConfig from '../../../firebaseConfig';

const Carnes = () => {

  const [recipes, setRecipes] = useState<any[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<number[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const firestore = getFirestore(firebaseConfig.app);
        const recipesRef = collection(firestore, "recipes");
        const querySnapshot = await getDocs(recipesRef);
        const recipesData = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((recipe) => recipe.categoria === "Carnes");
        setRecipes(recipesData);
      } catch (error) {
        console.log("Error al obtener los documentos:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleFavoriteChange = (recipeId: number, isFavorite: boolean) => {
    if (isFavorite) {
      setFavoriteRecipes(prevState => [...prevState, recipeId]);
    } else {
      setFavoriteRecipes(prevState => prevState.filter(id => id !== recipeId));
    }
  };

  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Carnes</IonTitle>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent className="custom-content">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} isFavorite={favoriteRecipes.includes(recipe.id)} handleFavoriteChange={handleFavoriteChange}/>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Carnes;