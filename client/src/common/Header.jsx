export default function Header()
{

    return(
        <header className="site-header">
            <div className="header-inner">
                <div className="header-left">
                    <div className="logo-badge" aria-hidden="true">
                        <span className="logo-text">G5</span>
                        <img src="/src/assets/img/header/apple-logo.png" alt="Apple Logo" className="logo-image" />
                    </div>
                </div>

                <div className="header-center">
                    <h1 className="site-title">Trabajo Integrador - Programación Web</h1>
                    <p className="site-subtitle">Grupo 5 — ejercicios y proyectos</p>
                </div>

                <div className="header-right">
                    {}
                </div>
            </div>
        </header>
    );
}