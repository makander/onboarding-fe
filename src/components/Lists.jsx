import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContex';


const Lists = () => {
/*   useEffect(() => {
    effect;
    return () => {
      cleanup;
    };
  }, [input]); */

  const user = useContext(AuthContext);
  console.log(user.authStatus.user.id);
  // const context = useContext(contextValue)

  return (
    <div>
      <p>Welcome to lists</p>


    </div>
  );
};

export default Lists;
