import { MatDialogConfig } from '@angular/material/dialog';

type ModalConfigParams = {
  [key in ModalConfigEnum]: MatDialogConfig;
};

enum ModalConfigEnum {
  DEFAULT = 'DEFAULT',
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM'
}

export const ModalConfig: ModalConfigParams = {
  [ModalConfigEnum.DEFAULT]: {
    height: '673px',
  },

  [ModalConfigEnum.LARGE]: {
    width: '80%',
    maxWidth: '1000px',
    height: '720px',
  },
  
  [ModalConfigEnum.MEDIUM]: {
    width: '60%',
    maxWidth: '1000px',
    height: '720px',
  },
};