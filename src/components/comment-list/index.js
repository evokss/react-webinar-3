import { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Comment from '../comment';
import CommentOptions from '../comment-options';
import CommentTextArea from '../comment-text-area';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentsList({ list = [], commentsCount, exists, onComment, onResponse }) {
  const cn = bem('CommentList');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyingToAuthor, setReplyingToAuthor] = useState('');
  const { t } = useTranslate();

  const handleReplyClick = useCallback((commentId, authorName) => {
    setReplyingTo(commentId);
    setReplyingToAuthor(authorName);
  }, []);

  const handleReplySubmit = useCallback(
    (text, commentId) => {
      onResponse(text, commentId);
      setReplyingTo(null);
      setReplyingToAuthor('');
    },
    [onResponse],
  );

  const handleCancelReply = useCallback(() => {
    setReplyingTo(null);
    setReplyingToAuthor('');
  }, []);

  const renderReplyForm = commentId =>
    exists ? (
      <CommentTextArea
        title={t('newReply')}
        submit={text => handleReplySubmit(text, commentId)}
        placeholder={`${t('myanswer')}  ${replyingToAuthor}`}
        onCancel={handleCancelReply}
      />
    ) : (
      <CommentOptions exists={true} onCancel={handleCancelReply} />
    );

  const renderComments = useCallback(
    (comments, level = 0) =>
      comments.map(comment => (
        <div key={comment._id} style={{ marginLeft: level > 0 ? '30px' : '0' }}>
          <Comment
            comment={comment}
            onClick={() =>
              handleReplyClick(comment._id, comment.author?.profile?.name || t('commentList.name'))
            }
          />
          {replyingTo === comment._id && renderReplyForm(comment._id)}
          {comment.children &&
            comment.children.length > 0 &&
            renderComments(comment.children, level + 1)}
        </div>
      )),
    [handleReplyClick, replyingTo, renderReplyForm],
  );

  return (
    <div className={cn()}>
      <h3 className={cn('header')}>
        {t('comment.title')} {exists ? `(${commentsCount})` : '(0)'}
      </h3>
      {exists && renderComments(list)}
      {!exists && !replyingTo && <CommentOptions exists={exists} />}
      {exists && !replyingTo && (
        <CommentTextArea title={t('newСomment')} submit={onComment} placeholder={t('text')} />
      )}
    </div>
  );
}

CommentsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  commentsCount: PropTypes.number,
  onComment: PropTypes.func.isRequired,
  onResponse: PropTypes.func.isRequired,
  exists: PropTypes.bool.isRequired,
  handleReplyClick: PropTypes.func,
  handleCancelReply: PropTypes.func,
  handleReplySubmit: PropTypes.func,
  renderReplyForm: PropTypes.func,
  renderComments: PropTypes.func,
  t: PropTypes.func,
};

export default memo(CommentsList);
