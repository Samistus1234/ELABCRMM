import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X } from 'lucide-react';

const workflowSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  steps: z.array(z.object({
    name: z.string().min(1, 'Step name is required'),
    description: z.string(),
    duration: z.number().min(1, 'Duration must be at least 1 day'),
  })).min(1, 'At least one step is required'),
});

type WorkflowFormData = z.infer<typeof workflowSchema>;

interface WorkflowFormProps {
  onSubmit: (data: WorkflowFormData) => void;
}

export function WorkflowForm({ onSubmit }: WorkflowFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<WorkflowFormData>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      steps: [{ name: '', description: '', duration: 1 }],
    },
  });

  const steps = watch('steps');

  const addStep = () => {
    setValue('steps', [...steps, { name: '', description: '', duration: 1 }]);
  };

  const removeStep = (index: number) => {
    setValue('steps', steps.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Workflow Name</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={3}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Steps</label>
          <button
            type="button"
            onClick={addStep}
            className="flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Step
          </button>
        </div>

        {steps.map((_, index) => (
          <div key={index} className="relative p-4 border border-gray-200 rounded-lg">
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Step Name</label>
                <input
                  type="text"
                  {...register(`steps.${index}.name`)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register(`steps.${index}.description`)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
                <input
                  type="number"
                  {...register(`steps.${index}.duration`, { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  min="1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Workflow'}
      </button>
    </form>
  );
}