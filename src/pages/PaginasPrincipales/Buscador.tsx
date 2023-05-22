import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSearchbar, IonIcon, SearchbarChangeEventDetail, InputChangeEventDetail } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import '../../css/cssGenerales/Buscador.css';
import { filterOutline } from 'ionicons/icons';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const Buscador = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favorites, setFavorites] = useState<{ [recipeId: string]: boolean }>({});

  const handleSearch = (event: CustomEvent<InputChangeEventDetail>) => {
    const searchTerm = event.detail.value?.toLowerCase() ?? '';
    setSearchTerm(searchTerm);

    const filtered = recipes.filter(recipe => recipe.nombre.toLowerCase().includes(searchTerm));
    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const firestore = getFirestore(firebaseConfig.app);
        const recipesRef = collection(firestore, "recipes");
        const querySnapshot = await getDocs(recipesRef);
        const recipesData = querySnapshot.docs.map((doc) => doc.data());
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
          <IonTitle className="main-title">Buscador</IonTitle>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent className="custom-content">
        <h1 className='h1'>Busca tus recetas favoritas aún más rápido</h1>
        <div className='encabezado'>
          <IonIcon icon={filterOutline} className='icono'></IonIcon>
          <IonSearchbar
            placeholder="Bizcocho de chocolate..."
            className='searchBar'
            onIonInput={handleSearch}
            value={searchTerm}
          ></IonSearchbar>
        </div>
        {(searchTerm === '' ? recipes : filteredRecipes).map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} isFavorite={favorites[recipe.id] || false} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Buscador;