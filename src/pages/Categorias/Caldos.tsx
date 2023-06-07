import React, { useEffect, useState } from 'react'; //Importa el hook useEffect y useState de React
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/react'; //Importa componentes Ionic
import firebaseConfig from '../../firebaseConfig'; //Importa la configuración de Firebase
import { getFirestore, collection, getDocs } from 'firebase/firestore'; //Importa funciones para manipular documentos de firestore
import RecipeCard from '../../components/RecipeCard/RecipeCard'; //Importa componente RecipeCard

const Caldos = () => {

  const [recipes, setRecipes] = useState<any[]>([]); //Almacena array de recetas y actualiza su estado
  const [favoriteRecipes, setFavoriteRecipes] = useState<number[]>([]); //Almacena las recetas favoritas y actualiza su estado

  useEffect(() => {
    //Obtenemos las recetas desde Firestore al cargar el componente
    const fetchRecipes = async () => {
      try {
        const firestore = getFirestore(firebaseConfig.app); //Obtener instancia de Firestore
        const recipesRef = collection(firestore, "recipes"); //Obtener referencia a la colección "recipes"
        const querySnapshot = await getDocs(recipesRef); //Obtener los documentos de la colección
        const recipesData = querySnapshot.docs
          .map((doc) => doc.data()) //Obtener los datos de los documentos
          .filter((recipe) => recipe.categoria === "Caldos" || recipe.categoria === "Salsas"); //Filtrar las recetas por categoría
        setRecipes(recipesData); //Actualizar el estado con las recetas obtenidas
      } catch (error) {
        console.log("Error al obtener los documentos:", error);
      }
    };
    fetchRecipes();
  }, []);

  //Manejar cambios en las recetas favoritas
  const handleFavoriteChange = (recipeId: number, isFavorite: boolean) => {
    if (isFavorite) {
      setFavoriteRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe !== recipeId));
    } else {
      setFavoriteRecipes((prevRecipes) => [...prevRecipes, recipeId]);
    }
  };

  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">{/*Header del componente que incluye el menú desplegable*/}
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Caldos y salsas</IonTitle>{/*Título del componente*/}
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent id="contentGeneral">{/*Contenido del componente con un mapa de recetas filtradas*/}
      {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favoriteRecipes.includes(recipe.id)}
            handleFavoriteChange={handleFavoriteChange}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Caldos;