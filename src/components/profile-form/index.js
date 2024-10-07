import { memo, useCallback, useEffect, useMemo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Spinner from '../spinner';

function ProfileForm(props) {

    const cn = bem('ProfileForm');

  return (
    <Spinner active={!props.auth}>
        <div className={cn('')}>
            <h2>{props.text.profile}</h2>
            <div className={cn('text')}>
                <div>{props.text.name}:</div>
                <div  className={cn('value')}>{props.profile.name}</div>
            </div>
            <div className={cn('text')}>
                <div>{props.text.phone}:</div>
                <div  className={cn('value')}>{props.profile.phone}</div>
            </div>
            <div className={cn('text')}>
                <div>email:</div>
                <div  className={cn('value')}>{props.email}</div>
            </div>
        </div>
    </Spinner>
  );
}

export default memo(ProfileForm);
