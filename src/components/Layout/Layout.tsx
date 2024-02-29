import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

import './Layout.scss';

export const Layout = () => {
  return (
    <div className="layout">
      <Header />

      <div className="layout--wrapper">
        <Outlet />
      </div>
    </div>
  )
}