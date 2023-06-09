import React, { useEffect, useState } from 'react'; //Importa el hook useEffect y useState de React
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/react'; //Importa componentes Ionic
import firebaseConfig from '../../../firebaseConfig'; //Importa la configuración de Firebase
import { getFirestore, collection, getDocs } from 'firebase/firestore'; //Importa funciones para manipular documentos de firestore
import RecipeCard from '../../../components/RecipeCard/RecipeCard'; //Importa componente RecipeCard
import '../../../css/cssCategorias/CocinaTipica.css'; //Importa archivo de estilos

const Cantabria = () => {
 
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
          .filter((recipe) => recipe.provincia === "Cantabria"); //Filtrar las recetas por provincia
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
      setFavoriteRecipes(prevState => [...prevState, recipeId]);
    } else {
      setFavoriteRecipes(prevState => prevState.filter(id => id !== recipeId));
    }
  };

  return (
        <IonPage id="main-content" className="main-page">
          <IonHeader className="custom-header"> {/*Header del componente que incluye el menú desplegable*/}
            <IonToolbar className="custom-toolbar">
            <IonTitle className="main-title">Cantabria</IonTitle> {/*Título del componente*/}
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <div id='contentCantabria'> {/*Contenido del componente con un mapa de recetas filtradas*/}
            <IonContent id="contentCantabria">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favoriteRecipes.includes(recipe.id)}
                handleFavoriteChange={handleFavoriteChange}
              />
            ))}
            </IonContent>
          </div>
        </IonPage>
  );
};

export default Cantabria;