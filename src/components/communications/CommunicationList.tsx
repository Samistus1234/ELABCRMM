import React, { useState } from 'react';
import { format } from 'date-fns';
import { MessageCircle, Mail, Search, Filter, MoreVertical } from 'lucide-react';
import { Communication } from '../../types';
import { Modal } from '../ui/Modal';
import { CommunicationForm } from '../forms/CommunicationForm';

const mockCommunications: Communication[] = [
  {
    id: '1',
    clientId: '1',
    applicationId: '1',
    type: 'email',
    content: 'Your application has been received',
    sentAt: new Date('2024-03-15T10:00:00'),
    status: 'delivered'
  },
  {
    id: '2',
    clientId: '2',
    applicationId: '2',
    type: 'whatsapp',
    content: 'Documents pending review',
    sentAt: new Date('2024-03-15T09:30:00'),
    status: 'read'
  },
  {
    id: '3',
    clientId: '3',
    applicationId: '3',
    type: 'email',
    content: 'Additional documents required',
    sentAt: new Date('2024-03-15T09:00:00'),
    status: 'sent'
  }
];

const statusColors = {
  sent: 'bg-blue-100 text-blue-800',
  delivered: 'bg-yellow-100 text-yellow-800',
  read: 'bg-green-100 text-green-800'
};

export function CommunicationList() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const handleEmailSubmit = async (data: any) => {
    try {
      console.log('Sending email:', data);
      setIsEmailModalOpen(false);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleWhatsAppSubmit = async (data: any) => {
    try {
      console.log('Sending WhatsApp:', data);
      setIsWhatsAppModalOpen(false);
    } catch (error) {
      console.error('Error sending WhatsApp:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
        <p className="text-gray-500">Track all client communications</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search communications..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Send WhatsApp
          </button>
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Mail className="h-5 w-5 mr-2" />
            Send Email
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Communication
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sent At
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockCommunications.map((communication) => (
              <tr key={communication.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      {communication.type === 'email' ? (
                        <Mail className="h-5 w-5 text-blue-600" />
                      ) : (
                        <MessageCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {communication.content}
                      </div>
                      <div className="text-sm text-gray-500">
                        Client ID: {communication.clientId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 capitalize">
                    {communication.type}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    statusColors[communication.status]
                  }`}>
                    {communication.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(communication.sentAt, 'MMM d, yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-900">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="Send Email"
      >
        <CommunicationForm type="email" onSubmit={handleEmailSubmit} />
      </Modal>

      <Modal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        title="Send WhatsApp Message"
      >
        <CommunicationForm type="whatsapp" onSubmit={handleWhatsAppSubmit} />
      </Modal>
    </div>
  );
}