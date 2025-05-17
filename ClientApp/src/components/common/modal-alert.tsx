/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useEffect, useState, ReactNode } from 'react';
import { ModalAlertProps } from '../../types/modal-alert';

// Maintain your current icon paths but update the colors
const content = {
  success: {
    title: 'Success',
    icon: '/assets/icons/success.png',
    color: 'primary',
  },
  failed: {
    title: 'Failed',
    icon: '/assets/icons/failed.png',
    color: 'error',
  },
  info: {
    title: 'Information',
    icon: '/assets/icons/info.png',
    color: 'info',
  },
} as const;

// Define styles similar to your friend's implementation
const modalAlertStyle = {
  modalAlert: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalAlertContainer: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    maxWidth: '450px',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  modalAlertLogo: { 
    width: '180px', 
    height: '180px', 
    objectFit: 'cover', 
    mb: '8px' 
  },
  modalAlertContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '16px 0',
  },
  modalAlertTitle: { 
    color: '#333333', 
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '12px'
  },
  modalAlertDesc: { 
    color: '#333333', 
    fontSize: '14px', 
    textAlign: 'center' 
  },
  modalAlertButton: { 
    padding: '10px 60px', 
    textTransform: 'uppercase', 
    mt: '30px', 
    textWrap: 'nowrap' 
  },
};

export function ModalAlert({
  variant = 'success',
  open,
  message,
  title,
  buttonTitle,
  cancelButton = false,
  onOk,
  onClose,
  onConfirm,
}: ModalAlertProps) {
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = (_: React.MouseEvent | {}, reason = 'closeClick') => {
    if (reason === 'backdropClick') return;
    onClose?.();
    setIsOpen(false);
  };

  const handleOk = () => {
    onOk?.();
    onConfirm?.();
    handleClose({}, 'okClick');
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={modalAlertStyle.modalAlert}
      disableEnforceFocus
    >
      <Stack sx={modalAlertStyle.modalAlertContainer}>
        <Box
          component="img"
          src={content[variant].icon}
          sx={modalAlertStyle.modalAlertLogo}
          alt={`${variant} icon`}
        />
        <Stack sx={modalAlertStyle.modalAlertContent}>
          <Typography sx={modalAlertStyle.modalAlertTitle}>
            {title ? `${title}` : content[variant].title}
          </Typography>
          {typeof message === 'string' ? (
            <Typography sx={modalAlertStyle.modalAlertDesc}>
              {message}
            </Typography>
          ) : (
            message
          )}
        </Stack>
        <Stack direction="row" gap={2}>
          {cancelButton && (
            <Button
              color="secondary"
              variant="outlined"
              sx={modalAlertStyle.modalAlertButton}
              onClick={handleClose}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            sx={{
              ...modalAlertStyle.modalAlertButton,
              backgroundColor: '#f48d0c',
              color: 'white',
              '&:hover': {
                backgroundColor: '#d87d0a'
              }
            }}
            onClick={handleOk}
          >
            {buttonTitle || 'Ok'}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
