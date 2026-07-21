import { Container } from 'react-bootstrap'

function SectionWrapper({ title, subtitle, children, backgroundColor = 'transparent' }) {
  return (
    <section
      className="py-4 py-md-5 transition-all"
      style={{ backgroundColor }}
    >
      <Container>
        <div className="mb-4 mb-md-5">
          <div className="section-title-box mb-2">
            <h2 className="font-heading fs-3 fs-md-2 fw-bold mb-0">{title}</h2>
          </div>
          {subtitle && <p className="text-muted small mb-0 font-body opacity-85">{subtitle}</p>}
        </div>
        {children}
      </Container>
    </section>
  )
}

export default SectionWrapper