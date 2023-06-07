import { useEffect, useState } from 'react'; //Importa el hook useEffect y useState de React
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/react'; //Importa componentes Ionic
import firebaseConfig from '../../firebaseConfig'; //Importa la configuración de Firebase
import { collection, getDocs, doc, getDoc, getFirestore } from 'firebase/firestore'; //Importa funciones para manipular documentos de firestore
import { getAuth } from 'firebase/auth'; //Importa función de autenticación de Firebase
import RecipeCard from '../../components/RecipeCard/RecipeCard'; //Importa componente RecipeCard
import '../../css/cssGenerales/Favoritos.css'; //Importa archivo de estilos

const Favoritos = () => {
  const [recipes, setRecipes] = useState<any[]>([]); //Almacena array de recetas y actualiza su estado
  const [favoriteRecipes, setFavoriteRecipes] = useState<number[]>([]); //Almacena las recetas marcadas como favoritas y actualiza su estado
  const auth = getAuth(firebaseConfig.app); //Obtiene la instancia de autenticación de Firebase
  const user = auth.currentUser; //Obtiene el usuario autenticado actualmente

  //Carga las recetas desde Firestore al detectar al usuario autenticado
  useEffect(() => {
    if (user) {
      const fetchFavoriteRecipes = async () => {
        try {
          const userRef = doc(firebaseConfig.firestore, 'users', user.uid); //Obtiene la referencia del documento del usuario actual
          const userSnapshot = await getDoc(userRef); //Obtiene el documento del usuario

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data(); //Obtiene los datos del documento del usuario
            if (userData && Array.isArray(userData.favoriteRecipes)) {
              setFavoriteRecipes(userData.favoriteRecipes); //Actualiza el estado de las recetas favoritas con los datos del usuario
            }
          }
        } catch (error) {
          console.error('Error al obtener recetas favoritas:', error);
        }
      };
      fetchFavoriteRecipes();
    }
  }, [user]); //Se ejecuta cuando cambia el usuario autenticado

  //Carga las recetas desde Firestore al montar el componente
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const firestore = getFirestore(firebaseConfig.app); //Obtiene la instancia de Firestore de Firebase
        const recipesRef = collection(firestore, 'recipes'); //Obtiene una referencia a la colección de recetas
        const querySnapshot = await getDocs(recipesRef); //Obtiene los documentos de la colección de recetas
        const recipesData = querySnapshot.docs.map((doc) => doc.data()); //Mapea los documentos obtenidos a un array de datos de recetas
        setRecipes(recipesData); //Actualiza el estado de las recetas con los datos obtenidos
      } catch (error) {
        console.log('Error al obtener los documentos:', error);
      }
    };
    fetchRecipes();
  }, []); //Se ejecuta una vez al cargar el componente

  const handleFavoriteChange = (recipeId: number, isFavorite: boolean) => {
    if (!isFavorite) {
      //Elimina la receta de los favoritos si ya no está marcada como favorita
      setFavoriteRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe !== recipeId));
    }
  };

  //Filtra las recetas favoritas según las recetas marcadas
  const favoriteRecipesData = recipes.filter((recipe) => favoriteRecipes.includes(recipe.id));
  
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header"> {/*Header del componente que incluye el menú desplegable*/}
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Favoritos</IonTitle> {/*Título del componente*/}
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent id="contentFavoritos"> {/*Contenido del componente*/}
        <h1 className="h1">Mis recetas favoritas</h1>
        {/*Muestra un mapa de las recetas marcadas como favoritas*/}
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