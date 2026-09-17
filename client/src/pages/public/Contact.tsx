import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { MapPin, Mail, Send, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { Container, Spinner } from '../../components/ui/Primitives';
import { api } from '../../lib/api';
import { CONTACT_EMAIL, REGISTERED_ADDRESS, COMMUNICATION_ADDRESS } from '../../lib/site';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const mutation = useMutation({
    mutationFn: async () => (await api.post('/contact', form)).data,
    onSuccess: () => setForm({ name: '', email: '', subject: '', message: '' }),
  });

  const field = 'h-11 w-full rounded-md border border-slate-200 px-4 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand';

  return (
    <div>
      <PageHeader
        eyebrow="Reach out"
        title="Get in touch"
        description="Questions about incubation, courses or partnerships? We'd love to hear from you."
      />

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Info */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-slate-200 bg-surface-alt p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand-dark">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold text-ink">Email</h3>
              <p className="mt-1 text-sm text-slate-600">For applications, please reach out to us at:</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 inline-block font-medium text-brand-dark hover:underline">
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand-dark">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold text-ink">Communication Address</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {COMMUNICATION_ADDRESS.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand-dark">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold text-ink">Registered Address</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {REGISTERED_ADDRESS.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
              <h3 className="font-heading text-xl font-semibold text-ink">Send a message</h3>

              {mutation.isSuccess ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-ink">Message sent</h4>
                  <p className="mt-1 text-sm text-slate-600">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button onClick={() => mutation.reset()} className="mt-5 text-sm font-medium text-brand-dark underline underline-offset-4">
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
                  className="mt-5 space-y-4"
                >
                  {mutation.isError && (
                    <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                      Something went wrong. Please try again.
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
                    <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={field} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full resize-none rounded-md border border-slate-200 px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                  </div>
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand px-5 font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
                  >
                    {mutation.isPending ? <Spinner className="h-5 w-5" /> : <>Send message <Send className="h-4 w-4" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
