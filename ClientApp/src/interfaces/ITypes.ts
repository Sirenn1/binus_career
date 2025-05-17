export interface Option {
  value: string;
  label: string;
  description?: string;
}

export interface MasterDropdownReturn {
  listDropdown: {
    value: string;
    label: string;
    description?: string;
  }[];
} 