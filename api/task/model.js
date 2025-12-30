const db = require('../../data/db-config');

async function getAll() {
  const tasks = await db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      't.project_id',
      'p.project_name',
      'p.project_description'
    );
  
  return tasks.map(task => ({
    ...task,
    task_completed: task.task_completed === 1,
  }));
}

async function create(task) {
  const [task_id] = await db('tasks').insert(task);
  const newTask = await db('tasks').where({ task_id }).first();
  return {
    ...newTask,
    task_completed: newTask.task_completed === 1,
  };
}

module.exports = {
  getAll,
  create,
};
