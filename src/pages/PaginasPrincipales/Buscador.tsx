import { useEffect, useState } from 'react'; //Importa el hook useEffect y useState de React
//Importa componentes Ionic
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSearchbar, IonIcon, InputChangeEventDetail, IonCheckbox } from '@ionic/react';
import { chevronForwardOutline, fastFoodOutline, filterOutline, hammerOutline, timeOutline } from 'ionicons/icons'; //Importa iconos utilizados
import firebaseConfig from '../../firebaseConfig'; //Importa la configuración de Firebase
import { getFirestore, collection, getDocs } from 'firebase/firestore'; //Importa funciones para manipular documentos de firestore
import RecipeCard from '../../components/RecipeCard/RecipeCard'; //Importa componente RecipeCard
import '../../css/cssGenerales/Buscador.css'; //Importa archivo de estilos

const Buscador = () => {
  const [recipes, setRecipes] = useState<any[]>([]); //Almacena array de recetas y actualiza su estado
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]); //Almacena las recetas filtradas y actualiza su estado
  const [searchTerm, setSearchTerm] = useState<string>(''); //Almacena la búsqueda y actualiza su estado
  const [favorites, setFavorites] = useState<{ [recipeId: string]: boolean }>({}); //Almacena el id de las recetas favoritas y actualiza su estado
  const [showFilters, setShowFilters] = useState(false); //Estado que indica si se deben mostrar los filtros y actualiza su estado
  const [mostrarTiempo, setMostrarTiempo] = useState(false); //Si se debe mostrar el desplegable mostrarTiempo y actualiza su estado
  const [mostrarDificultad, setMostrarDificultad] = useState(false); //Si se debe mostrar el desplegable mostrarDificultad y actualiza su estado
  const [mostrarTipoComida, setMostrarTipoComida] = useState(false); //Si se debe mostrar el desplegable mostrarTipoComida y actualiza su estado
  const [checkboxes, setCheckboxes] = useState<{ [checkboxId: string]: boolean }>({ //Almacena el estado de los diferentes checkboxes
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
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]); //Almacena las recetas marcadas como favoritas y actualiza su estado

    //Carga las recetas desde Firestore al montar el componente
    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const firestore = getFirestore(firebaseConfig.app); //Obtiene la instancia de autenticación de Firebase
          const recipesRef = collection(firestore, "recipes"); //Obtiene la instancia de la colección recipes de Firestore
          const querySnapshot = await getDocs(recipesRef); //Obtiene el documento del usuario
          const recipesData = querySnapshot.docs.map((doc) => doc.data()); //Obtiene los datos del documento del usuario
          setRecipes(recipesData); //Devuelve los datos del documento
        } catch (error) {
          console.log("Error al obtener los documentos:", error);
        }
      };
      fetchRecipes();
    }, []);

  //Función para alternar la visibilidad de los desplegables de filtros
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

  //Función para manejar el evento de búsqueda y filtra las recetas según el término de búsqueda
  const handleSearch = (event: CustomEvent<InputChangeEventDetail>) => {
    const searchTerm = event.detail.value?.toLowerCase() ?? '';
    setSearchTerm(searchTerm);
    const filtered = recipes.filter(recipe => recipe.nombre.toLowerCase().includes(searchTerm));
    setFilteredRecipes(filtered);
  };

  //Maneja el evento de clic en los filtros y muestra/oculta los filtros
  const handleFiltersClick = () => {
    setShowFilters(prevShowFilters => !prevShowFilters);
  };

  //Maneja los cambios en los checkboxes de filtros y filtra las recetas correspondientes
  const handleCheckboxChange = (checkboxId: string) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));
  };

  //Filtra las recetas según los filtros seleccionados y actualiza las recetas filtradas
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
 
  //Maneja los cambios en las recetas favoritas y actualiza la lista de recetas favoritas
  const handleFavoriteChange = (recipeId: number, isFavorite: boolean) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [recipeId]: isFavorite,
    }));
  };
  
 
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header"> {/*Header del componente que incluye el menú desplegable*/}
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Buscador</IonTitle> {/*Título del componente*/}
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent id="contentBuscador">{/*Icono con el desplegable*/}
        <h1 className='h1'>Busca tus recetas favoritas aún más rápido</h1>
        <div className='encabezado'>
          <IonIcon icon={filterOutline} onClick={handleFiltersClick} className='icono'></IonIcon>
          {/*Buscador que filtra por nombre*/}
          <IonSearchbar
            placeholder="Bizcocho de chocolate..."
            className='searchBar'
            onIonInput={handleSearch}
            value={searchTerm}
          ></IonSearchbar>
        </div>
        {/*Se abre el desplegable*/}
        {showFilters && (
          <div className="filters-body">
          <p className="filtros" onClick={() => toggleDesplegable('tiempo')}> {/*Para abrir el desplegable del tiempo*/}
            <IonIcon icon={timeOutline} className="icon"/>
            Tiempo de preparación
            <IonIcon icon={chevronForwardOutline} className="icon2" />
          </p>
          {/*Se abre el subdesplegable del tiempo*/}
          {mostrarTiempo && (
            <div className='subdesplegable'>{/*Se muestran los checkbox correspondientes*/}
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
   
          <p className="filtros" onClick={() => toggleDesplegable('dificultad')}>{/*Para abrir el desplegable de la dificultad*/}
            <IonIcon icon={hammerOutline} className="icon3" />
            Dificultad
            <IonIcon icon={chevronForwardOutline} className="icon4" />
          </p>
          {/*Se abre el subdesplegable de la dificultad*/}
          {mostrarDificultad && (
            <div className='subdesplegable'>{/*Se muestran los checkbox correspondientes*/}
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
   
          <p className="filtros" onClick={() => toggleDesplegable('tipoComida')}>{/*Para abrir el desplegable del tipo de comida*/}
            <IonIcon icon={fastFoodOutline} className="icon" />
            Tipo de comida
            <IonIcon icon={chevronForwardOutline} className="icon2" />
          </p>
          {/*Se abre el subdesplegable del tipo de comida*/}
          {mostrarTipoComida && (
            <div className='subdesplegable'>{/*Se muestran los checkbox correspondientes*/}
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

  {/*Busca y filtra las recetas a mostrar según el checkbox seleccionado*/}
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
          {/*Muestra un map de las recetas que coincidan con el filtro seleccionado*/}
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