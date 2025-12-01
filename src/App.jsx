import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'; // 假设已有导航栏组件
import './App.css';

function App() {
  return (
    <div className="App">
      {/* 导航栏（全局共享） */}
      <Navbar />
      {/* 子路由占位符（Home/Detail等页面在这里渲染） */}
      <Outlet />
    </div>
  );
}

export default App;