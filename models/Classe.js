// models/Classe.js
const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  alunos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Aluno' }], 
});

// Adicionando o método estático "getAllClasses" ao modelo
classeSchema.statics.getAllClasses = async function () {
  try {
    const classes = await this.find({});
    return classes;
  } catch (error) {
    throw new Error('Error fetching Classes');
  }
};

module.exports = mongoose.models.Classe || mongoose.model('Classe', classeSchema);
