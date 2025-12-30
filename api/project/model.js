const db = require('../../data/db-config');

async function getAll() {
  const projects = await db('projects');
  return projects.map(project => ({
    ...project,
    project_completed: project.project_completed === 1,
  }));
}

async function create(project) {
  const [project_id] = await db('projects').insert(project);
  const newProject = await db('projects').where({ project_id }).first();
  return {
    ...newProject,
    project_completed: newProject.project_completed === 1,
  };
}

module.exports = {
  getAll,
  create,
};
