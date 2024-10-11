import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/formate-date';
import useTranslate from '../../hooks/use-translate';
import './style.css';
function Comment({ comment, onClick }) {
  const { author, text, dateCreate, isDeleted } = comment;
  const { t } = useTranslate();

  const cn = bem('Comment');

  return (
    <div className={cn()}>
      <div className={cn('user-date')}>
        <div className={cn('user')}>{author.profile.name}</div>
        <div className={cn('date')}>{formatDate(dateCreate)}</div>
      </div>
      <p className={cn('text')}>{isDeleted ? 'No content' : text}</p>
      <button className={cn('answer-btn')} onClick={onClick}>
        {t('answer')}
      </button>
    </div>
  );
}

export default memo(Comment);

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    isDeleted: PropTypes.bool,
  }),
  onClick: PropTypes.func,
  t: PropTypes.func,
};
