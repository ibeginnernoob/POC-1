import { useState, useEffect } from "react";
import axios from "axios";

type ResBody = {
  msg: string;
};

const useIsAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/check-auth`,
          {
            headers: {
              authorization: token,
            },
          },
        );

        const resBody = res.data as ResBody;

        if (!res || res.status !== 200) {
          throw new Error(resBody.msg);
        }

        if (res.status === 200) {
          setIsAuth(true);
        }
      } catch (e: any) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    isLoading,
    isAuth,
  };
};

export default useIsAuth;
