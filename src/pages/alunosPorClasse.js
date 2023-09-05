import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import styles from '@/components/styles.module.css';

const AlunosPorClasse = () => {
  const [inputClass, setInputClass] = useState('');
  const [foundClass, setFoundClass] = useState('');
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputClass(event.target.value);
  };

  const fetchAlunosByClasse = () => {
    setIsLoading(true);
    fetch(`/api/alunosClasse?classe=${foundClass}`)
      .then((response) => response.json())
      .then((alunos) => {
        if (alunos.length === 0) {
          setError(`Alunos não encontrados para a classe ${foundClass}.`);
        } else {
          setError('');
        }
        setFilteredAlunos(alunos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching alunos:', error);
        setFilteredAlunos([]);
        setIsLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputClass.trim() === '') {
      setError('Digite o número da classe.');
    } else {
      setFoundClass(inputClass);
      setError('');
    }
  };

  useEffect(() => {
    if (foundClass !== '') {
      fetchAlunosByClasse();
    }
  }, [foundClass]);

  return (
    <Layout>
      <h1 className={styles.pagetitle}>Filtrar Alunos por Classe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputClass}
          onChange={handleInputChange}
          placeholder="Digite o número da classe"
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p>{error}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        filteredAlunos.length > 0 && (
          <ul>
            <h2>Classe: {foundClass}</h2>
            {filteredAlunos.map((aluno) => (
              <li key={aluno._id}>
                <strong>{aluno.nome}</strong> -
                <ul>
                  {aluno.disciplinas.map((disciplina) => (
                    <li key={disciplina._id}>
                      Disciplina: {disciplina.nome} | Nota: {disciplina.notas} | Frequência: {disciplina.frequencia}%
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )
      )}
    </Layout>
  );
};

export default AlunosPorClasse;