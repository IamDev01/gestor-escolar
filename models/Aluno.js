const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  cpf: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  DN: { type: Date, required: true, select: false },
  classe: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe', required: true },
  disciplinas: [{
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' },
    nome: { type: String, required: true },
    notas: { type: Number, default: 0 },
    frequencia: { type: Number, default: 0 },
    aprovado: { type: Boolean, default: false },
  }],
});

alunoSchema.statics.getAllAlunos = async function () {
  try {
    const alunos = await this.find({}); // Encontra todos os alunos no banco de dados
    return alunos;
  } catch (error) {
    throw new Error('Error fetching alunos');
  }
};

module.exports = mongoose.models.Aluno || mongoose.model('Aluno', alunoSchema);
