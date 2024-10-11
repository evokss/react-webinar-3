import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentOptions({ exists, onCancel }) {
  const cn = bem('CommentOptions');
  const location = useLocation();
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/login" state={{ back: location.pathname }}>
        {t('option.log')}
      </Link>
      <div>
        {t('option.able')}
        {exists ? t('option.answer') : t('option.comment')}
      </div>
      {exists && (
        <button className={cn('cancel')} onClick={onCancel}>
          {t('cancel')}
        </button>
      )}
    </div>
  );
}

CommentOptions.propTypes = {
  exists: propTypes.bool,
  onCancel: propTypes.func,
};

export default CommentOptions;
