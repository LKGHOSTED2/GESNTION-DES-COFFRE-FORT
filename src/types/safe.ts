export interface SafeDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Safe {
  id: string;
  serialNumber: string;
  dimensions: SafeDimensions;
  manufacturingDate: string;
  model: string;
  status: 'in_stock' | 'sold' | 'reserved';
  features: string[];
  notes?: string;
}

export interface SafeFormData extends Omit<Safe, 'id' | 'serialNumber'> {}