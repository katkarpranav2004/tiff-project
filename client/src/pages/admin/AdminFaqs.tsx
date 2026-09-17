import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Pencil } from 'lucide-react';
import { api } from '../../lib/api';
import { Spinner, EmptyState } from '../../components/ui/Primitives';
import { AdminPageTitle, AddButton, Modal, Field, SaveBar, adminInput, adminTextarea } from './AdminShared';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  isPublished: boolean;
}

const empty = { question: '', answer: '', order: 0, isPublished: true };

const AdminFaqs = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'faqs'],
    queryFn: async () => (await api.get('/faqs/all')).data.data as FAQ[],
  });

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (f: FAQ) => { setEditing(f); setForm({ question: f.question, answer: f.answer, order: f.order, isPublished: f.isPublished }); setOpen(true); };

  const save = useMutation({
    mutationFn: async () => {
      const payload = { ...form, order: Number(form.order) || 0 };
      return editing ? (await api.put(`/faqs/${editing.id}`, payload)).data : (await api.post('/faqs', payload)).data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'faqs'] }); setOpen(false); },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/faqs/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'faqs'] }),
  });

  return (
    <div>
      <AdminPageTitle title="FAQs" subtitle="Manage frequently asked questions." action={<AddButton onClick={openNew} label="Add FAQ" />} />

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner className="h-8 w-8 text-brand" /></div>
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No FAQs yet" />
      ) : (
        <div className="space-y-3">
          {(data ?? []).map((f) => (
            <div key={f.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{f.question}</p>
                  <p className="mt-1 text-sm text-slate-600">{f.answer}</p>
                  {!f.isPublished && <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">Hidden</span>}
                </div>
                <div className="flex shrink-0">
                  <button onClick={() => openEdit(f)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove.mutate(f.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <Modal title={editing ? 'Edit FAQ' : 'Add FAQ'} onClose={() => setOpen(false)}>
          <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-4">
            <Field label="Question"><input required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className={adminInput} /></Field>
            <Field label="Answer"><textarea required rows={4} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className={adminTextarea} /></Field>
            <div className="grid grid-cols-2 items-end gap-3">
              <Field label="Order"><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={adminInput} /></Field>
              <label className="flex h-10 items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
                Published
              </label>
            </div>
            {save.isError && <p className="text-sm text-red-600">Could not save. Check the fields and try again.</p>}
            <SaveBar pending={save.isPending} onCancel={() => setOpen(false)} />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminFaqs;
