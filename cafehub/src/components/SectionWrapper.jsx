import { Container } from 'react-bootstrap'

function SectionWrapper({ title, subtitle, children, backgroundColor = 'transparent' }) {
  return (
    <section
      className="py-4 py-md-5 border-bottom border-secondary-subtle"
      style={{ backgroundColor }}
    >
      <Container>
        <div className="mb-3 mb-md-4">
          <h2 className="fs-4 fs-md-3 fw-bold mb-1">{title}</h2>
          {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
        </div>
        {children}
      </Container>
    </section>
  )
}

export default SectionWrapper