// pages/api/professores.js
import connectDB from '@/db';
import Professor from '@/models/Professor';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cpf, nome, DN } = req.body;
    try {
      const professor = await Professor.create({ cpf, nome, DN });
      res.status(201).json(professor);
    } catch (error) {
      res.status(500).json({ error: 'Error creating professor' });
    }
  } else if (req.method === 'GET') {
    try {
      const professores = await Professor.getAllProfessores(); // Chama o método estático para buscar todos os professores
      res.status(200).json(professores);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching professores' });
    }
  }
}
