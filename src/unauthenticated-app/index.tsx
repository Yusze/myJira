import { useState } from 'react'
import { LoginScreen } from './login';
import { RegisterScreen } from './register';

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return <div>
    {isRegister ? <RegisterScreen/> : <LoginScreen/>}
    <button onClick={()=>setIsRegister(!isRegister)}>切换登陆或者注册</button>
  </div>
}