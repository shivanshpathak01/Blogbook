import axios from "axios";
import { useEffect, useState } from "react";
import { baseurl } from "../../config";

export function useLogged() {
  const [loggedin, setLoggedin] = useState<boolean|null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await axios.get(`${baseurl}/loggedin`, {
          headers: { Authorization: localStorage.getItem("token") || "" },
        });
        setLoggedin(res.data.loggedin);
      } catch (err) {
        setLoggedin(false);
      }
    }

    fetchStatus();
  }, []);

  return { loggedin ,setLoggedin};
}
