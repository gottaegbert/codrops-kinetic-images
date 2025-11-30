# 磨砂卡片设计系统

这个设计系统提供了轻盈感、透明感和磨砂柔和感的卡片组件，适用于现代Web应用。

## 特性

- **轻盈感**: 使用透明背景和精细的阴影
- **透明感**: backdrop-filter 磨砂玻璃效果
- **柔和感**: 圆角边框和渐变光效
- **响应式**: 适配不同屏幕尺寸
- **可定制**: 多种变体和配置选项

## 使用方法

### 1. 导入样式系统

```scss
@import '../../../styles/card-system.scss';
```

### 2. 使用预定义类

```scss
.myCard {
  @extend .card-base;     // 基础卡片
  @extend .card-light;    // 轻量卡片
  @extend .card-heavy;    // 重量卡片
  @extend .card-floating; // 浮动卡片
  @extend .card-glow;     // 发光卡片
}
```

> 当前未提供 React 组件封装，直接在自定义样式中扩展上述 SCSS 占位符即可。

## 变体说明

- **light**: 轻量透明效果，适合背景元素
- **medium**: 中等透明效果，适合一般内容卡片
- **heavy**: 重量透明效果，适合重要内容展示

## CSS变量

系统提供了丰富的CSS变量供自定义：

```css
:root {
  --card-bg-light: rgba(255, 255, 255, 0.85);
  --card-bg-medium: rgba(255, 255, 255, 0.75);
  --card-bg-heavy: rgba(255, 255, 255, 0.95);
  --blur-light: blur(8px);
  --blur-medium: blur(12px);
  --blur-heavy: blur(20px);
  /* 更多变量... */
}
```

## 最佳实践

1. 在深色背景上使用磨砂卡片效果最佳
2. 避免在卡片内嵌套过多层级
3. 合理使用动画，避免过度效果
4. 考虑性能，backdrop-filter在某些设备上可能影响性能

## 浏览器支持

- Chrome 76+
- Firefox 103+
- Safari 9+
- Edge 79+

注意：backdrop-filter在旧版浏览器中可能不支持，建议提供降级方案。
