/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/editar-aluno/:id', // A rota acessada pelo usuário
        destination: '/alunos/editar-aluno', // A página correspondente que será renderizada
            },
        ]
    },
}

module.exports = nextConfig
