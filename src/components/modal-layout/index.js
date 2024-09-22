import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ children, onClose }) {
  const cn = bem('ModalLayout');

  return (
    <div className={cn('overlay')} onClick={onClose}> {/* Затемнённый фон */}
      <div className={cn()} onClick={(e) => e.stopPropagation()}> {/* Окно модалки */}
        {children}
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(ModalLayout);
