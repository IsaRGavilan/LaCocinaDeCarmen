import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import '../../../css/cssCategorias/cssCocinaTipica/Aragon.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../../../firebaseConfig';
import RecipeCard from '../../../components/RecipeCard/RecipeCard';

const Aragon = () => {

  const [recipes, setRecipes] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<{ [recipeId: string]: boolean }>({});

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const firestore = getFirestore(firebaseConfig.app);
        const recipesRef = collection(firestore, "recipes");
        const querySnapshot = await getDocs(recipesRef);
        const recipesData = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((recipe) => recipe.categoria === "Aragon");
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
            <IonTitle className="main-title">Aragón</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
            <IonContent className="custom-content">
                  {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} isFavorite={favorites[recipe.id] || false}/>
                  ))}
            </IonContent>
        </IonPage>
  );
};

export default Aragon;