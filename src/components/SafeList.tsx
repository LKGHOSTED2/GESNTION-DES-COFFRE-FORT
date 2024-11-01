import React from 'react';
import { Safe } from '../types/safe';
import { Package, Calendar, Ruler, Tag } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface SafeListProps {
  safes: Safe[];
}

function SafeList({ safes }: SafeListProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {safes.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {t('emptyState.title')}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {t('emptyState.description')}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {safes.map((safe) => (
            <li key={safe.id}>
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="h-10 w-10 text-gray-500" />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{safe.model}</h3>
                      <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        safe.status === 'in_stock' 
                          ? 'bg-green-100 text-green-800'
                          : safe.status === 'reserved'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {t(`status.${safe.status}`)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        {safe.serialNumber}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(safe.manufacturingDate).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center">
                        <Ruler className="h-4 w-4 mr-1" />
                        {`${safe.dimensions.width}x${safe.dimensions.height}x${safe.dimensions.depth} cm`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    {t('buttons.edit')}
                  </button>
                  <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    {t('buttons.viewDetails')}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SafeList;