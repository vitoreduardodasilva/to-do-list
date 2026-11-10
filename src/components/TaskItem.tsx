import { Task } from '../types';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <label className='task-checkbox'>
        <input
          type='checkbox'
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className='checkmark'></span>
      </label>

      <span className='task-text'>{task.text}</span>

      <button
        type='button'
        className='delete-btn'
        onClick={() => onDelete(task.id)}
        aria-label='Eliminar tarea'
        title='Eliminar tarea'
      >
        <svg
          viewBox='0 0 24 24'
          width='18'
          height='18'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.8'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M3 6h18' />
          <path d='M8 6V4h8v2' />
          <path d='m19 6-1 14H6L5 6' />
          <path d='M10 11v5M14 11v5' />
        </svg>
      </button>
    </li>
  );
}
