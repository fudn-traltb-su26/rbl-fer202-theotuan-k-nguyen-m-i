function CategoryCard({ name, description }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted">{description}</p>
      </div>
    </div>
  )
}

export default CategoryCard
