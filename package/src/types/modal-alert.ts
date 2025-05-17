export interface ModalAlertProps {
  variant?: 'success' | 'failed' | 'info';
  open: boolean;
  message?: string | JSX.Element;
  title?: string;
  buttonTitle?: string;
  cancelButton?: boolean;
  onOk?: () => void;
  onClose?: () => void;
} 