// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {verifyTokens} from "./../lib/verifyTokens.jsx";
import axios from 'axios';

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        
try {
    const response = await verifyTokens();
    if(response === true) setVerified(true)
    else Router.push("/")
   
} catch (error) {
    return error;
}
    
    
    }, [Router]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;