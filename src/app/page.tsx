'use client';

import { useState, useEffect } from 'react';
import { Task, Filter } from '../types';

import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('todas');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tasks');
      if (saved) setTasks(JSON.parse(saved));
    } catch {
      // Falha silenciosa
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, loaded]);

  function addTask(text: string) {
    const clean = text.trim();
    if (!clean) return;

    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: clean,
        completed: false,
        color: '#7c3aed',
        tilt: 0,
      },
    ]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'pendientes') return !task.completed;
    if (filter === 'completadas') return task.completed;
    return true;
  });

  const pendingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - pendingCount;
  const progress =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <main className='dashboard'>
      <div className='dashboard-wrapper'>
        <header className='topbar'>
          <div className='brand'>
            <div className='brand-icon'>✓</div>
            <span>Taskflow</span>
          </div>

          <span className='topbar-label'>MEU ESPAÇO PESSOAL</span>
        </header>

        <section className='welcome-section'>
          <div>
            <p className='eyebrow'>SEU ESPAÇO DE PRODUTIVIDADE</p>
            <h1>Organize seu dia.</h1>
            <p className='welcome-description'>
              Um passo de cada vez. Mantenha seus objetivos em ordem e alcance
              suas metas diárias.
            </p>
          </div>

          <div className='date-card'>
            <span>PROGRESSO GERAL</span>
            <strong>{progress}%</strong>
            <div className='progress-track'>
              <div
                className='progress-fill'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </section>

        <section className='stats-grid'>
          <article className='stat-card'>
            <span className='stat-icon purple'>▤</span>
            <div>
              <p>Total de tarefas</p>
              <strong>{tasks.length}</strong>
            </div>
          </article>

          <article className='stat-card'>
            <span className='stat-icon orange'>◷</span>
            <div>
              <p>Pendentes</p>
              <strong>{pendingCount}</strong>
            </div>
          </article>

          <article className='stat-card'>
            <span className='stat-icon green'>✓</span>
            <div>
              <p>Concluídas</p>
              <strong>{completedCount}</strong>
            </div>
          </article>
        </section>

        <section className='tasks-panel'>
          <div className='panel-heading'>
            <div>
              <h2>Minhas Tarefas</h2>
              <p>Gerencie e acompanhe suas atividades diárias.</p>
            </div>

            <span className='task-counter'>{pendingCount} pendente(s)</span>
          </div>

          <div className='filters-container'>
            <TaskFilters
              filter={filter}
              onChange={setFilter}
              total={tasks.length}
              pending={pendingCount}
            />
          </div>

          {tasks.length === 0 ? (
            <div className='empty-state'>
              <div className='empty-icon'>✦</div>
              <h3>Tudo começa aqui</h3>
              <p>
                Você ainda não tem tarefas. Adicione uma nova atividade para
                começar o seu dia.
              </p>
            </div>
          ) : visibleTasks.length === 0 ? (
            <div className='empty-state'>
              <div className='empty-icon'>✓</div>
              <h3>Nenhuma tarefa nesta categoria</h3>
              <p>Tente selecionar outro filtro acima.</p>
            </div>
          ) : (
            <ul className='todo-list'>
              {visibleTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </ul>
          )}

          <div className='task-form-container'>
            <TaskForm onAdd={addTask} />
          </div>
        </section>

        <footer className='dashboard-footer'>
          <span>Taskflow © 2026</span>
          <span>Pequenos passos, grandes resultados.</span>
        </footer>
      </div>
    </main>
  );
}
