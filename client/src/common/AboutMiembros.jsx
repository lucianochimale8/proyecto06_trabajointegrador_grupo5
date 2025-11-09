import miembros from "../data/Miembros.js";

const AboutMiembros = () => {
  const getGradientColor = (index) => {
    const gradients = [
      'linear-gradient(135deg, var(--accent-color-1) 0%, var(--accent-color-2) 100%)',
      'linear-gradient(135deg, var(--accent-color-3) 0%, var(--accent-color-4) 100%)',
      'linear-gradient(135deg, var(--accent-color-2) 0%, var(--accent-color-1) 100%)',
      'linear-gradient(135deg, var(--accent-color-4) 0%, var(--accent-color-3) 100%)',
      'linear-gradient(135deg, var(--accent-color-1) 0%, var(--accent-color-3) 100%)'
    ];
    return gradients[index % gradients.length];
  };

  const getIconColor = (index) => {
    const colors = [
      'var(--white-pure)',
      'var(--white-pure)',
      'var(--white-pure)',
      'var(--white-pure)',
      'var(--white-pure)'
    ];
    return colors[index % colors.length];
  };

  return (
    <>
    <section className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <div className="floating">
          <h2 className="display-3 mb-4 about-heading">
            About Us
          </h2>
          <p className="lead mb-0 about-subtitle">
            Conoce al increíble equipo detrás de este proyecto
          </p>
        </div>
      </div>

      {/* Fila de 3 integrantes */}
      <div className="row justify-content-center mb-5">
        {miembros.slice(0, 3).map((member, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
            <div className="card border-0 floating member-card" style={{ 
              background: getGradientColor(index),
              animationDelay: `${index * 0.2}s`,
            }}
            >
              <div className="position-relative">
                <img 
                  src={member.img} 
                  className="card-img-top member-image" 
                  alt={member.name}
                />
              </div>
              <div className="card-body text-center" style={{padding: '1rem'}}>
                <h5 className="card-title mb-2 fw-bold member-name">{member.name}</h5>
                <p className="card-text mb-2 member-lu">
                  <i className="fas fa-id-card me-2" style={{color: getIconColor(index)}}></i>
                  {member.lu}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <span className="badge rounded-pill px-3 py-2 member-badge">
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
            <div className="card border-0 floating member-card" style={{ 
              background: getGradientColor(index + 3),
              animationDelay: `${(index + 3) * 0.2}s`,
            }}>
              <div className="position-relative">
                <img 
                  src={member.img} 
                  className="card-img-top member-image" 
                  alt={member.name}
                />
              </div>
              <div className="card-body text-center" style={{padding: '1rem'}}>
                <h5 className="card-title mb-2 fw-bold member-name">{member.name}</h5>
                <p className="card-text mb-2 member-lu">
                  <i className="fas fa-id-card me-2" style={{color: getIconColor(index + 3)}}></i>
                  {member.lu}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <span className="badge rounded-pill px-3 py-2 member-badge">
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
          <div className="bloom-effect p-4 rounded-4 text-center stats-container">
            <h3 className="mb-4 stats-heading">
              <i className="fas fa-chart-bar me-3 stats-icon"></i>
              Estadísticas del Proyecto
            </h3>
            <div className="row text-center">
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="p-3">
                  <i className="fas fa-users fa-2x mb-2 stats-icon"></i>
                  <h4 className="fw-bold stats-number">5</h4>
                  <p className="mb-0 stats-label">Integrantes</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="p-3">
                  <i className="fab fa-react fa-2x mb-2 stats-icon"></i>
                  <h4 className="fw-bold stats-number">React</h4>
                  <p className="mb-0 stats-label">Framework</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="p-3">
                  <i className="fas fa-gamepad fa-2x mb-2 stats-icon"></i>
                  <h4 className="fw-bold stats-number">1+</h4>
                  <p className="mb-0 stats-label">Juegos</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="p-3">
                  <i className="fas fa-heart fa-2x mb-2 stats-icon"></i>
                  <h4 className="fw-bold stats-number">∞</h4>
                  <p className="mb-0 stats-label">Pasión</p>
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