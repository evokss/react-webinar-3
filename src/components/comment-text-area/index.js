import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentTextArea({ title, submit, onCancel, placeholder }) {
  const cn = bem('CommentTextArea');
  const [text, setText] = useState('');
  const { t } = useTranslate();

  const callbacks = {
    onChange: useCallback(e => {
      setText(e.target.value);
    }, []),
    onSubmit: useCallback(
      e => {
        if (text.trim()) {
          e.preventDefault();
          submit(text);
          setText('');
        }
      },
      [text],
    ),
  };

  return (
    <form onSubmit={callbacks.onSubmit}>
      <div className={cn()}>
        <div className={cn('title')}>{title}</div>

        <textarea
          className={cn('field')}
          value={text}
          onChange={callbacks.onChange}
          placeholder={placeholder}
        />

        <div className={cn('prop')}>
          <button className={cn('button')} onClick={callbacks.onSubmit}>
            {t('send')}
          </button>

          {onCancel && <button onClick={onCancel}>{t('cancel')}</button>}
        </div>
      </div>
    </form>
  );
}
CommentTextArea.propTypes = {
  title: PropTypes.string,
  submit: PropTypes.func,
  onCancel: PropTypes.func,
  placeholder: PropTypes.string,
  t: PropTypes.func,
};

export default CommentTextArea;
