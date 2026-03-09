import { useEffect, useState } from 'react';
import { IonSpinner } from '@ionic/react';
import './SlashScreen.css';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // começa fade
      setTimeout(() => {
        onFinish(); // remove depois da animação
      }, 400); // duração do fade
    }, 900); // tempo que fica visível

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`splash ${fadeOut ? 'fade-out' : ''}`}>
      <IonSpinner className="spash" name="circular" />
    </div>
  );
};

export default SplashScreen;
