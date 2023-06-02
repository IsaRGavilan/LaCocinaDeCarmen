import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSearchbar, IonIcon, InputChangeEventDetail, IonCheckbox } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import '../../css/cssGenerales/Buscador.css';
import { chevronForwardOutline, fastFoodOutline, filterOutline, hammerOutline, timeOutline } from 'ionicons/icons';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const Buscador = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favorites, setFavorites] = useState<{ [recipeId: string]: boolean }>({});
  const [showFilters, setShowFilters] = useState(false);
  const [mostrarTiempo, setMostrarTiempo] = useState(false);
  const [mostrarDificultad, setMostrarDificultad] = useState(false);
  const [mostrarTipoComida, setMostrarTipoComida] = useState(false);
  const [checkboxes, setCheckboxes] = useState<{ [checkboxId: string]: boolean }>({
    baja: false,
    media: false,
    alta: false,
    menosDeMediaHora: false,
    entreMediaHoraYUnaHora: false,
    masDeUnaHora: false,
    platoFuerte: false,
    aperitivo: false,
    dulce: false,
  });
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);

  const toggleDesplegable = (desplegable: string) => {
    switch (desplegable) {
      case 'tiempo':
        setMostrarTiempo(!mostrarTiempo);
        break;
      case 'dificultad':
        setMostrarDificultad(!mostrarDificultad);
        break;
      case 'tipoComida':
        setMostrarTipoComida(!mostrarTipoComida);
        break;
      default:
        break;
    }
  };

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

  const handleFiltersClick = () => {
    setShowFilters(prevShowFilters => !prevShowFilters);
  };

  const handleCheckboxChange = (checkboxId: string) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));
  };

  useEffect(() => {
    const filterRecipes = () => {
      let filtered = recipes;
 
      if (checkboxes.baja) {
        filtered = filtered.filter((recipe) => recipe.dificultad === "Baja");
      }
      if (checkboxes.media) {
        filtered = filtered.filter((recipe) => recipe.dificultad === "Media");
      }
      if (checkboxes.alta) {
        filtered = filtered.filter((recipe) => recipe.dificultad === "Alta");
      }
      if (checkboxes.menosDeMediaHora) {
        filtered = filtered.filter((recipe) => recipe.tiempo < 30);
      }
      if (checkboxes.entreMediaHoraYUnaHora) {
        filtered = filtered.filter((recipe) => recipe.tiempo >= 30 && recipe.tiempo <= 60);
      }
      if (checkboxes.masDeUnaHora) {
        filtered = filtered.filter((recipe) => recipe.tiempo > 60);
      }
      if (checkboxes.platoFuerte) {
        filtered = filtered.filter((recipe) => recipe.tipo === "Plato fuerte");
      }
      if (checkboxes.aperitivo) {
        filtered = filtered.filter((recipe) => recipe.tipo === "Aperitivo");
      }
      if (checkboxes.dulce) {
        filtered = filtered.filter((recipe) => recipe.tipo === "Dulce");
      }
      setFilteredRecipes(filtered);
    };
    filterRecipes();
  }, [checkboxes, recipes]);
 
  const handleFavoriteChange = (recipeId: number, isFavorite: boolean) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [recipeId]: isFavorite,
    }));
  };
  
 
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Buscador</IonTitle>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent id="contentBuscador">
        <h1 className='h1'>Busca tus recetas favoritas aún más rápido</h1>
        <div className='encabezado'>
          <IonIcon icon={filterOutline} onClick={handleFiltersClick} className='icono'></IonIcon>
          <IonSearchbar
            placeholder="Bizcocho de chocolate..."
            className='searchBar'
            onIonInput={handleSearch}
            value={searchTerm}
          ></IonSearchbar>
        </div>
        {showFilters && (
          <div className="filters-body">
          <p className="filtros" onClick={() => toggleDesplegable('tiempo')}>
            <IonIcon icon={timeOutline} className="icon"/>
            Tiempo de preparación
            <IonIcon icon={chevronForwardOutline} className="icon2" />
          </p>
          {mostrarTiempo && (
            <div className='subdesplegable'>
              <label>
                <IonCheckbox className='checkbox' slot='start' color='secondary'checked={checkboxes['menosDeMediaHora'] || false} onIonChange={() => handleCheckboxChange('menosDeMediaHora')}/>
                Menos de 1/2 hora
              </label>
              <label>
              <IonCheckbox className='checkbox' slot='start' color='secondary'checked={checkboxes['entreMediaHoraYUnaHora'] || false} onIonChange={() => handleCheckboxChange('entreMediaHoraYUnaHora')}/>
                Entre 1/2 hora y 1 hora
              </label>      
              <label>
              <IonCheckbox className='checkbox' slot='start' color='secondary' checked={checkboxes['masDeUnaHora'] || false} onIonChange={() => handleCheckboxChange('masDeUnaHora')}/>
                Más de 1 hora
              </label>
            </div>
          )}
   
          <p className="filtros" onClick={() => toggleDesplegable('dificultad')}>
            <IonIcon icon={hammerOutline} className="icon3" />
            Dificultad
            <IonIcon icon={chevronForwardOutline} className="icon4" />
          </p>
          {mostrarDificultad && (
            <div className='subdesplegable'>
              <label>
              <IonCheckbox className='checkbox' slot='start' color='secondary' checked={checkboxes['baja'] || false} onIonChange={() => handleCheckboxChange('baja')}/>
                Baja
              </label>
              <label>
              <IonCheckbox className='checkbox' slot='start' color='secondary' checked={checkboxes['media'] || false} onIonChange={() => handleCheckboxChange('media')}/>
                Media
              </label>
              <label>
              <IonCheckbox className='checkbox' slot='start' color='secondary' checked={checkboxes['alta'] || false} onIonChange={() => handleCheckboxChange('alta')}/>
                Alta
              </label>
            </div>
          )}
   
          <p className="filtros" onClick={() => toggleDesplegable('tipoComida')}>
            <IonIcon icon={fastFoodOutline} className="icon" />
            Tipo de comida
            <IonIcon icon={chevronForwardOutline} className="icon2" />
          </p>
          {mostrarTipoComida && (
            <div className='subdesplegable'>
              <label>
              <IonCheckbox className='checkbox' slot='start' color='secondary' checked={checkboxes['platoFuerte'] || false} onIonChange={() => handleCheckboxChange('platoFuerte')}/>
                Platos principales
              </label>
              <label>
              <IonCheckbox className='checkbox' slot='start' color='secondary' checked={checkboxes['aperitivo'] || false} onIonChange={() => handleCheckboxChange('aperitivo')}/>
                Aperitivos
              </label>
              <label>
              <IonCheckbox className='checkbox' slot='start' color='secondary' checked={checkboxes['dulce'] || false} onIonChange={() => handleCheckboxChange('dulce')}/>
                Dulce
              </label>
            </div>
          )}
        </div>
      )}

  {(searchTerm === '' ? filteredRecipes : filteredRecipes.filter(recipe => {
          if (checkboxes.baja && recipe.dificultad !== 'Baja') {
            return false;
          }
          if (checkboxes.media && recipe.dificultad !== 'Media') {
            return false;
          }
          if (checkboxes.alta && recipe.dificultad !== 'Alta') {
            return false;
          }
          if (checkboxes.menosDeMediaHora && recipe.tiempo >= 30) {
            return false;
          }
          if (checkboxes.entreMediaHoraYUnaHora && (recipe.tiempo < 30 || recipe.tiempo > 60)) {
            return false;
          }
          if (checkboxes.masDeUnaHora && recipe.tiempo <= 60) {
            return false;
          }
          if (checkboxes.platoFuerte && recipe.tipo !== 'Plato fuerte') {
            return false;
          }
          if (checkboxes.aperitivo && recipe.tipo !== 'Aperitivo') {
            return false;
          }
          if (checkboxes.dulce && recipe.tipo !== 'Dulce') {
            return false;
          }
          return true;
        })).map(recipe => (
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

export default Buscador;