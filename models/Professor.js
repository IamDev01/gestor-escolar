const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  cpf: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  DN: { type: Date, required: true, select: false },
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' }]
});

// Adicionando o método estático "getAllProfessores" ao modelo
professorSchema.statics.getAllProfessores = async function () {
  try {
    const professores = await this.find({}); // Encontra todos os professores no banco de dados
    return professores;
  } catch (error) {
    throw new Error('Error fetching professores');
  }
};

module.exports = mongoose.models.Professor || mongoose.model('Professor', professorSchema);
