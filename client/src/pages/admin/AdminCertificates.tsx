import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Loader2, Search, Plus, Trash2, FileText, Upload } from 'lucide-react';
import { format } from 'date-fns';

const AdminCertificates = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    caieNumber: '',
    candidateName: '',
    courseName: '',
    issueDate: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');

  // Fetch Certificates
  const { data, isLoading } = useQuery({
    queryKey: ['adminCertificates', searchTerm],
    queryFn: async () => {
      const res = await api.get('/certificates', { params: { search: searchTerm || undefined } });
      return res.data;
    },
  });

  // Create Certificate Mutation
  const createMutation = useMutation({
    mutationFn: async () => {
      const form = new FormData();
      form.append('caieNumber', formData.caieNumber);
      form.append('candidateName', formData.candidateName);
      form.append('courseName', formData.courseName);
      form.append('issueDate', formData.issueDate);
      if (file) {
        form.append('file', file);
      }

      const res = await api.post('/certificates', form);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCertificates'] });
      setShowAddModal(false);
      setFormData({ caieNumber: '', candidateName: '', courseName: '', issueDate: '' });
      setFile(null);
      setUploadError('');
    },
    onError: (error: any) => {
      setUploadError(error.response?.data?.error || 'Failed to create certificate');
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/certificates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCertificates'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Certificates</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and issue CAIE certificates</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-brand hover:bg-brand-secondary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Issue Certificate
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by CAIE, Candidate, or Course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-brand focus:border-brand"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">CAIE Number</th>
                <th className="px-6 py-3">Candidate</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Issue Date</th>
                <th className="px-6 py-3">File</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 text-brand animate-spin mx-auto" />
                  </td>
                </tr>
              ) : data?.data?.length > 0 ? (
                data.data.map((cert: any) => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-medium text-gray-800">{cert.caieNumber}</td>
                    <td className="px-6 py-4 font-medium text-navy">{cert.candidateName}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{cert.courseName}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {format(new Date(cert.issueDate), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      {cert.certificateFileUrl ? (
                        <a href={cert.certificateFileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                          <FileText size={16} /> View
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">No file</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this certificate?')) {
                            deleteMutation.mutate(cert.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No certificates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy">Issue New Certificate</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {uploadError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {uploadError}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CAIE Number</label>
                <input
                  required
                  type="text"
                  placeholder="CAIE-XXXX-XXXX"
                  value={formData.caieNumber}
                  onChange={(e) => setFormData({ ...formData, caieNumber: e.target.value })}
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border focus:ring-brand focus:border-brand uppercase"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
                <input
                  required
                  type="text"
                  value={formData.candidateName}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border focus:ring-brand focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course / Program</label>
                <input
                  required
                  type="text"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border focus:ring-brand focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                <input
                  required
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  className="w-full border-gray-300 rounded-lg px-3 py-2 border focus:ring-brand focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate File (PDF/Image)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand hover:text-brand-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf,image/*"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {file ? file.name : 'PNG, JPG, PDF up to 10MB'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand-secondary flex items-center gap-2"
                >
                  {createMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Issue Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertificates;
