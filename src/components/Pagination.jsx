import { Pagination as ArcoPagination } from '@arco-design/web-react';

// 分页组件：控制商品列表分页显示
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <ArcoPagination
        current={currentPage}
        total={totalPages * 10} // 用总页数计算"总条数"
        pageSize={12}
        onChange={onPageChange}
        showSizeChanger={false} 
        showTotal={(total) => `共 ${totalPages} 页`}
      />
    </div>
  );
}

export default Pagination;