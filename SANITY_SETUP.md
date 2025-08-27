# Sanity CMS 集成设置

## 完成的设置

### 1. Sanity 配置文件
- ✅ `sanity.cli.js` - Sanity CLI 配置
- ✅ `sanity.config.js` - Sanity Studio 配置
- ✅ `studio/sanity.config.js` - 专用 Studio 配置（备选）
- ✅ `.env.local` - 环境变量配置

### 2. Schema 定义
- ✅ `src/sanity/schemas/imageAsset.js` - 图片资源 Schema
- ✅ `src/sanity/schemas/index.js` - Schema 导出

### 3. 客户端配置
- ✅ `src/sanity/client.js` - Sanity 客户端和图片 URL 生成器
- ✅ `src/sanity/queries.js` - GROQ 查询语句

### 4. React Hook
- ✅ `src/hooks/useSanityImages.js` - 获取 Sanity 图片的自定义 Hook

### 5. 页面集成
- ✅ `src/app/page.jsx` - 主页集成 Sanity 图片（带备用方案）
- ✅ `src/app/admin/page.jsx` - 管理页面

## 使用方法

### 启动 Sanity Studio

1. 在项目根目录运行：
   ```bash
   npm run sanity:studio
   ```

2. 打开浏览器访问：http://localhost:3333

3. 首次访问需要登录您的 Sanity 账户

### 上传图片

1. 在 Sanity Studio 中：
   - 点击 "Image Assets"
   - 点击 "Create" 按钮
   - 上传图片并填写必要信息：
     - Title: 图片标题
     - Image: 上传文件
     - Alt Text: 替代文本（SEO 和无障碍）
     - Category: 选择 "Gallery Images"
     - Display Order: 数字越小越靠前显示
     - Tags: 可选标签

2. 保存后图片会自动在主页显示

### 访问管理页面

访问：http://localhost:3001/admin （端口可能不同）

## 功能特性

### 图片优化
- 自动 WebP 格式转换
- 响应式图片尺寸
- CDN 加速
- 智能裁剪（hotspot）
- 模糊占位符（LQIP）

### 备用机制
- 如果 Sanity 图片不可用，自动使用本地图片
- 无缝切换，不影响用户体验

### 内容管理
- 拖拽排序
- 标签系统
- 图片分类
- 元数据提取

## 环境变量

在 `.env.local` 中配置：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=k2sljkbk
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## 下一步扩展

1. **文章管理**：添加文章和博客内容类型
2. **多语言支持**：国际化内容管理
3. **SEO 优化**：元标签和结构化数据
4. **用户权限**：角色和权限管理
5. **预览功能**：实时预览草稿内容

## 故障排除

### Sanity Studio 无法启动
- 确认 project ID 正确
- 检查网络连接
- 清除 node_modules 并重新安装

### 图片无法显示
- 检查 Sanity 项目设置中的 CORS 配置
- 确认图片已正确上传并发布
- 查看浏览器控制台错误信息

### API 请求失败
- 检查环境变量配置
- 确认 API 版本正确
- 验证数据集名称