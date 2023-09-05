import React from 'react';
import styles from '@/components/styles.module.css'; // Importe o arquivo de estilos criado acima

const Loading = () => {
  return (
    <div>
      <p>Carregando... <span className={styles['loading-icon']}></span></p>
    </div>
  );
};

export default Loading;
