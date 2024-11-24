import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

const qualificationTypes = [
  'MBBS',
  'MD',
  'BDS',
  'PharmD',
  'BSc Nursing',
  'MSc Nursing',
  'Other'
] as const;

const packageTypes = [
  'Basic',
  'Standard',
  'Premium'
] as const;

const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  passportNumber: z.string().min(5, 'Passport number is required'),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Valid date of birth is required'
  }),
  dataflowCaseNumber: z.string().optional(),
  applicationDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Valid application date is required'
  }),
  expectedCompletionDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Valid expected completion date is required'
  }),
  qualification: z.object({
    type: z.enum(qualificationTypes),
    specialization: z.string().optional(),
    yearCompleted: z.string().optional(),
  }),
  packageType: z.enum(packageTypes),
  paymentAmount: z.number().min(0, 'Payment amount must be positive'),
  address: z.string().min(1, 'Address is required'),
  notes: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => void;
  initialData?: Partial<ClientFormData>;
}

export function ClientForm({ onSubmit, initialData }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      ...initialData,
      applicationDate: initialData?.applicationDate || format(new Date(), 'yyyy-MM-dd'),
    },
  });

  const qualificationType = watch('qualification.type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              {...register('name')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Passport Number</label>
            <input
              type="text"
              {...register('passportNumber')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.passportNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.passportNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
            <input
              type="date"
              {...register('dateOfBirth')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <input
              type="tel"
              {...register('phone')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <textarea
              {...register('address')}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Application Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Application Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">DataFlow Case Number</label>
            <input
              type="text"
              {...register('dataflowCaseNumber')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Application Date</label>
            <input
              type="date"
              {...register('applicationDate')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.applicationDate && (
              <p className="mt-1 text-sm text-red-600">{errors.applicationDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expected Completion Date</label>
            <input
              type="date"
              {...register('expectedCompletionDate')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.expectedCompletionDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expectedCompletionDate.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Qualification Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Qualification Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Qualification Type</label>
            <select
              {...register('qualification.type')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="">Select qualification</option>
              {qualificationTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.qualification?.type && (
              <p className="mt-1 text-sm text-red-600">{errors.qualification.type.message}</p>
            )}
          </div>

          {qualificationType && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specialization</label>
                <input
                  type="text"
                  {...register('qualification.specialization')}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year Completed</label>
                <input
                  type="text"
                  {...register('qualification.yearCompleted')}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Package and Payment */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Package and Payment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Package Type</label>
            <select
              {...register('packageType')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="">Select package</option>
              {packageTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.packageType && (
              <p className="mt-1 text-sm text-red-600">{errors.packageType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Amount</label>
            <input
              type="number"
              {...register('paymentAmount', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.paymentAmount && (
              <p className="mt-1 text-sm text-red-600">{errors.paymentAmount.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Additional Notes</label>
        <textarea
          {...register('notes')}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? 'Adding...' : 'Add Client'}
      </button>
    </form>
  );
}