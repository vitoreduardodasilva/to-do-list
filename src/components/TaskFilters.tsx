import { Filter } from '../types';

type Props = {
  filter: Filter;
  onChange: (filter: Filter) => void;
  total: number;
  pending: number;
};

const OPTIONS: { value: Filter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendientes', label: 'Pendientes' },
  { value: 'completadas', label: 'Completadas' },
];

export default function TaskFilters({ filter, onChange }: Props) {
  return (
    <div className='todo-filters'>
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type='button'
          className={filter === option.value ? 'active' : ''}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
