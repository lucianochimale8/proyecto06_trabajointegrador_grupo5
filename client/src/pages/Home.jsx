export default function Home() {
    return (
        <>
            <main className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {/* Título principal */}
                        <h1 className="text-center text-primary mb-4">
                            Fundamentos de Programación 2025
                        </h1>
                        
                        {/* Grupo */}
                        <h2 className="text-center text-dark mb-4">
                            Grupo 5
                        </h2>
                        
                        {/* Información del grupo */}
                        <h3 className="text-center text-muted mb-4">
                            Universidad Nacional de Jujuy
                        </h3>
                        
                        {/* Descripción */}
                        <p className="lead text-center mb-4">
                            Somos el Grupo 5 de Fundamentos de Programación Web 2025. 
                            Durante este año hemos desarrollado 6 proyectos completos 
                            aplicando las tecnologías más modernas del desarrollo web.
                        </p>
                        
                        {/* Tecnologías */}
                        <p className="text-center mb-4">
                            <strong>Tecnologías que utilizamos:</strong><br/>
                            HTML, CSS, JavaScript, React, Node.js, MongoDB, Bootstrap
                        </p>
                        
                        {/* Proyectos */}
                        <p className="text-center">
                            <strong>Nuestros proyectos:</strong><br/>
                            6 aplicaciones web completas que demuestran nuestro aprendizaje 
                            y crecimiento como desarrolladores.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}