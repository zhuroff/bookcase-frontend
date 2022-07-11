import { BrowserRouter } from 'react-router-dom'
import { Root } from './Root';
import { ApiProvider } from './hooks/useApi'
import { LocaleProvider } from './hooks/useLocale';
import { AuthProvider } from './hooks/useAuth';
import { AccountProvider } from './hooks/useAccount';
import { ToastProvider } from './hooks/useToast';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './scss/app.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApiProvider>
    <BrowserRouter>
      <LocaleProvider>
        <AuthProvider>
          <AccountProvider>
            <ToastProvider position={'bottom-right'}>
              <Root />
            </ToastProvider>
          </AccountProvider>
        </AuthProvider>
      </LocaleProvider>
    </BrowserRouter>
  </ApiProvider>
);

reportWebVitals();
