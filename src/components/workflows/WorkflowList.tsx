import { FC, useState } from 'react';
import { Play, Pause, Settings, Plus, ArrowRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { WorkflowForm } from '../forms/WorkflowForm';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused';
  steps: number;
  completedSteps: number;
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'DataFlow Application Process',
    description: 'Standard workflow for processing DataFlow applications',
    status: 'active',
    steps: 5,
    completedSteps: 3
  },
  {
    id: '2',
    name: 'Mumaris Document Verification',
    description: 'Document verification process for Mumaris applications',
    status: 'paused',
    steps: 4,
    completedSteps: 2
  },
  {
    id: '3',
    name: 'Client Onboarding',
    description: 'New client registration and document collection',
    status: 'active',
    steps: 3,
    completedSteps: 1
  }
];

const WorkflowList: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      console.log('Creating workflow:', data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating workflow:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
        <p className="text-gray-500">Manage and automate your business processes</p>
      </div>

      <div className="mb-6">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWorkflows.map((workflow) => (
          <div key={workflow.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  workflow.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {workflow.status.toUpperCase()}
                </span>
              </div>
              
              <p className="text-gray-500 text-sm mb-4">{workflow.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((workflow.completedSteps / workflow.steps) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(workflow.completedSteps / workflow.steps) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {workflow.status === 'active' ? (
                    <button className="p-2 text-gray-400 hover:text-gray-900">
                      <Pause className="h-5 w-5" />
                    </button>
                  ) : (
                    <button className="p-2 text-gray-400 hover:text-gray-900">
                      <Play className="h-5 w-5" />
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-900">
                    <Settings className="h-5 w-5" />
                  </button>
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Workflow"
      >
        <WorkflowForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};

export default WorkflowList;
