// src/pages/api/classes.js
import connectDB from '@/db';
import Classe from '@/models/Classe';
import Aluno from '@/models/Aluno';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { numero } = req.body;
    if (!numero || numero.trim() === '') {
      return res.status(400).json({ error: 'O campo "numero" é obrigatório.' });
    }

    try {
      // Verifica se a classe com o mesmo número já existe
      const classeExistente = await Classe.findOne({ numero });
      if (classeExistente) {
        return res.status(409).json({ error: 'Classe com o mesmo número já existe.' });
      }

      // Se a classe não existe, cria uma nova classe
      const classe = await Classe.create({ numero });
      res.status(201).json(classe);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar classe' });
    }
  } else if (req.method === 'GET') {
    const { numero } = req.query; // Obtem o numero da classe da query string

    if (numero) {
      try {
        const classe = await Classe.findOne({ numero }); // Encontra a classe pelo numero
        if (!classe) {
          return res.status(404).json({ error: 'Classe não encontrada' });
        }

        // Agora vamos buscar os alunos pertencentes à classe encontrada
        const alunos = await Aluno.find({ classe: classe._id });
        return res.status(200).json({ classe, alunos });
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar aluno' });
      }
    }
  }
}
