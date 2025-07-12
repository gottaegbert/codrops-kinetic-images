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
