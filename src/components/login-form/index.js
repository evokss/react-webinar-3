import { memo, useCallback, useEffect, useMemo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Spinner from '../spinner';

function LoginForm({ setUserData, userData, onSubmit, error, auth, text }) {

    const cn = bem('LoginForm');

    const callbacks = {
        login: (e) => setUserData({...userData, login: e.target.value}),
        password: (e) => setUserData({...userData, password: e.target.value}),
        submit: (e) => (e.preventDefault(), onSubmit(userData), e.target.reset()),
      };

  return (
    <Spinner active={auth}>
        <div className={cn('')}>
            <h2>{text.enter}</h2>
        <form className={cn('form')} onSubmit={callbacks.submit}>
            <div className={cn('input')}>
                <label htmlFor="email">{text.login}</label>
                <input type="text" id="email" defaultValue="" onChange={callbacks.login} required/>
            </div>
            <div className={cn('input')}>
                <label htmlFor="password">{text.pass}</label>
                <input type="password" minLength={6} id="password" defaultValue="" required onChange={callbacks.password}/>
            </div>
            <div className={cn('footer')}>
                {error.message && <div className={cn('error')}>{error.message}! {error.type}</div>}
                <input type="submit" value={text.send} className={cn('button')}></input>
            </div>
        </form>
        </div>
    </Spinner>
  );
}

export default memo(LoginForm);
