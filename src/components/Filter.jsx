// src/components/Filter.jsx

// 1. 从主模块导入 Grid 组件（包含 Row 和 Col）
import { Select, InputNumber, Button, Grid, Radio } from '@arco-design/web-react';
import { useState } from 'react';
import useShopStore from '../store/shopStore';

// 2. 从 Grid 中解构出 Row 和 Col，方便后续使用
const { Row, Col } = Grid;

// 筛选组件：包含分类筛选、价格区间、排序方式
function Filter() {
  const { filter, sortType, setFilter, setSortType } = useShopStore();
  const [localFilter, setLocalFilter] = useState(filter);

  const handleFilter = () => {
    setFilter(localFilter);
  };

  return (
    <div style={{ 
      background: '#f5f5f5', 
      padding: '16px', 
      borderRadius: '8px',
      marginBottom: '24px'
    }}>
      {/* 3. 使用解构后的 Row 和 Col，用法和之前完全一样 */}
      <Row gutter={16} align="middle">
        {/* 分类筛选 */}
        <Col xs={12} sm={6} md={3}>
          <Select
            placeholder="选择分类"
            value={localFilter.category}
            onChange={(value) => setLocalFilter({ ...localFilter, category: value })}
            style={{ width: '100%' }}
          >
            <Select.Option value="all">全部分类</Select.Option>
            <Select.Option value="男装">男装</Select.Option>
            <Select.Option value="女装">女装</Select.Option>
            <Select.Option value="配饰">配饰</Select.Option>
          </Select>
        </Col>

        {/* 价格区间筛选 */}
        <Col xs={12} sm={6} md={4}>
          <Row gutter={8} align="middle">
            <Col span={10}>
              <InputNumber
                placeholder="最低价"
                min={0}
                value={localFilter.minPrice}
                onChange={(value) => setLocalFilter({ ...localFilter, minPrice: value || 0 })}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={4} style={{ textAlign: 'center' }}>至</Col>
            <Col span={10}>
              <InputNumber
                placeholder="最高价"
                min={0}
                value={localFilter.maxPrice}
                onChange={(value) => setLocalFilter({ ...localFilter, maxPrice: value || 9999 })}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </Col>

        {/* 排序方式选择 */}
        <Col xs={12} sm={8} md={4}>
          <Radio.Group 
            value={sortType}
            onChange={setSortType}
            style={{ display: 'flex', gap: '16px' }}
          >
            <Radio value="salesDesc">销量从高到低</Radio>
            <Radio value="priceAsc">价格从低到高</Radio>
          </Radio.Group>
        </Col>

        {/* 筛选按钮 */}
        <Col xs={12} sm={4} md={1}>
          <Button 
            type="primary" 
            onClick={handleFilter}
            style={{ width: '100%' }}
          >
            筛选
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Filter;