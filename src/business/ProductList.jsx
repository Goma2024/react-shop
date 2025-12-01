import { Grid, Empty, Spin } from '@arco-design/web-react';
import ProductCard from './ProductCard';

/**
 * 商品列表业务组件
 * @param {Object} props - 组件接收的属性
 * @param {Array} props.products - 要展示的商品数组
 * @param {boolean} props.loading - 是否处于加载状态
 */
function ProductList({ products, loading }) {
  // 加载状态
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <Spin size="large" />
        <p style={{ marginTop: 16 }}>加载商品中...</p>
      </div>
    );
  }

  // 无数据状态
  if (products.length === 0) {
    return (
      <Empty 
        description="暂无符合条件的商品" 
        style={{ padding: '60px 0' }}
      />
    );
  }

  // 正常渲染商品列表
  return (
    <Grid 
      rowGap={24} 
      columnGap={24}
      style={{ marginTop: 16 }}
    >
      {products.map(product => (
        <Grid.Item 
          key={product.id} 
          xs={12} // 移动端：1列
          sm={6} // 平板：2列
          md={4} // 桌面：3列
        >
          <ProductCard product={product} />
        </Grid.Item>
      ))}
    </Grid>
  );
}

export default ProductList;