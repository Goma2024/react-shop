import { Modal, List, Button, Image, Empty } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import useShopStore from '../store/shopStore';

// 加入购物车后显示的弹窗
function CartModal({ visible, onClose }) {
  const { cart, clearCart } = useShopStore();
  const navigate = useNavigate();

  // 计算购物车商品总价
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <Modal
      title="已加入购物车"
      visible={visible}
      onClose={onClose}
      width={500}
      footer={[
        <Button key="continue" onClick={onClose}>
          继续购物
        </Button>,
        <Button 
          key="checkout" 
          type="primary" 
          onClick={() => {
            onClose();
            navigate('/cart'); // 跳转购物车页面
          }}
        >
          去结算（¥{totalPrice.toFixed(2)}）
        </Button>
      ]}
    >
      {cart.length === 0 ? (
        <Empty description="购物车为空" />
      ) : (
        <List>
          {cart.slice(-1).map((item) => ( // 只显示最后加入的商品
            <List.Item key={item.id} style={{ padding: '16px 0' }}>
              <Image 
                src={item.img} 
                alt={item.name}
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
              />
              <div style={{ marginLeft: 16, flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{item.name}</div>
                <div style={{ color: '#666', fontSize: 14, marginTop: 4 }}>
                  规格：{item.spec.color} / {item.spec.size}
                </div>
                <div style={{ color: 'red', marginTop: 4 }}>¥{item.price}</div>
              </div>
            </List.Item>
          ))}
          {cart.length > 1 && (
            <div style={{ textAlign: 'center', color: '#666', padding: '8px 0' }}>
              还有 {cart.length - 1} 件商品在购物车中
            </div>
          )}
        </List>
      )}
    </Modal>
  );
}

export default CartModal;