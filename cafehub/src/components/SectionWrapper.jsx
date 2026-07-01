import { Container } from 'react-bootstrap'

function SectionWrapper({ title, subtitle, children, backgroundColor = '#fff' }) {
  return (
    <section style={{ backgroundColor, padding: '32px 0' }}>
      <Container>
        <h2>{title}</h2>
        {subtitle && <p className="text-muted">{subtitle}</p>}
        {children}
      </Container>
    </section>
  )
}

export default SectionWrapper