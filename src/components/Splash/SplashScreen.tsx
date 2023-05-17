import { useEffect, useState } from 'react';
import './SplashScreen.css';

interface SplashProps {}

const SplashScreen: React.FC<SplashProps> = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`splashContainer ${showSplash ? 'show' : 'hidden'}`}>
      {/* Contenido del SplashScreen aquí */}
    </div>
  );
};

export default SplashScreen;
