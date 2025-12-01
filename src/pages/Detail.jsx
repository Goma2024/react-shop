import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Layout, Image, Button, Typography, Tag, 
  Spin, Modal, Badge, Grid, Card 
} from '@arco-design/web-react';
import { IconArrowLeft } from '@arco-design/web-react/icon';
import SpecSelector from '../business/SpecSelector';
import CartModal from '../components/CartModal';
import useShopStore from '../store/shopStore';

const { Title, Paragraph } = Typography;
const { Row, Col } = Grid; // 从 Grid 解构 Row 和 Col

// 商品详情页
function Detail() {
  const { id } = useParams(); // 从 URL 获取商品 ID
  const navigate = useNavigate();
  const { products, addToCart } = useShopStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(''); // 选中的尺码
  const [selectedColor, setSelectedColor] = useState(''); // 选中的颜色
  const [cartVisible, setCartVisible] = useState(false); // 购物车弹窗状态

  // 根据 ID 查找商品（组件挂载/ID 变化时执行）
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = products.find(item => item.id === Number(id));
      setProduct(found);
      // 初始化选中第一个规格
      if (found?.specs) {
        setSelectedSize(found.specs.size[0]);
        setSelectedColor(found.specs.color[0]);
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id, products]);

  // 加入购物车逻辑
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      Modal.warning({ content: '请选择尺码和颜色' });
      return;
    }
    if (!product) return;

    addToCart(product, { size: selectedSize, color: selectedColor });
    setCartVisible(true); // 显示购物车弹窗
  };

  // 加载状态
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
        <p style={{ marginTop: 16 }}>加载商品详情中...</p>
      </div>
    );
  }

  // 商品不存在
  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <h3>商品不存在或已下架</h3>
        <Button 
          onClick={() => navigate('/')} 
          style={{ marginTop: 16 }}
        >
          返回商品列表
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Layout.Content style={{ 
        padding: '24px', 
        maxWidth: 1200, 
        margin: '0 auto',
        width: '100%'
      }}>
        {/* 返回按钮 */}
        <Button 
          icon={<IconArrowLeft />} 
          onClick={() => navigate('/')}
          style={{ marginBottom: 16 }}
          variant="text"
        >
          返回商品列表
        </Button>

        {/* 商品详情卡片 */}
        <Card style={{ padding: '24px' }}>
          <Row gutter={32} align="start">
            {/* 商品图片 */}
            <Col xs={12} md={6}>
              <Image 
                src={product.img} 
                alt={product.name}
                style={{ 
                  width: '100%', 
                  borderRadius: 8,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
                }}
                preview // 支持图片预览
              />
            </Col>

            {/* 商品信息 */}
            <Col xs={12} md={6}>
              <div style={{ marginBottom: 16 }}>
                <Title level={2} style={{ margin: 0 }}>{product.name}</Title>
                <div style={{ marginTop: 8 }}>
                  <Tag 
                    color={product.tag === '热销' ? 'red' : 'blue'}
                    style={{ marginRight: 8 }}
                  >
                    {product.tag}
                  </Tag>
                  {product.stock < 20 && product.stock > 0 && (
                    <Badge text="库存紧张" color="orange" />
                  )}
                </div>
              </div>

              {/* 价格区域 */}
              <div style={{ 
                background: '#fff1f0', 
                padding: '12px 16px', 
                borderRadius: 4,
                marginBottom: 24
              }}>
                <span style={{ color: '#666' }}>单价：</span>
                <span style={{ color: 'red', fontSize: 28, fontWeight: 500 }}>
                  ¥{product.price}
                </span>
                <div style={{ marginTop: 8, color: '#666' }}>
                  销量：{product.sales} | 库存：{product.stock}件 | 分类：{product.category}
                </div>
              </div>

              {/* 商品描述 */}
              <div style={{ marginBottom: 24 }}>
                <h4 style={{ margin: '0 0 8px 0' }}>商品描述</h4>
                <Paragraph style={{ margin: 0, lineHeight: 1.8 }}>
                  {product.desc}
                </Paragraph>
              </div>

              {/* 规格选择 */}
              <SpecSelector 
                specs={product.specs}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeChange={setSelectedSize}
                onColorChange={setSelectedColor}
              />

              {/* 加入购物车按钮 */}
              <Button 
                type="primary" 
                size="large" 
                onClick={handleAddToCart}
                style={{ 
                  width: '100%', 
                  height: 50, 
                  fontSize: 16,
                  marginTop: 32
                }}
                disabled={product.stock <= 0}
              >
                {product.stock <= 0 ? '库存不足' : '加入购物车'}
              </Button>
            </Col>
          </Row>
        </Card>
      </Layout.Content>

      {/* 购物车弹窗 - 放在 Layout.Content 外面 */}
      <CartModal 
        visible={cartVisible} 
        onClose={() => setCartVisible(false)} 
      />
    </div>
  );
}

export default Detail;