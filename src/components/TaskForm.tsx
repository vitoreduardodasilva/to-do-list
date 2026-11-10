'use client';

import { useState } from 'react';

type Props = {
  onAdd: (text: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [text, setText] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!text.trim()) return;

    onAdd(text);
    setText('');
  }

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <div className='input-wrapper'>
        <span className='input-plus'>+</span>
        <input
          type='text'
          placeholder='¿O que você precisa fazer??'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button type='submit'>
        Agregar tarea
        <span>+</span>
      </button>
    </form>
  );
}
