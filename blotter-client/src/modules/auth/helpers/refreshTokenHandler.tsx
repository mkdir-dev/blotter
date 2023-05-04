import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const RefreshTokenHandler = (props: { setInterval: (arg0: number) => void }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!!session) {
      const timeRemaining = Math.round(
        // @ts-ignore
        (session.user.accessTokenExpiry - 30 * 60 * 1000 - Date.now()) / 1000
      );

      props.setInterval(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [session]);

  return null;
};

export default RefreshTokenHandler;
