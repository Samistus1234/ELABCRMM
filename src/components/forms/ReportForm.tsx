import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const reportSchema = z.object({
  type: z.string().min(1, 'Report type is required'),
  dateRange: z.string().min(1, 'Date range is required'),
  format: z.string().min(1, 'Export format is required'),
  filters: z.array(z.string()).optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportFormProps {
  onSubmit: (data: ReportFormData) => void;
}

export function ReportForm({ onSubmit }: ReportFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Report Type</label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">Select report type</option>
          <option value="application_summary">Application Summary</option>
          <option value="document_status">Document Status</option>
          <option value="client_activity">Client Activity</option>
          <option value="processing_time">Processing Time Analysis</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date Range</label>
        <select
          {...register('dateRange')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">Select date range</option>
          <option value="last_7_days">Last 7 Days</option>
          <option value="last_30_days">Last 30 Days</option>
          <option value="last_90_days">Last 90 Days</option>
          <option value="custom">Custom Range</option>
        </select>
        {errors.dateRange && (
          <p className="mt-1 text-sm text-red-600">{errors.dateRange.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Export Format</label>
        <select
          {...register('format')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">Select format</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
        </select>
        {errors.format && (
          <p className="mt-1 text-sm text-red-600">{errors.format.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Filters</label>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="include_completed"
              {...register('filters')}
              className="rounded border-gray-300 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-600">Include completed applications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="include_pending"
              {...register('filters')}
              className="rounded border-gray-300 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-600">Include pending applications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="include_rejected"
              {...register('filters')}
              className="rounded border-gray-300 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-600">Include rejected applications</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Generating...' : 'Generate Report'}
      </button>
    </form>
  );
}