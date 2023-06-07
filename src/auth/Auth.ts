import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  children: JSX.Element;
}

function getCookie(name: string) {
  let arr;
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  // eslint-disable-next-line no-cond-assign
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  return null;
}

export default function Auth(props: IProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getCookie('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [location.pathname]);
  return props.children;
}
