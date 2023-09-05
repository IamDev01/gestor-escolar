// pages/index.js
import { useState } from 'react';
import Layout from '@/components/Layout';
import styles from '@/components/styles.module.css';

async function fetchAPI(url, method, data) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export default function Escola() {
  const [numeroClasse, setNumeroClasse] = useState('');

  const [cpfProfessor, setCpfProfessor] = useState('');
  const [nomeProfessor, setNomeProfessor] = useState('');
  const [dnProfessor, setDnProfessor] = useState('');

  const [cpfAluno, setCpfAluno] = useState('');
  const [nomeAluno, setNomeAluno] = useState('');
  const [dnAluno, setDnAluno] = useState('');
  const [classeAluno, setClasseAluno] = useState('');

  const [nomeDisciplina, setNomeDisciplina] = useState('');
  const [codigoDisciplina, setCodigoDisciplina] = useState('');
  const [cargaHorariaDisciplina, setCargaHorariaDisciplina] = useState('');
  const [professorId, setProfessorId] = useState('');

  const [cpfMatricularAluno, setCpfMatricularAluno] = useState('');
  const [codigoMatricularAluno, setCodigoMatricularAluno] = useState('');

  const [errorClasse, setErrorClasse] = useState('');
  const [errorProfessor, setErrorProfessor] = useState('');
  const [errorAluno, setErrorAluno] = useState('');
  const [errorDisciplina, setErrorDisciplina] = useState('');
  const [errorMatricular, setErrorMatricular] = useState('');

  const [successClasse, setSuccessClasse] = useState('');
  const [successProfessor, setSuccessProfessor] = useState('');
  const [successAluno, setSuccessAluno] = useState('');
  const [successDisciplina, setSuccessDisciplina] = useState('');
  const [successMatricular, setSuccessMatricular] = useState('');

  const handleAddClasse = async () => {
    setErrorClasse(''); // Limpar mensagem de erro anterior
    setSuccessClasse(''); // Limpar mensagem de sucesso anterior

    if (!numeroClasse) {
      setErrorClasse("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const newClasse = await fetchAPI('/api/classes', 'POST', {
        numero: numeroClasse,
      });
      setSuccessClasse('Classe adicionada', newClasse);
      setNumeroClasse('');
    } catch (error) {
      console.log('Erro ao adicionar classe:', error)
    }
  };

  const handleAddProfessor = async () => {
    setErrorProfessor('');
    setSuccessProfessor('');
    // Validar os campos antes de enviar a requisição
    if (!nomeProfessor || !dnProfessor || !cpfProfessor) {
      setErrorProfessor("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validar a data de nascimento (DN)
    const dataNascimento = new Date(dnProfessor);
    if (isNaN(dataNascimento.getTime())) {
      setErrorAluno("A Data de Nascimento (DN) não é válida.");
      return;
    }

    try {
      const newProfessor = await fetchAPI('/api/professores', 'POST', {
        cpf: cpfProfessor,
        nome: nomeProfessor,
        DN: dataNascimento,
      });
      setSuccessProfessor('Professor adicionado', newProfessor);
      setCpfProfessor('');
      setNomeProfessor('');
      setDnProfessor('');
    } catch (error) {
      console.error('Erro ao adicionar professor:', error);
    }
  };

  const handleAddAluno = async () => {
    setErrorAluno('');
    setSuccessAluno('');
    // Validar os campos antes de enviar a requisição
    if (!nomeAluno || !dnAluno || !classeAluno || !cpfAluno) {
      setErrorAluno("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validar a data de nascimento (DN)
    const dataNascimento = new Date(dnAluno);
    if (isNaN(dataNascimento.getTime())) {
      setErrorAluno("A Data de Nascimento não é válida.");
      return;
    }

    try {
      const newAluno = await fetchAPI('/api/estudantes', 'POST', {
        cpf: cpfAluno,
        nome: nomeAluno,
        DN: dataNascimento,
        classe: classeAluno,
      });
      setSuccessAluno('Aluno adicionado', newAluno);
      setCpfAluno('');
      setNomeAluno('');
      setDnAluno('');
      setClasseAluno('');
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
      alert('Erro ao adicionar aluno. Por favor, tente novamente mais tarde.');
    }
  };

  const handleAddDisciplina = async () => {
    setErrorDisciplina('');
    setSuccessDisciplina('');
    // Validar os campos antes de enviar a requisição
    if (!nomeDisciplina || !codigoDisciplina || !cargaHorariaDisciplina || !professorId) {
      setErrorDisciplina("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const newDisciplina = await fetchAPI('/api/disciplinas', 'POST', {
        nome: nomeDisciplina,
        codigo: codigoDisciplina,
        cargaHoraria: parseInt(cargaHorariaDisciplina),
        professor: professorId,
      });
      setSuccessDisciplina('Disciplina adicionada', newDisciplina);
    } catch (error) {
      console.error('Erro ao adicionar disciplina:', error);
    }
  };

  const handleMatricularAluno = async () => {
    setErrorMatricular('');
    setSuccessMatricular('');
    if (!cpfMatricularAluno || !codigoMatricularAluno) {
      setErrorMatricular("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await fetchAPI(`/api/disciplinas/matricular`, 'POST', {
        cpf: cpfMatricularAluno,
        codigo: codigoMatricularAluno,
      });
      setSuccessMatricular('Aluno matriculado na disciplina', response);
    } catch (error) {
      console.error('Erro ao matricular aluno na disciplina:', error);
    }
  };

  return (
    <div>
      <Layout>
          <h1 className={styles.pagetitle}>Gestor Escolar</h1>

          {/* Adicionar Aluno */}
          <div className={styles.conteinerInput}>
            <h2>Adicionar Aluno</h2>
            <input
              type="text"
              value={cpfAluno}
              className={styles.input}
              onChange={(e) => setCpfAluno(e.target.value)}
              placeholder="CPF"
            />
            <input
              type="text"
              value={nomeAluno}
              className={styles.input}
              onChange={(e) => setNomeAluno(e.target.value)}
              placeholder="Nome do aluno"
            />
            <input
              type="date"
              value={dnAluno}
              className={styles.input}
              onChange={(e) => setDnAluno(e.target.value)}
              placeholder="Data de Nascimento"
            />
            <input
              type="text"
              value={classeAluno}
              className={styles.input}
              onChange={(e) => setClasseAluno(e.target.value)}
              placeholder="Classe do aluno"
            />
            <button onClick={handleAddAluno} className={styles.btnclass}>Adicionar Aluno</button>
            {errorAluno && <p className={styles.errorMessage}>{errorAluno}</p>}
            {successAluno && <p className={styles.successMessage}>{successAluno}</p>}
          </div>

          {/* Matricular Aluno em Disciplina */}
          <div className={styles.conteinerInput}>
            <h2>Matricular Aluno em Disciplina</h2>
            <input
              type="text"
              value={cpfMatricularAluno}
              className={styles.input}
              onChange={(e) => setCpfMatricularAluno(e.target.value)}
              placeholder="CPF do Aluno"
            />
            <input
              type="text"
              value={codigoMatricularAluno}
              className={styles.input}
              onChange={(e) => setCodigoMatricularAluno(e.target.value)}
              placeholder="Codigo da Disciplina"
            />
            <button onClick={handleMatricularAluno} className={styles.btnclass}>Matricular Aluno</button>
            {errorMatricular && <p className={styles.errorMessage}>{errorMatricular}</p>}
            {successMatricular && <p className={styles.successMessage}>{successMatricular}</p>}
          </div>

          {/* Adicionar Disciplina */}
          <div className={styles.conteinerInput}>
            <h2>Adicionar Disciplina</h2>
            <input
              type="text"
              value={nomeDisciplina}
              className={styles.input}
              onChange={(e) => setNomeDisciplina(e.target.value)}
              placeholder="Nome da disciplina"
            />
            <input
              type="text"
              value={codigoDisciplina}
              className={styles.input}
              onChange={(e) => setCodigoDisciplina(e.target.value)}
              placeholder="Código da disciplina"
            />
            <input
              type="number"
              value={cargaHorariaDisciplina}
              className={styles.input}
              onChange={(e) => setCargaHorariaDisciplina(e.target.value)}
              placeholder="Carga Horária"
            />
            <input
              type="text"
              value={professorId}
              className={styles.input}
              onChange={(e) => setProfessorId(e.target.value)}
              placeholder="ID do Professor"
            />
            <button onClick={handleAddDisciplina} className={styles.btnclass}>Adicionar Disciplina</button>
            {errorDisciplina && <p className={styles.errorMessage}>{errorDisciplina}</p>}
            {successDisciplina && <p className={styles.successMessage}>{successDisciplina}</p>}
          </div>

          {/* Adicionar Professor */}
          <div className={styles.conteinerInput}>
            <h2>Adicionar Professor</h2>
            <input
              type="text"
              value={cpfProfessor}
              className={styles.input}
              onChange={(e) => setCpfProfessor(e.target.value)}
              placeholder="CPF"
            />
            <input
              type="text"
              value={nomeProfessor}
              className={styles.input}
              onChange={(e) => setNomeProfessor(e.target.value)}
              placeholder="Nome do professor"
            />
            <input
              type="date"
              value={dnProfessor}
              className={styles.input}
              onChange={(e) => setDnProfessor(e.target.value)}
              placeholder="Data de Nascimento"
            />
            <button onClick={handleAddProfessor} className={styles.btnclass}>Adicionar Professor</button>
            {errorProfessor && <p className={styles.errorMessage}>{errorProfessor}</p>}
            {successProfessor && <p className={styles.successMessage}>{successProfessor}</p>}
          </div>

          {/* Adicionar Classe */}
          <div className={styles.conteinerInput}>
            <h2>Adicionar Classe</h2>
            <input
              type="text"
              value={numeroClasse}
              className={styles.input}
              onChange={(e) => setNumeroClasse(e.target.value)}
              placeholder="Numero da Classe"
            />
            <button onClick={handleAddClasse} className={styles.btnclass}>Adicionar Classe</button>
            {errorClasse && <p className={styles.errorMessage}>{errorClasse}</p>}
            {successClasse && <p className={styles.successMessage}>{successClasse}</p>}
          </div>
      </Layout>
    </div>
  );
}
