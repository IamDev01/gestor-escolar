import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const ClassePage = () => {
  const router = useRouter();
  const { numero } = router.query;
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await fetch(`/api/classes/alunos?numero=${numero}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setAlunos(data);
        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching alunos:', error);
      }
    };

    if (numero) {
      fetchAlunos();
    }
  }, [numero]);

  return (
    <Layout>
      <h1>Alunos da Classe {numero}</h1>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno._id}>{aluno.nome}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default ClassePage;
