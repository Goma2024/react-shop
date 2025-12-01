import Mock from 'mockjs';

// 生成20条商品数据
const mockProducts = Mock.mock({
  'list|20': [
    {
      'id|+1': 1, // 商品ID自增（1,2,3...）
      'name': '@ctitle(6,12)', // 随机商品名称（6-12个字）
      'price|99-599': 1, // 价格范围：99-599元
      'img': 'https://picsum.photos/600/400?random=@id', // 随机图片（用ID确保唯一）
      'tag|1': ['新品', '热销', '折扣', '限时'], // 随机标签
      'sales|100-10000': 1, // 销量：100-10000
      'category|1': ['男装', '女装', '配饰', '鞋靴'], // 分类
      'stock|5-200': 1, // 库存：5-200件
      'specs': { // 商品规格（尺码+颜色）
        'size|3-4': ['XS', 'S', 'M', 'L', 'XL'], // 随机3-4个尺码
        'color|2-3': ['黑色', '白色', '灰色', '蓝色', '红色'] // 随机2-3种颜色
      },
      'desc': '@cparagraph(3,5)' // 商品描述（3-5段文字）
    }
  ]
}).list;

export default mockProducts;