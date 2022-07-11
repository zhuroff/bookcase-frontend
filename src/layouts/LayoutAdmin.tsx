import { ReactNode } from 'react';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

type LayoutAdminProps = {
  children: ReactNode
}

export const LayoutAdmin = ({ children }: LayoutAdminProps) => {
  return (
    <div className="app">
      <Sidebar />
      <Header />
      <main className="main">
        <SimpleBar style={{ height: '100%' }}>
          <section className="section">{children}</section>
        </SimpleBar>
      </main>
    </div>
  )
}
