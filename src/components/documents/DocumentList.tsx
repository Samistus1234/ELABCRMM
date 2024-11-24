import React, { useState } from 'react';
import { format } from 'date-fns';
import { FileText, Search, Filter, Download, MoreVertical } from 'lucide-react';
import { Document } from '../../types';
import { Modal } from '../ui/Modal';
import { DocumentForm } from '../forms/DocumentForm';

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Passport.pdf',
    status: 'approved',
    type: 'Identification',
    uploadedAt: new Date('2024-03-15'),
    url: 'https://example.com/docs/passport.pdf'
  },
  {
    id: '2',
    name: 'Medical_License.pdf',
    status: 'pending',
    type: 'License',
    uploadedAt: new Date('2024-03-14'),
    url: 'https://example.com/docs/license.pdf'
  },
  {
    id: '3',
    name: 'Certificate.pdf',
    status: 'rejected',
    type: 'Certificate',
    uploadedAt: new Date('2024-03-13'),
    url: 'https://example.com/docs/cert.pdf'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

export function DocumentList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      console.log('Uploading document:', data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-500">Manage and track all document submissions</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Upload Document
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockDocuments.map((document) => (
              <tr key={document.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{document.name}</div>
                      <div className="text-sm text-gray-500">ID: {document.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{document.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    statusColors[document.status]
                  }`}>
                    {document.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(document.uploadedAt, 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-900">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-900">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Document"
      >
        <DocumentForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}