import { ReactNode } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

type AuthLayout = {
  children: ReactNode
}

export const LayoutAuth = ({ children }: AuthLayout) => {
  return (
    <div className="auth">
      <SimpleBar style={{ height: '100%' }}>
        <div className="auth__heading">BookCase</div>
        {children}
      </SimpleBar>
    </div>
  )
}
