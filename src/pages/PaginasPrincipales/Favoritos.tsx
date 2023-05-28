import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import '../../css/cssGenerales/Favoritos.css';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, where, query as firestoreQuery, query } from 'firebase/firestore';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import firebaseConfig from '../../firebaseConfig';

interface User {
  id: string;
  nombre: string;
  apellido: string;
  avatar: string;
  email: string;
  telefono: string;
  username: string;
  favoriteRecipes: number[];
}

const Favoritos = () => {

  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const auth = getAuth(firebaseConfig.app);
        const user = auth.currentUser;
      
        if (user) {
          const userRef = doc(firebaseConfig.firestore, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);
          
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data() as User;
            const userFavoriteRecipes = userData.favoriteRecipes;
      
            const recipesRef = collection(firebaseConfig.firestore, 'recipes');
            const firestoreQuery = query(recipesRef, where('recipeId', 'in', userFavoriteRecipes));
            const querySnapshot = await getDocs(firestoreQuery);
      
            const favoriteRecipesData: any[] = [];
            querySnapshot.forEach((doc) => {
              const recipeData = doc.data();
              favoriteRecipesData.push(recipeData);
            });
      
            setFavoriteRecipes(favoriteRecipesData);
          }
        }
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
      
    };
  
    fetchFavoriteRecipes();
  }, []);

  console.log(favoriteRecipes);

  return (
    <IonPage id="main-content" className="main-page">
    <IonHeader className="custom-header">
      <IonToolbar className="custom-toolbar">
        <IonTitle className="main-title">Buscador</IonTitle>
        <IonMenuButton slot="start" />
      </IonToolbar>
    </IonHeader>
    <IonContent className="custom-content">
      <h1>Estás en favoritos</h1>
      {favoriteRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </IonContent>
  </IonPage>
  );
};

export default Favoritos;