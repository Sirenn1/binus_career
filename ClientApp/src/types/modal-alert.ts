import { ReactElement } from 'react';

export interface ModalAlertProps {
  variant?: 'success' | 'failed' | 'info';
  open: boolean;
  message?: string | ReactElement;
  title?: string;
  buttonTitle?: string;
  cancelButton?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onOk?: () => void;
} 