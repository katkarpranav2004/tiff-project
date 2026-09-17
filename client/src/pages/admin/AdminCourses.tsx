import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Pencil } from 'lucide-react';
import { api } from '../../lib/api';
import { Spinner, EmptyState } from '../../components/ui/Primitives';
import { AdminPageTitle, AddButton, Panel, Modal, Field, SaveBar, adminInput, adminTextarea } from './AdminShared';

interface Course {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  level?: string | null;
  duration?: string | null;
  instructorName?: string | null;
  thumbnailUrl?: string | null;
  isPublished: boolean;
}

const empty = {
  title: '', category: '', shortDescription: '', description: '',
  level: 'Beginner', duration: '', instructorName: '', thumbnailUrl: '', isPublished: true,
};

const AdminCourses = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'courses'],
    queryFn: async () => (await api.get('/courses/all')).data.data as Course[],
  });

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (c: Course) => {
    setEditing(c);
    setForm({
      title: c.title, category: c.category, shortDescription: c.shortDescription, description: c.description,
      level: c.level ?? 'Beginner', duration: c.duration ?? '', instructorName: c.instructorName ?? '',
      thumbnailUrl: c.thumbnailUrl ?? '', isPublished: c.isPublished,
    });
    setOpen(true);
  };

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        duration: form.duration || undefined,
        instructorName: form.instructorName || undefined,
        thumbnailUrl: form.thumbnailUrl || undefined,
      };
      return editing
        ? (await api.put(`/courses/${editing.id}`, payload)).data
        : (await api.post('/courses', payload)).data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'courses'] });
      qc.invalidateQueries({ queryKey: ['courses'] });
      qc.invalidateQueries({ queryKey: ['courseCategories'] });
      setOpen(false);
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/courses/${id}`)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'courses'] });
      qc.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  return (
    <div>
      <AdminPageTitle title="Courses" subtitle="Manage learning programmes shown on the site." action={<AddButton onClick={openNew} label="Add course" />} />

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner className="h-8 w-8 text-brand" /></div>
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No courses yet" description="Click “Add course” to publish your first one." />
      ) : (
        <Panel>
          <table className="w-full text-sm">
            <thead className="bg-surface-alt text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data ?? []).map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium text-ink">{c.title}</td>
                  <td className="px-4 py-3 text-slate-600">{c.category}</td>
                  <td className="px-4 py-3 text-slate-600">{c.level}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.isPublished ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      {c.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(c)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm('Delete this course?')) remove.mutate(c.id); }} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      {open && (
        <Modal title={editing ? 'Edit course' : 'Add course'} onClose={() => setOpen(false)}>
          <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-4">
            <Field label="Title"><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={adminInput} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category"><input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={adminInput} /></Field>
              <Field label="Level">
                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className={adminInput}>
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </Field>
            </div>
            <Field label="Short description"><input required value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className={adminInput} /></Field>
            <Field label="Description"><textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={adminTextarea} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Duration"><input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className={adminInput} placeholder="e.g. 6 weeks" /></Field>
              <Field label="Instructor"><input value={form.instructorName} onChange={(e) => setForm({ ...form, instructorName: e.target.value })} className={adminInput} /></Field>
            </div>
            <Field label="Thumbnail URL"><input value={form.thumbnailUrl} onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })} className={adminInput} placeholder="https://…" /></Field>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
              Published (visible on the site)
            </label>
            {save.isError && <p className="text-sm text-red-600">Could not save. Check required fields.</p>}
            <SaveBar pending={save.isPending} onCancel={() => setOpen(false)} />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminCourses;
