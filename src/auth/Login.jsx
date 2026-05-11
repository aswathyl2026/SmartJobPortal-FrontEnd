import React, { useState } from "react";





import { useNavigate } from "react-router-dom";

function Login() {
  
  return (
    <div className="flex flex-col gap-4 w-80 mx-auto mt-32">
      <h1 className="text-3xl font-bold text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        
      />

      <button
        
        className="bg-blue-600 text-white p-2 rounded"
      >
        Login
      </button>
    </div>
  );
}

export default Login;