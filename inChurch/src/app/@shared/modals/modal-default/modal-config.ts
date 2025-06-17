import { MatDialogConfig } from '@angular/material/dialog';

type ModalConfigParams = {
  [key in ModalConfigEnum]: MatDialogConfig;
};

enum ModalConfigEnum {
  DEFAULT = 'DEFAULT',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',

}

export const ModalConfig: ModalConfigParams = {
  [ModalConfigEnum.DEFAULT]: {
    height: '673px',
  },

  [ModalConfigEnum.SMALL]: {
    width: '30%',
    maxWidth: '1000px',
    height: '200px',
  },
  
  [ModalConfigEnum.MEDIUM]: {
    width: '60%',
    maxWidth: '1000px',
    height: '720px',
  },
};