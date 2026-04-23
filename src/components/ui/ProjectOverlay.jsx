import '../../styles/overlay.css'

export function ProjectOverlay({ project }) {
  return (
    <div className="project-overlay">
      <div className="project-overlay__inner">
        <h2 className="project-overlay__title">{project.title}</h2>
        <div className="project-overlay__tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-overlay__tag">{tag}</span>
          ))}
        </div>
        <p className="project-overlay__desc">{project.description}</p>
        <div className="project-overlay__links" style={{ pointerEvents: 'auto' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="project-overlay__link">
              GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="project-overlay__link project-overlay__link--live">
              Live Site
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
