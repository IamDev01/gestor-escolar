import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import styles from '@/components/styles.module.css';

const ListaProfessores = () => {
  const [professores, setProfessores] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/professores');
        const data = await response.json();
        if (Array.isArray(data)) {
          setProfessores(data);
        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching professores:', error);
      } finally {
        // Defina isLoading como false após a busca dos dados, seja com sucesso ou erro.
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className={styles.pagetitle}>Lista de Professores</h1>
      {isLoading ? ( // Exiba o componente de loading se isLoading for verdadeiro
        <Loading />
      ) : (
        <ul>
          {professores.map((professor) => (
            <li key={professor._id}>
                {professor.nome}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default ListaProfessores;
