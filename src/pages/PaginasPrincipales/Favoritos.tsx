import { useEffect, useState } from 'react'; //Importa el hook useEffect y useState de React
//Importa componentes Ionic
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/react';
import firebaseConfig from '../../firebaseConfig'; //Importa la configuración de Firebase
import { collection, getDocs, doc, getDoc, getFirestore } from 'firebase/firestore'; //Importa funciones para manipular documentos de firestore
import { getAuth } from 'firebase/auth'; //Importa función de autenticación de Firebase
import RecipeCard from '../../components/RecipeCard/RecipeCard'; //Importa componente RecipeCard
import '../../css/cssGenerales/Favoritos.css'; //Importa archivo de estilos

const Favoritos = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<number[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const auth = getAuth(firebaseConfig.app);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchFavoriteRecipes = async () => {
        try {
          const userRef = doc(firebaseConfig.firestore, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            if (userData && Array.isArray(userData.favoriteRecipes)) {
              setFavoriteRecipes(userData.favoriteRecipes);
            }
          }
        } catch (error) {
          console.error('Error fetching favorite recipes:', error);
        }
      };

      fetchFavoriteRecipes();
    }
  }, [user]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const firestore = getFirestore(firebaseConfig.app);
        const recipesRef = collection(firestore, 'recipes');
        const querySnapshot = await getDocs(recipesRef);
        const recipesData = querySnapshot.docs.map((doc) => doc.data());
        setRecipes(recipesData);
      } catch (error) {
        console.log('Error al obtener los documentos:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleFavoriteChange = (recipeId: number, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavoriteRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe !== recipeId));
    }
  };

  const favoriteRecipesData = recipes.filter((recipe) => favoriteRecipes.includes(recipe.id));
  
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Favoritos</IonTitle>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent id="contentFavoritos">
        <h1 className="h1">Mis recetas favoritas</h1>
        {favoriteRecipesData.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={true}
            handleFavoriteChange={handleFavoriteChange}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Favoritos;