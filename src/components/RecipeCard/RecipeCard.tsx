import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { downloadOutline, heart, heartOutline } from 'ionicons/icons';
import'./RecipeCard.css';
import firebaseConfig from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore'

interface RecipeCardProps {
    recipe: {
      id: number;
      imagen: string;
      nombre: string;
      categoria: string;
      dificultad: string;
      ingredientes: string[];
      preparacion: string[];
      tiempo: number;
      tipo: string;
    };
    isFavorite: boolean;
    handleFavoriteChange: (recipeId: number, isFavorite: boolean) => void;
  }

// Componente para mostrar una tarjeta de receta
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {

  const [isFavorite, setIsFavorite] = useState(false);
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
              setIsFavorite(userData.favoriteRecipes.includes(recipe.id));
            }
          }
        } catch (error) {
          console.error('Error fetching favorite recipes:', error);
        }
      };

      fetchFavoriteRecipes();
    }
  }, [user, recipe.id]);

  const handleFavoriteClick = async () => {
    setIsFavorite(!isFavorite);

    if (user) {
      try {
        const userRef = doc(firebaseConfig.firestore, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          if (userData && Array.isArray(userData.favoriteRecipes)) {
            const updatedFavoriteRecipes = isFavorite
              ? userData.favoriteRecipes.filter((recipeId) => recipeId !== recipe.id)
              : [...userData.favoriteRecipes, recipe.id];

            await updateDoc(userRef, { favoriteRecipes: updatedFavoriteRecipes });
          }
        }
      } catch (error) {
        console.error('Error updating favorite recipes:', error);
      }
    }
  };

  return (
    <div className='contenedor-tarjeta'>
    <IonCard className='tarjeta'>
      <Link to={`/receta/${recipe.id}`} className='link'>
        <img alt="Imagen de receta" src={recipe.imagen} className='imagen-tarjeta'/>
      </Link>
      <IonCardHeader className='header-tarjeta'>
        <IonCardTitle className='titulo-tarjeta'>{recipe.nombre}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className='content-tarjeta'>
        {recipe.categoria}
        <div className="contenedor-botones">
        <IonButton className='botonFavoritos' onClick={handleFavoriteClick}>
              <IonIcon icon={isFavorite ? heart : heartOutline} className={isFavorite ? 'icono-tarjeta-activo' : 'icono-tarjeta'} />
            </IonButton>
            <IonButton className='botonDescarga'>
              <IonIcon
                icon={downloadOutline}
                className='icon'
              />
            </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
    </div>
  );
};

export default RecipeCard;