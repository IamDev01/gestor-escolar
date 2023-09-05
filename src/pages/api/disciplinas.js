import connectDB from '@/db';
import Disciplina from '@/models/Disciplina';
import Professor from '@/models/Professor';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, codigo, cargaHoraria, professor } = req.body;
    try {
      // Criar a disciplina
      const disciplina = await Disciplina.create({ nome, codigo, cargaHoraria, professor });

      // Encontrar o professor pelo ID informado
      const teacher = await Professor.findById(professor);

      if (!teacher) {
        // Caso o professor ou a disciplina não sejam encontrados, retornar erro 404
        return res.status(404).json({ error: 'Professor não encontrado.' });
      }

      // Adicionar a disciplina ao professor
      teacher.disciplinas.push(disciplina._id); // Use disciplina._id para adicionar o ObjectId da disciplina ao array
      await teacher.save();

      console.log('Disciplina adicionada ao professor:', teacher);

      // Retornar a resposta de sucesso
      return res.status(200).json(professor);
    } catch (error) {
      console.error('Erro ao adicionar disciplina ao professor:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao adicionar disciplina ao professor.' });
    }
  } else if (req.method === 'GET') {
    try {
      // Buscar todas as disciplinas
      const disciplinas = await Disciplina.getAllDisciplinas();

      // Retornar as disciplinas
      return res.status(200).json({disciplinas});
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao buscar disciplinas' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
