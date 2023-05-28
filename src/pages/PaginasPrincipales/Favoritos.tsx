import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import '../../css/cssGenerales/Favoritos.css';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { getAuth } from 'firebase/auth';

const Favoritos = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);

  const handleFavoriteChange = (recipeId: number, isFavorite: boolean) => {
    if (isFavorite) {
      setFavoriteRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
    }
  };

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const auth = getAuth(firebaseConfig.app);
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(firebaseConfig.firestore, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();

            if (userData && Array.isArray(userData.favoriteRecipes)) {
              const favoriteRecipeIds = userData.favoriteRecipes;

              // Obtener las recetas favoritas desde Firestore
              const recipesCollection = collection(firebaseConfig.firestore, 'recipes');
              const favoriteRecipesSnapshot = await getDocs(recipesCollection);

              const favoriteRecipesData = favoriteRecipesSnapshot.docs
                .filter((recipeDoc) => favoriteRecipeIds.includes(recipeDoc.id))
                .map((recipeDoc) => ({
                  id: recipeDoc.id,
                  ...recipeDoc.data(),
                }));

              setFavoriteRecipes(favoriteRecipesData);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    };

    fetchFavoriteRecipes();
  }, []);
  
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Favoritos</IonTitle>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent className="custom-content">
        <h1 className="h1">Mis recetas favoritas</h1>
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favoriteRecipes.includes(recipe.id)}
              handleFavoriteChange={handleFavoriteChange}
            />
          ))
        ) : (
          <p>No tienes recetas favoritas.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Favoritos;