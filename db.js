// db.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Verifica se a variável de ambiente MONGODB_URI foi definida
if (!MONGODB_URI) {
  console.warn('A variável de ambiente MONGODB_URI não está definida em .env.local');
}

// Função assíncrona para conectar ao banco de dados
async function connectDB() {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    return db;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    throw error;
  }
}

// Exporta a função para que ela possa ser usada em outros módulos
export default connectDB;