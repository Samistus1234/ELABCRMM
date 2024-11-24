import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Filter, Calendar } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { ReportForm } from '../forms/ReportForm';

const mockReports = [
  {
    id: '1',
    name: 'Application Processing Time',
    description: 'Average time taken to process applications',
    type: 'bar',
    lastUpdated: '2 hours ago',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      values: [12, 15, 10, 8, 13],
      unit: 'days'
    }
  },
  {
    id: '2',
    name: 'Document Status Distribution',
    description: 'Distribution of document verification statuses',
    type: 'pie',
    lastUpdated: '1 hour ago',
    data: {
      labels: ['Approved', 'Pending', 'Rejected'],
      values: [65, 25, 10],
      unit: 'percentage'
    }
  },
  {
    id: '3',
    name: 'Client Growth Trend',
    description: 'Monthly trend of new client registrations',
    type: 'line',
    lastUpdated: '30 minutes ago',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      values: [45, 52, 49, 60, 55],
      unit: 'clients'
    }
  }
];

const chartIcons = {
  bar: BarChart3,
  pie: PieChart,
  line: TrendingUp
};

export function ReportList() {
  const [isCustomReportModalOpen, setIsCustomReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<typeof mockReports[0] | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleGenerateReport = async (data: any) => {
    try {
      console.log('Generating custom report with parameters:', data);
      setIsCustomReportModalOpen(false);
      // Here you would typically make an API call to generate the report
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleViewReport = (report: typeof mockReports[0]) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  const handleDownloadReport = (report: typeof mockReports[0]) => {
    console.log('Downloading report:', report.name);
    // Here you would typically trigger the report download
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500">View insights and performance metrics</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Reports</option>
              <option value="applications">Applications</option>
              <option value="documents">Documents</option>
              <option value="clients">Clients</option>
            </select>
          </div>
          <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map((report) => {
          const Icon = chartIcons[report.type as keyof typeof chartIcons];
          return (
            <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <button 
                    onClick={() => handleDownloadReport(report)}
                    className="text-gray-400 hover:text-gray-900"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{report.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last updated</span>
                  <span className="text-gray-900 font-medium">{report.lastUpdated}</span>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button 
                  onClick={() => handleViewReport(report)}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-colors"
                >
                  View Report
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Custom Reports</h2>
            <p className="text-gray-500">Generate custom reports based on specific parameters and date ranges.</p>
          </div>
          <button 
            onClick={() => setIsCustomReportModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Generate Custom Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-900 mb-1">Total Reports</div>
            <div className="text-2xl font-bold text-gray-900">247</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-900 mb-1">Generated This Month</div>
            <div className="text-2xl font-bold text-gray-900">32</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-900 mb-1">Most Generated</div>
            <div className="text-2xl font-bold text-gray-900">Applications</div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCustomReportModalOpen}
        onClose={() => setIsCustomReportModalOpen(false)}
        title="Generate Custom Report"
      >
        <ReportForm onSubmit={handleGenerateReport} />
      </Modal>

      {selectedReport && (
        <Modal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          title={selectedReport.name}
        >
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Report Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="text-gray-900 capitalize">{selectedReport.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="text-gray-900">{selectedReport.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Data Summary</h4>
              <div className="space-y-2">
                {selectedReport.data.labels.map((label, index) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{label}:</span>
                    <span className="text-gray-900">
                      {selectedReport.data.values[index]} {selectedReport.data.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleDownloadReport(selectedReport)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download Report
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}