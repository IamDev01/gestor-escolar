// src/pages/api/alunosclasse.js
import connectDB from '@/db';
import Aluno from '@/models/Aluno';
import Classe from '@/models/Classe';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { classe } = req.query; // Obtém o número da classe da query string

    if (classe) {
      try {
        // Encontra a classe pelo número
        const classeEncontrada = await Classe.findOne({ numero: classe });
        if (!classeEncontrada) {
          // Se a classe não for encontrada, retorna uma lista vazia de alunos
          return res.status(200).json([]);
        }

        // Encontra os alunos pertencentes à classe encontrada
        const alunos = await Aluno.find({ classe: classeEncontrada._id });
        res.status(200).json(alunos);
      } catch (error) {
        console.error('Error fetching alunos:', error);
        res.status(500).json({ error: 'Error fetching alunos' });
      }
    } else {
      try {
        // Caso não seja fornecido o número da classe, busca todos os alunos
        const alunos = await Aluno.find({});
        res.status(200).json(alunos);
      } catch (error) {
        console.error('Error fetching alunos:', error);
        res.status(500).json({ error: 'Error fetching alunos' });
      }
    }
  }
}
