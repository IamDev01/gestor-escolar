import connectDB from '@/db';
import Aluno from '@/models/Aluno';
import Classe from '@/models/Classe';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { numero } = req.query;

    try {
      // Buscar a classe pelo número
      const classeEncontrada = await Classe.findOne({ numero });

      if (!classeEncontrada) {
        return res.status(404).json({ error: 'Classe não encontrada' });
      }

      // Buscar os alunos pelo ID da classe
      const alunos = await Aluno.find({ classe: classeEncontrada._id }).populate('classe');

      console.log('Alunos encontrados:', alunos); // Verificar se os alunos foram encontrados corretamente

      res.status(200).json(alunos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar alunos da classe' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
