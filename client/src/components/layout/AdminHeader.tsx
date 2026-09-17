import { Bell, Search, User } from 'lucide-react';

interface AdminHeaderProps {
  admin: {
    name: string;
    email: string;
    role: string;
  };
}

const AdminHeader = ({ admin }: AdminHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 shrink-0 flex items-center justify-between px-6 z-10">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-1 focus:ring-brand focus:border-brand transition-colors"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pl-4">
        <button className="relative p-2 text-gray-400 hover:text-navy transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-navy leading-none">{admin.name}</p>
            <p className="text-xs text-gray-500 mt-1 capitalize">{admin.role.replace('_', ' ')}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand/10 text-brand flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
