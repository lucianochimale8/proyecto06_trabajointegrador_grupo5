import miembros from "../data/Miembros.js";

const AboutMiembros = () => {
  const getGradientColor = (index) => {
    const gradients = [
      // Gallo - Morado Cálido
      'linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(168, 85, 247, 0.8) 50%, rgba(139, 92, 246, 0.6) 100%)',
      // Pato - Verde Celeste
      'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(16, 185, 129, 0.6) 50%, rgba(6, 182, 212, 0.4) 100%)',
      // Valentina - Rosa Pastel Cálido
      'linear-gradient(135deg, rgba(251, 191, 207, 0.9) 0%, rgba(244, 63, 94, 0.8) 50%, rgba(219, 39, 119, 0.6) 100%)',
      // Victor - Celeste
      'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(96, 165, 250, 0.6) 50%, rgba(147, 197, 253, 0.4) 100%)',
      // Chimale - Azul Morado
      'linear-gradient(135deg, rgba(67, 56, 202, 0.8) 0%, rgba(99, 102, 241, 0.6) 50%, rgba(139, 92, 246, 0.4) 100%)'
    ];
    return gradients[index % gradients.length];
  };

  const getIconColor = (index) => {
    const colors = [
      '#ffffff', // Gallo - Blanco para contraste con morado
      '#ffffff', // Pato - Blanco para contraste con verde
      '#ffffff', // Valentina - Blanco para contraste con rosa
      '#ffffff', // Victor - Blanco para contraste con celeste
      '#ffffff'  // Chimale - Blanco para contraste con azul morado
    ];
    return colors[index % colors.length];
  };

  return (
    <>
    <section className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <div className="floating">
          <h2 className="display-3 mb-4" style={{
            background: 'linear-gradient(45deg, #4a90e2, #87ceeb, #8b5cf6, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(74, 144, 226, 0.3)'
          }}>
            About Us
          </h2>
          <p className="lead mb-0" style={{
            color: '#4a90e2',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}>
            Conoce al increíble equipo detrás de este proyecto
          </p>
        </div>
      </div>

      {/* Fila de 3 integrantes */}
      <div className="row justify-content-center mb-5">
        {miembros.slice(0, 3).map((member, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
            <div className="card border-0 floating" style={{ 
              width: "18rem",
              height: "26rem",
              background: getGradientColor(index),
              backdropFilter: 'blur(15px)',
              animationDelay: `${index * 0.2}s`,
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }}>
              <div className="position-relative">
                <img 
                  src={member.img} 
                  className="card-img-top" 
                  alt={member.name}
                  style={{
                    height: '280px',
                    width: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(1.1) contrast(1.1)',
                    borderRadius: '13px 13px 0 0'
                  }}
                />
              </div>
              <div className="card-body text-center" style={{padding: '1rem'}}>
                <h5 className="card-title mb-2 fw-bold" style={{
                  color: '#ffffff',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  fontSize: '1rem'
                }}>{member.name}</h5>
                <p className="card-text mb-2" style={{
                  color: '#ffffff',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                  fontSize: '0.9rem'
                }}>
                  <i className="fas fa-id-card me-2" style={{color: getIconColor(index)}}></i>
                  {member.lu}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <span className="badge rounded-pill px-3 py-2" style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    backdropFilter: 'blur(5px)'
                  }}>
                    <i className="fas fa-code me-1"></i>Developer
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fila de 2 integrantes */}
      <div className="row justify-content-center">
        {miembros.slice(3, 5).map((member, index) => (
          <div key={index + 3} className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
            <div className="card border-0 floating" style={{ 
              width: "18rem",
              height: "26rem",
              background: getGradientColor(index + 3),
              backdropFilter: 'blur(15px)',
              animationDelay: `${(index + 3) * 0.2}s`,
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              borderRadius: '15px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }}>
              <div className="position-relative">
                <img 
                  src={member.img} 
                  className="card-img-top" 
                  alt={member.name}
                  style={{
                    height: '280px',
                    width: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(1.1) contrast(1.1)',
                    borderRadius: '13px 13px 0 0'
                  }}
                />
              </div>
              <div className="card-body text-center" style={{padding: '1rem'}}>
                <h5 className="card-title mb-2 fw-bold" style={{
                  color: '#ffffff',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  fontSize: '1rem'
                }}>{member.name}</h5>
                <p className="card-text mb-2" style={{
                  color: '#ffffff',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                  fontSize: '0.9rem'
                }}>
                  <i className="fas fa-id-card me-2" style={{color: getIconColor(index + 3)}}></i>
                  {member.lu}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <span className="badge rounded-pill px-3 py-2" style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    backdropFilter: 'blur(5px)'
                  }}>
                    <i className="fas fa-code me-1"></i>Developer
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Stats Section */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="bloom-effect p-4 rounded-4 text-center" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(236, 72, 153, 0.2) 100%)',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(255,255,255,0.4)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 className="mb-4" style={{
              background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
              fontSize: '1.8rem',
              fontWeight: '700'
            }}>
              <i className="fas fa-chart-bar me-3" style={{color: '#8b5cf6'}}></i>
              Estadísticas del Proyecto
            </h3>
            <div className="row text-center">
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="p-3">
                  <i className="fas fa-users fa-2x mb-2" style={{color: '#ffffff', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'}}></i>
                  <h4 className="fw-bold" style={{color: '#3b82f6'}}>5</h4>
                  <p className="mb-0" style={{color: '#6b7280'}}>Integrantes</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="p-3">
                  <i className="fab fa-react fa-2x mb-2" style={{color: '#ffffff', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'}}></i>
                  <h4 className="fw-bold" style={{color: '#10b981'}}>React</h4>
                  <p className="mb-0" style={{color: '#6b7280'}}>Framework</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="p-3">
                  <i className="fas fa-gamepad fa-2x mb-2" style={{color: '#ffffff', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'}}></i>
                  <h4 className="fw-bold" style={{color: '#3b82f6'}}>1+</h4>
                  <p className="mb-0" style={{color: '#6b7280'}}>Juegos</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="p-3">
                  <i className="fas fa-heart fa-2x mb-2" style={{color: '#ffffff', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'}}></i>
                  <h4 className="fw-bold" style={{color: '#ef4444'}}>∞</h4>
                  <p className="mb-0" style={{color: '#6b7280'}}>Pasión</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutMiembros;
