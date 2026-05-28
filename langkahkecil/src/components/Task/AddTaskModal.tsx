import { useState } from 'react';
import { useStore } from '@/store';
import { Modal } from '@/components/Common/Modal';
import { Button } from '@/components/Common/Button';
import { Input } from '@/components/Common/Input';
import { ColorPicker } from './ColorPicker';
import { TaskColor } from '@/types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const addTask = useStore((s) => s.addTask);
  const lang = useStore((s) => s.settings.language);
  const [name, setName] = useState('');
  const [color, setColor] = useState<TaskColor>('blue');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setError(lang === 'id' ? 'Nama tugas harus diisi' : 'Task name is required');
      return;
    }
    addTask(name.trim(), color);
    setName('');
    setColor('blue');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={lang === 'id' ? 'Tambah Tugas' : 'Add Task'}>
      <div className="flex flex-col gap-4">
        <Input
          label={lang === 'id' ? 'Nama Tugas' : 'Task Name'}
          value={name}
          onChange={(e) => { setName(e.target.value); setError(''); }}
          placeholder={lang === 'id' ? 'Contoh: Belajar React' : 'e.g. Study React'}
          error={error}
          autoFocus
        />
        <ColorPicker selected={color} onChange={setColor} />
        <div className="flex gap-3 justify-end mt-2">
          <Button variant="secondary" onClick={onClose}>
            {lang === 'id' ? 'Batal' : 'Cancel'}
          </Button>
          <Button onClick={handleSubmit}>
            {lang === 'id' ? 'Simpan' : 'Save'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
