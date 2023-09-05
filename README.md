# Gestor Escolar

## Sobre
Este é um projeto que utiliza a tecnologia Next.js para criar um sistema web completo, incluindo frontend e backend. O Next.js aproveita o React para carregar apenas o necessário, proporcionando uma experiência de usuário mais eficiente. Inicialmente, definimos modelos de classes, como Aluno, Professor, Disciplina e Classe, utilizando o Mongoose.

O Mongoose é uma biblioteca essencial para interagir com o MongoDB em aplicativos Node.js. Aqui estão alguns dos principais benefícios de usar o Mongoose:

- **Facilidade de Modelagem de Dados:** Permite definir estruturas de dados de forma simples e intuitiva.
- **Validações Integradas:** Facilita a aplicação de validações aos dados armazenados no MongoDB.
- **Consultas Simples:** Simplifica a criação de consultas para recuperar dados do banco de dados.
- **Middleware Personalizado:** Permite adicionar funções de middleware para interceptar operações no banco de dados.
- **Gerenciamento de Conexão:** Oferece controle sobre a conexão com o banco de dados.
- **Relacionamentos Definidos:** Facilita a criação e gerenciamento de relacionamentos entre documentos.
- **Tratamento de Erros:** Fornece recursos para lidar com erros de maneira eficaz.
- **Extensibilidade via Plugins:** Permite estender o Mongoose com plugins personalizados.

## Conexão com o Banco de Dados
Utilizamos o Mongoose para estabelecer a conexão com o banco de dados MongoDB. Depois de configurada a conexão, podemos usar a função `connectDB()` para acessar o objeto de banco de dados em outros módulos do projeto.

## API
Implementamos uma API Node.js que lida com operações de criação e recuperação de informações em um banco de dados MongoDB usando o Mongoose.

## Envio de dados

- Antes de enviar os dados, eles são serializados em uma string JSON usando a função JSON.stringify(). Isso converte o objeto JavaScript em uma representação JSON que pode ser enviada pela rede.
  ``` const aluno = await fetchAPI('/api/alunos', 'POST', {
  cpf,
  nome,
  DN,
  classe,
}); ```

- Envio da Solicitação HTTP: Os dados serializados em JSON são enviados como parte do corpo de uma solicitação HTTP usando o método POST. Isso significa que os dados são incluídos no corpo da solicitação HTTP e podem ser acessados pela API no lado do servidor.


## Roteamento de Página
- **Página Principal:** O arquivo `pages/index.js` é considerado a página principal e é acessada pelo URL raiz (`/`) do projeto.
- **Páginas Personalizadas:** Você pode criar páginas adicionais criando arquivos na pasta `pages`. Por exemplo, `pages/listaClasses.js` corresponde a `/listaClasses` no URL.
- **Parâmetros em Rotas:** É possível adicionar parâmetros às suas rotas criando arquivos com colchetes. Por exemplo, `pages/posts/[id].js` corresponde a `/posts/1`, `/posts/2`, etc.

## Alias de Importação
Para melhorar a legibilidade do código, utilizamos alias de importação. Esta técnica simplifica os caminhos de importação de módulos, tornando-os mais curtos e descritivos.

## Feedback de Carregamento
Visando proporcionar uma experiência do usuário mais agradável, as requisições incluem informações de carregamento para indicar o progresso das operações.

## Passos para Executar

1. Execute `npm install` para instalar as dependências do projeto.
2. Execute `npm run dev` para iniciar o projeto. Ele estará disponível em `localhost:3000`.

Pronto, o projeto agora está rodando e pode ser acessado em `localhost:3000`.
