import { Radio, Divider } from '@arco-design/web-react';

// 规格选择器：在详情页选择商品尺码和颜色
function SpecSelector({ specs, selectedSize, selectedColor, onSizeChange, onColorChange }) {
  return (
    <div style={{ marginTop: 24 }}>
      {/* 尺码选择 */}
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: 14 }}>选择尺码</h4>
        <Radio.Group 
          value={selectedSize}
          onChange={onSizeChange}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
        >
          {specs.size.map(size => (
            <Radio 
              key={size} 
              value={size}
              style={{ 
                padding: '8px 16px',
                border: '1px solid #e5e6eb',
                borderRadius: 4
              }}
            >
              {size}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <Divider style={{ margin: '12px 0' }} />

      {/* 颜色选择 */}
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: 14 }}>选择颜色</h4>
        <Radio.Group 
          value={selectedColor}
          onChange={onColorChange}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
        >
          {specs.color.map(color => (
            <Radio 
              key={color} 
              value={color}
              style={{ 
                padding: '8px 16px',
                border: '1px solid #e5e6eb',
                borderRadius: 4
              }}
            >
              {color}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
}

export default SpecSelector;