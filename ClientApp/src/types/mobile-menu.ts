import { Dispatch, SetStateAction } from 'react';

export type MobileMenuProps = {
  mobileMenu?: boolean;
  setMobileMenu?: Dispatch<SetStateAction<boolean>>;
}; 