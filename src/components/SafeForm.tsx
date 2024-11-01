import React from 'react';
import { Safe, SafeFormData } from '../types/safe';
import { generateSerialNumber } from '../utils/serialNumber';
import { useTranslation } from '../hooks/useTranslation';

interface SafeFormProps {
  onSubmit: (safe: Safe) => void;
}

function SafeForm({ onSubmit }: SafeFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState<SafeFormData>({
    dimensions: { width: 0, height: 0, depth: 0 },
    manufacturingDate: new Date().toISOString().split('T')[0],
    model: '',
    status: 'in_stock',
    features: [],
    notes: ''
  });

  const features = [
    { id: 'fireResistant', label: t('form.features.fireResistant') },
    { id: 'waterResistant', label: t('form.features.waterResistant') },
    { id: 'digitalLock', label: t('form.features.digitalLock') },
    { id: 'biometric', label: t('form.features.biometric') },
    { id: 'dualControl', label: t('form.features.dualControl') }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const safe: Safe = {
      ...formData,
      id: crypto.randomUUID(),
      serialNumber: generateSerialNumber(formData.dimensions, 1)
    };
    
    onSubmit(safe);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{t('form.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('form.model')}</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('form.manufacturingDate')}</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.manufacturingDate}
              onChange={(e) => setFormData({ ...formData, manufacturingDate: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('form.dimensions.width')}</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.dimensions.width || ''}
              onChange={(e) => setFormData({
                ...formData,
                dimensions: { ...formData.dimensions, width: Number(e.target.value) }
              })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('form.dimensions.height')}</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.dimensions.height || ''}
              onChange={(e) => setFormData({
                ...formData,
                dimensions: { ...formData.dimensions, height: Number(e.target.value) }
              })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('form.dimensions.depth')}</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.dimensions.depth || ''}
              onChange={(e) => setFormData({
                ...formData,
                dimensions: { ...formData.dimensions, depth: Number(e.target.value) }
              })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t('form.features.title')}</label>
          <div className="mt-2 space-x-4">
            {features.map((feature) => (
              <label key={feature.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  checked={formData.features.includes(feature.label)}
                  onChange={(e) => {
                    const features = e.target.checked
                      ? [...formData.features, feature.label]
                      : formData.features.filter(f => f !== feature.label);
                    setFormData({ ...formData, features });
                  }}
                />
                <span className="ml-2 text-sm text-gray-600">{feature.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t('form.notes')}</label>
          <textarea
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('buttons.cancel')}
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('buttons.submit')}
        </button>
      </div>
    </form>
  );
}

export default SafeForm;