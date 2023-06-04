import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  children: JSX.Element;
}

export default function Auth(props: IProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [location.pathname]);
  return props.children;
}
