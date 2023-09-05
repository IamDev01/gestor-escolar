const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  cargaHoraria: { type: Number, required: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true },
  alunos: [{
    aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno' },
    nota: { type: Number, default: 0 }, // Campo para armazenar a nota do aluno na disciplina
    aprovado: { type: Boolean, default: false }, // Campo para indicar se o aluno foi aprovado na disciplina
    frequencia: { type: Number, default: 0 }, // Campo para armazenar a frequência do aluno na disciplina
  }]
});

// Adicionando o método estático "getAllDisciplinas" ao modelo
disciplinaSchema.statics.getAllDisciplinas = async function () {
  try {
    const disciplinas = await this.find({});
    return disciplinas;
  } catch (error) {
    throw new Error('Error fetching disciplinas');
  }
};

module.exports = mongoose.models.Disciplina || mongoose.model('Disciplina', disciplinaSchema);
