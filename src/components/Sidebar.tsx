import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, FileText, MessageCircle, BarChart3, Settings,
  Workflow, Mail, Home
} from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Applications', href: '/applications', icon: FileText },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Communications', href: '/communications', icon: MessageCircle },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col fixed left-0 top-0 bg-card border-r border-border">
      <div className="flex h-16 items-center px-4 border-b border-border">
        <Mail className="h-8 w-8 text-primary" />
        <span className="ml-2 text-xl font-bold text-foreground">eLab CRM</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )
              }
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}