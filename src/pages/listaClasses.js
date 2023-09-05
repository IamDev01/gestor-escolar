import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Loading from '@/components/Loading';
import styles from '@/components/styles.module.css';

const ListaClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/listaClasses');
        const data = await response.json();
        if (Array.isArray(data)) {
          setClasses(data);
        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        // Defina isLoading como false após a busca dos dados, seja com sucesso ou erro.
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className={styles.pagetitle}>Lista de Classes</h1>
      {isLoading ? ( // Exiba o componente de loading se isLoading for verdadeiro
        <Loading />
      ) : (
        <ul>
          {classes.map((classe) => (
            <li key={classe.numero}>
              <Link href={`/classes/${classe.numero}`}>
                {classe.numero}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default ListaClasses;
