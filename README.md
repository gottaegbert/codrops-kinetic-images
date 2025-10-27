# MaKaleidos - Online Art Gallery

A modern online art gallery platform featuring virtual exhibitions, magazine-style content presentation, and bilingual support (English/Chinese). MaKaleidos creates an innovative digital space for contemporary art discovery and artist showcases.

## 🎨 Project Overview

MaKaleidos is not just a traditional gallery website—it's a digital art magazine that combines:

- **Virtual Exhibitions**: Interactive 3D gallery spaces replacing traditional wall displays
- **Magazine-Style Layout**: Clean, editorial design for immersive content consumption  
- **Bilingual Platform**: Full English/Chinese language support
- **Content Management**: Easy-to-use CMS for monthly exhibition updates
- **Artist Showcases**: Dedicated spaces for artist interviews and portfolios

## ✨ Key Features

- 🌐 **Bilingual Support** - Seamless English/Chinese language switching
- 🖼️ **Virtual Gallery** - WebGL-powered 3D exhibition spaces  
- 📖 **Magazine Layout** - Editorial-style content presentation
- 🎯 **Monthly Exhibitions** - Fresh content with clear archival structure
- 📱 **Responsive Design** - Perfect experience across all devices
- ⚡ **Performance Optimized** - Fast loading with modern web technologies

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd makaleidos-gallery
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Visit [http://localhost:3000](http://localhost:3000) to see the gallery

## 🛠️ Technology Stack

- **Framework**: Next.js 15.3.4 with App Router
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Styling**: Sass/SCSS modules
- **Language**: JavaScript ES6+
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
makaleidos-gallery/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.jsx           # Main gallery homepage  
│   │   ├── layout.jsx         # Root layout with metadata
│   │   ├── paper/             # Paper-style exhibition page
│   │   └── spiral/            # Spiral-style exhibition page
│   ├── components/
│   │   ├── layouts/           # Page layout components
│   │   ├── ui/modules/        # UI components (Header, Footer, etc.)
│   │   └── webgl/             # 3D WebGL components
│   ├── data/                  # Static data and content
│   ├── hooks/                 # Custom React hooks
│   ├── styles/                # Global styles and variables
│   └── webgl/                 # WebGL scene and materials
├── public/                    # Static assets and images
└── makaleidos/               # Project documentation
```

## 🎯 Development Roadmap

### Phase 1: Foundation (July 2025)
- [x] Project setup and technical architecture
- [x] Basic WebGL gallery framework
- [x] Responsive layout system
- [ ] Bilingual infrastructure

### Phase 2: Core Features (August 2025)  
- [ ] Virtual exhibition interface
- [ ] Content management system
- [ ] Artist profile pages
- [ ] Magazine-style article layouts

### Phase 3: Launch Preparation (September 2025)
- [ ] First exhibition content integration
- [ ] Performance optimization
- [ ] SEO and accessibility improvements
- [ ] User testing and refinements

## 📝 Content Management

The platform supports easy content updates through:

- **Exhibition Management**: Add new shows with artist info, artwork details, and descriptions
- **Article Publishing**: Magazine-style content with rich media support
- **Artist Profiles**: Comprehensive artist pages with portfolios and interviews
- **Multi-language Content**: Synchronized English and Chinese versions

## 🌍 Internationalization

- **Primary Languages**: English, 中文 (Chinese)
- **URL Structure**: `/en/...` and `/zh/...` routes
- **Content Sync**: Unified CMS managing both language versions
- **Cultural Adaptation**: Region-appropriate design and content presentation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Manual Deployment
```bash
npm run build
npm run start
```

## 📄 License

This project is proprietary software developed for MaKaleidos. All rights reserved.

## 🤝 Contributing

This is a private project for MaKaleidos. For questions or support, please contact the development team.

---

**MaKaleidos** - Where art meets innovation in the digital space.


# 📋 MaKaleidos 展览管理指南

## 🚀 快速开始

### 1. 启动系统

```bash
# 启动 Next.js 应用
npm run dev

# 启动 Sanity Studio（新标签页）
npm run sanity:studio
```

### 2. 访问地址

- **主页**: http://localhost:3001
- **Sanity Studio**: http://localhost:3333  
- **管理页面**: http://localhost:3001/admin

## 📸 如何上传第一期展览照片

### Step 1: 创建展览
1. 打开 [Sanity Studio](http://localhost:3333)
2. 点击 "🏛️ Exhibitions" → "All Exhibitions"
3. 点击 "Create" 按钮
4. 填写展览信息：
   ```
   Exhibition Title: "第一期展览" 
   Slug: "first-exhibition" (自动生成)
   Artist: "艺术家名字"
   Status: "Current" (重要！设为Current才会在首页显示)
   Description: "展览描述..."
   Start Date: 选择开始日期
   Cover Image: 上传封面图片
   ```
5. 点击 "Publish" 保存

### Step 2: 上传展览图片
1. 点击 "🖼️ Exhibition Images" → "All Images"
2. 对每张图片点击 "Create":
   ```
   Title: "作品1" (简短标题)
   Image: [上传图片文件]
   Alt Text: "作品描述" (SEO和无障碍)
   Exhibition: 选择刚创建的展览
   Display Order: 0, 1, 2... (控制显示顺序)
   
   可选信息：
   Artwork Title: "作品的正式名称"
   Medium: "油画/摄影/装置等"
   Dimensions: "100 x 150 cm"
   Year Created: 2024
   Tags: artwork, painting (用空格分隔)
   Featured Image: ✓ (标记为特色作品)
   ```
3. 点击 "Publish" 保存

### Step 3: 验证显示
1. 访问 [管理页面](http://localhost:3001/admin) 查看上传状态
2. 访问 [主页](http://localhost:3001) 查看3D画廊效果
3. 在浏览器控制台查看调试信息

## 🎨 高级功能

### 批量上传
1. 使用 "📁 Media Library" 批量上传图片
2. 然后在 "🖼️ Exhibition Images" 中快速创建记录并关联

### 展览管理
- **Current**: 当前展览，会在首页显示
- **Upcoming**: 即将开始的展览
- **Past**: 已结束的展览
- **Draft**: 草稿状态

### 图片排序
- `Display Order` 字段控制图片顺序
- 数字越小越靠前显示
- 相同数字按创建时间排序

## 🔧 故障排除

### 图片不显示？
1. ✅ 检查展览状态是否为 "Current"
2. ✅ 确认图片已关联到正确的展览
3. ✅ 查看浏览器控制台错误信息
4. ✅ 刷新管理页面检查数据

### Sanity Studio 无法访问？
1. 确认已运行 `npm run sanity:studio`
2. 检查是否需要登录 Sanity 账户
3. 清除浏览器缓存

### 本地图片仍然显示？
这是正常的备用机制：
- 如果没有 Sanity 图片，会显示本地图片
- 确保上传了足够数量的图片（至少10张）

## 📊 系统架构

### 新展览系统
```
Exhibition (展览)
├── title, artist, status
├── coverImage 
└── ExhibitionImage[] (展览图片)
    ├── image (实际图片文件)
    ├── artworkTitle, medium, year
    └── order (显示顺序)
```

### 向后兼容
- 保留旧的 `imageAsset` 系统
- 如果没有当前展览，会显示旧系统的图片
- 可以逐步迁移到新系统

## 🎯 最佳实践

### 图片质量
- 推荐尺寸：至少 1200x1200px
- 格式：JPG/PNG（系统会自动转换为 WebP）
- 文件大小：建议 < 5MB

### 内容管理
- 使用有意义的图片标题
- 填写 Alt Text 提升无障碍性
- 合理设置显示顺序
- 标记重要作品为 Featured

### 展览规划
- 一次只设置一个 "Current" 展览
- 提前创建 "Upcoming" 展览
- 及时将过期展览改为 "Past"
参考
https://tympanus.net/Tutorials/WebGLCarousel/
https://drei.pmnd.rs/?path=/docs/shapes-roundedbox--docs
