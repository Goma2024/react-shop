import { Card, Image, Tag, Badge } from '@arco-design/web-react';
import { Link } from 'react-router-dom';
import React from 'react';

// 商品卡片组件：列表页显示单个商品信息
const ProductCard = React.memo(({ product }) => {
  return (
    <Link to={`/detail/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card 
        hoverable // 鼠标悬停效果
        style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        {/* 商品图片（带标签） */}
        <div style={{ position: 'relative' }}>
          <Image 
            src={product.img} 
            alt={product.name}
            style={{ 
              width: '100%', 
              height: 180, 
              objectFit: 'cover',
              borderRadius: '4px 4px 0 0'
            }}
          />
          {product.tag && (
            <Tag 
              style={{ 
                position: 'absolute', 
                top: 8, 
                left: 8,
                zIndex: 10
              }}
              color={product.tag === '热销' ? 'red' : 'blue'}
            >
              {product.tag}
            </Tag>
          )}
          {/* 库存紧张提示 */}
          {product.stock < 20 && product.stock > 0 && (
            <Badge 
              text="库存紧张" 
              style={{ position: 'absolute', top: 8, right: 8 }} 
              color="orange"
            />
          )}
        </div>

        {/* 商品信息 */}
        <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ 
            fontSize: 16, 
            margin: '0 0 8px 0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {product.name}
          </h3>
          <p style={{ 
            color: 'red', 
            fontSize: 18, 
            margin: '8px 0',
            fontWeight: 500
          }}>
            ¥{product.price}
          </p>
          <div style={{ 
            color: '#666', 
            fontSize: 14, 
            marginTop: 'auto', 
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>销量 {product.sales}</span>
            <span>{product.category}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
});

export default ProductCard;