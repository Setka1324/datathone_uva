import React from 'react';
import Registration from '/src/components/Registration.jsx'; // Adjust path if needed

function Register() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
       {/* You could add a retro header here */}
       {/* <h1 className="text-4xl text-neon-green font-bold mb-8 uppercase tracking-widest animation-flicker">
           Retro Registration Portal
       </h1> */}
       <Registration />
       {/* You could add a retro footer here */}
    </div>
  );
}

export default Register;