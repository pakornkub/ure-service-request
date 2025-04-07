import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import Swal from 'sweetalert2';
//* hooks
import { useRefreshToken } from '@/hooks/useAuth';
//* store
import { useAuthStore } from '@/stores/useAuthStore';
import { useShallow } from 'zustand/react/shallow';
//* utils
import { getUnixTimestamp } from '@/utils/date';
//* constants
import { refreshTime, idleTime, confirmTime } from '@/constants/time';
//* components
import Alert from './Alert';
//* types
type Props = {
  children?: React.ReactNode;
}

const IdleTimerContainer: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuthStore(useShallow((state) => state));

  const { mutate } = useRefreshToken();

  const sessionTimeOutRef = useRef<any>(null);

  const showActiveConfirm = (): void => {
    Swal.fire({
      title: 'You have been inactive for a while!',
      html: 'Continue using the system?<br/><br/><i><font color="red">(Auto logout in 5 min)</font></i>',
      icon: 'question',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Continue',
      denyButtonText: `Log out`,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      allowOutsideClick: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        activate(); // reset and call OnActive
      } else if (result.isDenied) {
        Swal.close(); // close swal
        setAuth({}); // sign out
        navigate(`/${import.meta.env.VITE_BASE_URL}`); // redirect to login page
      }
    });
  };

  const handleOnIdle = async () => {
    // console.log("user is idle", e);
    // console.log("last active", getLastActiveTime());

    await showActiveConfirm(); // show modal

    sessionTimeOutRef.current = setTimeout(() => {
      Swal.close(); // close swal
      setAuth({}); // sign out
      navigate(`/${import.meta.env.VITE_BASE_URL}`); // redirect to login page
    }, confirmTime); // 5 minutes
  };

  const handleOnActive = (): void => {
    // console.log("user is active", e);
    // console.log("time remaining", getRemainingTime());

    clearTimeout(sessionTimeOutRef.current); // clear timeout
    mutate(); // refresh token
  };

  const handleOnAction = (): void => {
    //console.log('user did something', e)

    const expireTime = auth?.exp;
    const accessTime = auth?.iat;
    const currentTime = getUnixTimestamp();

    //TODO: token timeout or local storage is empty
    if (currentTime > expireTime || Object.keys(JSON.parse(localStorage.getItem('auth') || '{}'))?.length === 0) {
      pause(); // pause the timer
      Alert({
        type: 'error',
        title: 'Session expired!',
        message: 'Please log in again',
      });
      setAuth({}); // sign out
      navigate(`/${import.meta.env.VITE_BASE_URL}`); // redirect to login page
    }

    const refreshToken = currentTime - accessTime > refreshTime; // check refresh token if currentTime - accessTime > refreshTime

    if (refreshToken) {
      mutate(); // refresh token
    }
  };

  const { /* getRemainingTime, getLastActiveTime, */ pause, activate } = useIdleTimer({
    timeout: idleTime,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 250, // wait 250ms before calling onAction
    stopOnIdle: true, // stop the timer when the user becomes idle
  });

  return <>{children}</>;
};

export default IdleTimerContainer;
