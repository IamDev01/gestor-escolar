import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import styles from '@/components/styles.module.css';

const ListaDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/disciplinas');
        const data = await response.json();
        if (Array.isArray(data.disciplinas)) {
          setDisciplinas(data.disciplinas);
        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching disciplinas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className={styles.pagetitle}>Lista de Disciplinas</h1>
      <ul>
        {disciplinas.map((disciplina) => (
          <li key={disciplina._id}>
            {disciplina.nome}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default ListaDisciplinas;
