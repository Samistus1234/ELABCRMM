import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ApplicationList } from './components/applications/ApplicationList';
import { ClientList } from './components/clients/ClientList';
import { DocumentList } from './components/documents/DocumentList';
import { CommunicationList } from './components/communications/CommunicationList';
import { WorkflowList } from './components/workflows/WorkflowList';
import { ReportList } from './components/reports/ReportList';
import { ThemeProvider } from './providers/ThemeProvider';
import { ApiProvider } from './providers/ApiProvider';

function App() {
  return (
    <ApiProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="ml-64">
              <Header />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/applications" element={<ApplicationList />} />
                  <Route path="/clients" element={<ClientList />} />
                  <Route path="/documents" element={<DocumentList />} />
                  <Route path="/communications" element={<CommunicationList />} />
                  <Route path="/workflows" element={<WorkflowList />} />
                  <Route path="/reports" element={<ReportList />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ApiProvider>
  );
}

export default App;