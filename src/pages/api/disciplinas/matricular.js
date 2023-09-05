import connectDB from '@/db';
import Aluno from '@/models/Aluno';
import Disciplina from '@/models/Disciplina';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cpf, codigo } = req.body;

    try {
      const disciplina = await Disciplina.findOne({ codigo });
      console.log('Disciplina encontrada:', disciplina);

      const aluno = await Aluno.findOne({ cpf });
      console.log('Aluno encontrado:', aluno);

      if (!disciplina || !aluno) {
        // Caso a disciplina ou o aluno não sejam encontrados, retornar erro 404
        return res.status(404).json({ error: 'Disciplina ou aluno não encontrado.' });
      }

      // Matricular o aluno na disciplina (adicionar a disciplina no histórico acadêmico do aluno)
      const novaDisciplina = {
        disciplina: disciplina._id,
        nome: disciplina.nome, // Adiciona o nome da disciplina
        notas: 0,
        aprovado: false,
        frequencia: 0,
      };
      aluno.disciplinas.push(novaDisciplina);

      await aluno.save();
      console.log('Aluno matriculado na disciplina:', aluno);

      // Adicionar o aluno ao array de alunos da disciplina
      disciplina.alunos.push({
        aluno: aluno._id,
        nome: aluno.nome, // Adiciona o nome do aluno
        notas: 0,
        aprovado: false,
        frequencia: 0,
      });
      await disciplina.save();
      console.log('Aluno adicionado ao array de alunos da disciplina:', disciplina.alunos);

      // Retornar a resposta de sucesso com o aluno matriculado
      return res.status(200).json(aluno);
    } catch (error) {
      console.error('Erro ao matricular aluno na disciplina:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao matricular aluno na disciplina.' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido.' });
  }
}
