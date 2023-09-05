// src/pages/api/alunos.js

import connectDB from '@/db';
import Aluno from '@/models/Aluno';
import Classe from '@/models/Classe';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cpf, nome, DN, classe } = req.body;
    try {
      const classeEncontrada = await Classe.findOne({ numero: classe });
      if (!classeEncontrada) {
        return res.status(404).json({ error: 'Classe não encontrada' });
      }

      const aluno = await Aluno.create({ cpf, nome, DN, classe: classeEncontrada._id });

      // Adiciona o aluno à lista de alunos da classe
      classeEncontrada.alunos.push(aluno._id);
      await classeEncontrada.save();

      res.status(201).json(aluno);
    } catch (error) {
      console.error('Error creating aluno:', error);
      res.status(500).json({ error: 'Error creating aluno' });
    }
  } else if (req.method === 'GET') {
    const { classe } = req.query; // Obtém o número da classe da query string

    if (classe) {
      try {
        const alunos = await Aluno.find({ classe }); // Busca todos os alunos com a classe fornecida
        res.status(200).json(alunos);
      } catch (error) {
        console.error('Error fetching alunos:', error);
        res.status(500).json({ error: 'Error fetching alunos' });
      }
    } else {
      try {
        const alunos = await Aluno.getAllAlunos();
        res.status(200).json(alunos);
      } catch (error) {
        console.error('Error fetching alunos:', error);
        res.status(500).json({ error: 'Error fetching alunos' });
      }
    }
  }
}
