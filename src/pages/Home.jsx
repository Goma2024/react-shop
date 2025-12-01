import { useEffect, useState } from 'react';
import { Layout, Typography } from '@arco-design/web-react';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import ProductList from '../business/ProductList'; // 商品列表子组件
import useShopStore from '../store/shopStore';
import mockProducts from '../mock/productMock';

const { Title } = Typography;

function Home() {
  const { 
    products, 
    filter, 
    sortType, 
    page, 
    pageSize, 
    initProducts, 
    setPage 
  } = useShopStore();
  const [loading, setLoading] = useState(true);

  // 初始化商品数据（仅首次加载时执行）
  useEffect(() => {
    const timer = setTimeout(() => {
      initProducts(mockProducts); // 注入模拟数据到全局状态
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer); // 组件卸载时清除定时器
  }, [initProducts]);

  // 1. 筛选商品（按分类、价格区间）
  const filteredProducts = products.filter(item => {
    const matchCategory = filter.category === 'all' || item.category === filter.category;
    const matchPrice = item.price >= filter.minPrice && item.price <= filter.maxPrice;
    return matchCategory && matchPrice;
  });

  // 2. 排序商品（按销量降序/价格升序）
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === 'salesDesc') return b.sales - a.sales; // 销量高在前
    if (sortType === 'priceAsc') return a.price - b.price; // 价格低在前
    return 0;
  });

  // 3. 分页处理
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentProducts = sortedProducts.slice(
    (page - 1) * pageSize, 
    page * pageSize
  );

  return (
    <Layout.Content style={{ 
      padding: '24px', 
      maxWidth: 1200, 
      margin: '0 auto',
      width: '100%'
    }}>
      <Title level={3} style={{ marginBottom: 24 }}>商品列表</Title>
      
      {/* 筛选组件（传递筛选条件和更新方法） */}
      <Filter />

      {/* 商品列表组件（传递当前页数据、加载状态） */}
      <ProductList 
        products={currentProducts} 
        loading={loading && totalItems === 0} // 仅首次加载且无数据时显示加载
      />

      {/* 分页组件（仅当有商品时显示） */}
      {totalItems > 0 && (
        <Pagination 
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage} // 页码切换事件
          style={{ marginTop: 32, textAlign: 'center' }}
        />
      )}
    </Layout.Content>
  );
}

export default Home;