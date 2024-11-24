import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const communicationSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  type: z.enum(['email', 'whatsapp']),
  subject: z.string().min(1, 'Subject is required').optional(),
  message: z.string().min(1, 'Message is required'),
  template: z.string().optional(),
});

type CommunicationFormData = z.infer<typeof communicationSchema>;

interface CommunicationFormProps {
  type: 'email' | 'whatsapp';
  onSubmit: (data: CommunicationFormData) => void;
}

export function CommunicationForm({ type, onSubmit }: CommunicationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommunicationFormData>({
    resolver: zodResolver(communicationSchema),
    defaultValues: { type },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Client ID</label>
        <input
          type="text"
          {...register('clientId')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.clientId && (
          <p className="mt-1 text-sm text-red-600">{errors.clientId.message}</p>
        )}
      </div>

      {type === 'email' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            {...register('subject')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Template</label>
        <select
          {...register('template')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">Select template</option>
          <option value="document_request">Document Request</option>
          <option value="application_update">Application Update</option>
          <option value="verification_complete">Verification Complete</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          {...register('message')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={4}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : `Send ${type === 'email' ? 'Email' : 'WhatsApp'}`}
      </button>
    </form>
  );
}