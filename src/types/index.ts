export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  passportNumber: string;
  dateOfBirth: Date;
  dataflowCaseNumber?: string;
  applicationDate: Date;
  expectedCompletionDate: Date;
  qualification: {
    type: string;
    specialization?: string;
    yearCompleted?: string;
  };
  packageType: 'Basic' | 'Standard' | 'Premium';
  status: 'active' | 'inactive';
  createdAt: Date;
  paymentStatus: 'pending' | 'completed';
  paymentAmount: number;
}

export interface Application {
  id: string;
  clientId: string;
  type: 'DataFlow' | 'Mumaris' | 'Other';
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  type: string;
  uploadedAt: Date;
  url: string;
}

export interface Communication {
  id: string;
  clientId: string;
  applicationId: string;
  type: 'email' | 'whatsapp';
  content: string;
  sentAt: Date;
  status: 'sent' | 'delivered' | 'read';
}