import { useEffect, useState } from 'react';

export const OrientationLock = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener('resize', checkOrientation);
    checkOrientation();

    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  if (!isLandscape) return null;

  return (
    <div className="landscape-notice">
      <div className="text-center">
        <div className="text-4xl mb-4">📱</div>
        <p>请竖屏使用</p>
      </div>
    </div>
  );
}; 