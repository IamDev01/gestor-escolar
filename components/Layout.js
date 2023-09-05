import { useRouter } from 'next/router';
import Head from 'next/head';
import LinkC from '@/components/linkC';

const Layout = ({ children }) => {
  const router = useRouter();

  const getPageTitle = () => {
    switch (router.pathname) {
      case '/':
        return 'Página 1';
      case '/listaClasses':
        return 'Página 2';
      case '/listaProfessores':
        return 'Página 3';
      case '/alunosPorClasse':
        return 'Página 4';
      case '/listaDisciplinas':
        return 'Página 5';
      default:
        return '404 - Página não encontrada';
    }
  };

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
      </Head>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '140px', background: 'black', padding: '10px', position: 'fixed', top: 0, left: 0, height: '100%', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <li style={{ margin: '10px 0' }}>
              <LinkC href="/">
                <div className="LinkC">
                  <button className={`btn ${router.pathname === '/' ? 'active' : ''}`}>Página 1</button>
                </div>
              </LinkC>
            </li>
            <li style={{ margin: '10px 0' }}>
              <LinkC href="/listaClasses">
                <div className="LinkC">
                  <button className={`btn ${router.pathname === '/listaClasses' ? 'active' : ''}`}>Página 2</button>
                </div>
              </LinkC>
            </li>
            <li style={{ margin: '10px 0' }}>
              <LinkC href="/listaProfessores">
                <div className="LinkC">
                  <button className={`btn ${router.pathname === '/listaProfessores' ? 'active' : ''}`}>Página 3</button>
                </div>
              </LinkC>
            </li>
            <li style={{ margin: '10px 0' }}>
              <LinkC href="/alunosPorClasse">
                <div className="LinkC">
                  <button className={`btn ${router.pathname === '/alunosPorClasse' ? 'active' : ''}`}>Página 4</button>
                </div>
              </LinkC>
            </li>
            <li style={{ margin: '10px 0' }}>
              <LinkC href="/listaDisciplinas">
                <div className="LinkC">
                  <button className={`btn ${router.pathname === '/listaDisciplinas' ? 'active' : ''}`}>Página 5</button>
                </div>
              </LinkC>
            </li>
          </ul>
        </div>
        <div style={{ flex: 1, padding: '20px', marginLeft: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {children}
        </div>
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
           width: 8px;
        }

        div::-webkit-scrollbar-thumb {
          background-color: rgb(0, 119, 204);
           border-radius: 4px;
        }
        .btn {
          display: block;
          padding: 35px 35px;
          color: rgb(255, 255, 255);
          background-color: rgb(0, 119, 204);
          cursor: pointer;
          border: none;
          font-size: 18px;
          font-weight: 500;
          text-align: center;
        }

        .btn:hover {
          background-color: rgb(0, 255, 163);
        }

        .active {
          background-color: rgb(0, 95, 163);
        }
      `}</style>
    </>
  );
};

export default Layout;
