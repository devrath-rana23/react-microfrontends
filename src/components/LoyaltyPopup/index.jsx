import React from 'react';
import { Button, Dialog } from '@material-ui/core';
import css from './index.module.scss';
import { Badge } from '../Icons';

const LoyaltyPopup = ({
  children,
  open = false,
  hideBadge = false,
  onClose = () => {},
  className,
  ...restProps
}) => {
  return (
    <Dialog
      className={`${css.dialogBox} ${className}`}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: css.paperStyle,
      }}
      // scroll="body"
      maxWidth={false}
      fullWidth={false}
      {...restProps}
    >
      <div className={css.btnCross}>
        <Button onClick={onClose} className={css.btn}>
          X
        </Button>
      </div>
      {!hideBadge && (
        <div className={css.icon}>
          <div className={css.badge}>
            <Badge />
          </div>
        </div>
      )}
      {children}
    </Dialog>
  );
};

export default LoyaltyPopup;
