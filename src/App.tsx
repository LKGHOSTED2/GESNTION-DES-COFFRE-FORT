import React from 'react';
import { Plus, Package, FileText, Settings, Search } from 'lucide-react';
import SafeList from './components/SafeList';
import SafeForm from './components/SafeForm';
import { Safe } from './types/safe';
import { useTranslation } from './hooks/useTranslation';

function App() {
  const { t } = useTranslation();
  const [view, setView] = React.useState<'list' | 'add'>('list');
  const [safes, setSafes] = React.useState<Safe[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleAddSafe = (safe: Safe) => {
    setSafes([...safes, safe]);
    setView('list');
  };

  const filteredSafes = safes.filter(safe => 
    safe.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    safe.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8" />
              <span className="text-xl font-bold">{t('appName')}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'list' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                }`}
              >
                {t('nav.inventory')}
              </button>
              <button
                onClick={() => setView('add')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'add' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                }`}
              >
                {t('nav.addSafe')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'list' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setView('add')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  {t('buttons.add')}
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <FileText className="h-5 w-5 mr-2" />
                  {t('buttons.report')}
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Settings className="h-5 w-5 mr-2" />
                  {t('buttons.settings')}
                </button>
              </div>
            </div>
            <SafeList safes={filteredSafes} />
          </div>
        ) : (
          <SafeForm onSubmit={handleAddSafe} />
        )}
      </main>
    </div>
  );
}

export default App;