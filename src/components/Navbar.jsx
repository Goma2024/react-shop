// src/components/Navbar.jsx
import { Layout, Button, Badge } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import useShopStore from '../store/shopStore';

const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate();
  const { cart } = useShopStore(); // 获取购物车数据
  const cartCount = cart.length; // 计算购物车商品总数

  return (
    <Header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      height: '64px'
    }}>
      {/* 首页链接（替代 Navbar.Brand） */}
      <div 
        style={{ 
          fontSize: '18px', 
          fontWeight: 500, 
          color: '#1d2129',
          cursor: 'pointer'
        }} 
        onClick={() => navigate('/')}
      >
        电商商品商城
      </div>
      
      {/* 购物车按钮（带数量徽章） */}
      <Button 
        type="primary"
        // 使用 CDN 图标
        icon={<i className="arco-icon arco-icon-shopping-cart" style={{ fontSize: '16px' }} />}
        onClick={() => navigate('/cart')}
        style={{ width: '120px' }}
      >
        购物车
        {cartCount > 0 && (
          <Badge 
            count={cartCount} 
            size="small" 
            style={{ marginLeft: '8px' }} 
            overflowCount={99} // 超过99显示"99+"
          />
        )}
      </Button>
    </Header>
  );
}

export default Navbar;