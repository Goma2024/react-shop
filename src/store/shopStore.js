import { create } from 'zustand';

// 全局状态管理
const useShopStore = create((set, get) => ({
  // 商品列表数据（初始为空）
  products: [],
  // 筛选条件（分类、价格区间）
  filter: {
    category: 'all', // 默认为全部分类
    minPrice: 0,
    maxPrice: 9999
  },
  // 排序方式（销量降序/价格升序）
  sortType: 'salesDesc', // 默认为销量优先
  // 分页参数
  page: 1,
  pageSize: 12, // 每页显示12个商品
  // 购物车数据
  cart: [],

  // 更新筛选条件
  setFilter: (newFilter) => set({ 
    filter: { ...get().filter, ...newFilter },
    page: 1 // 筛选后重置到第1页
  }),
  // 更新排序方式
  setSortType: (type) => set({ sortType: type }),
  // 更新页码
  setPage: (page) => set({ page }),
  // 加入购物车
  addToCart: (product, spec) => set((state) => ({
    cart: [...state.cart, { 
      id: Date.now(), // 生成唯一ID
      productId: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      spec, // 选中的规格（尺码+颜色）
      count: 1
    }]
  })), 
  // 初始化商品数据（从Mock加载）
  initProducts: (data) => set({ products: data }),
  // 清空购物车（可选功能）
  clearCart: () => set({ cart: [] })
}));

export default useShopStore;