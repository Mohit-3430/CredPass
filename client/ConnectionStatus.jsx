import { useEffect, useState } from "react";
import "./src/styles/InfoPage/ConnectionStatus.css";
import { FaCheckCircle, FaInfo } from "react-icons/fa";
import axios from "axios";

const ConnectionStatus = () => {
  const [status, setStatus] = useState();

  useEffect(() => {
    let isMounted = true;
    const getStatus = async () => {
      try {
        const resp = await axios.get(import.meta.env.VITE_SERVER_URL);
        console.log(resp.status);
        if (isMounted) setStatus(resp.status);
      } catch (err) {
        setTimeout(getStatus, 200);
      }
    };
    getStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {status !== 200 && (
        <div className="container">
          <FaInfo />
          Connecting to Server ...
        </div>
      )}
    </>
  );
};

export default ConnectionStatus;
