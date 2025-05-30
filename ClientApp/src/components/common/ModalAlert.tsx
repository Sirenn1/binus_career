import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalAlertProps } from '../../types/modal-alert';
import { modalAlertStyle } from '../../styles/common/modal-alert';

type ContentType = {
  [key: string]: {
    title: string;
    icon: string;
  };
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
}: ModalAlertProps) {
  const [isOpen, setIsOpen] = useState(open);

  const content: ContentType = {
    success: {
      title: 'Success',
      icon: '/assets/alert/ilustrasi-cody-success.png',
    },
    failed: {
      title: 'Failed',
      icon: '/assets/alert/ilustrasi-cody-failed.png',
    },
    info: { title: 'Info', icon: '/assets/alert/ilustrasi-cody-alert.png' },
  };

  const handleClose = (_: unknown, reason = 'closeClick') => {
    if (reason === 'backdropClick') return;
    onClose?.();
    setIsOpen(false);
  };

  const handleOk = () => {
    onOk?.();
    handleClose(null, 'okClick');
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
              variant="contained"
              sx={modalAlertStyle.modalAlertButton}
              onClick={handleClose}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={modalAlertStyle.modalAlertButton}
            onClick={handleOk}
          >
            {buttonTitle || 'Ok'}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
} 