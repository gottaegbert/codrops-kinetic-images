# MaKaleidos i18n Setup

## 概述 / Overview

MaKaleidos 现在支持中英文双语切换功能，使用客户端语言上下文系统。

MaKaleidos now supports bilingual switching between English and Chinese using a client-side language context system.

## 功能特性 / Features

- ✅ 中英文双语支持 / Bilingual support (EN/中文)
- ✅ 客户端语言切换 / Client-side language switching
- ✅ 语言切换组件 / Language switcher component
- ✅ 翻译内容管理 / Translation content management
- ✅ localStorage语言持久化 / Language persistence with localStorage
- ✅ 全站翻译覆盖 / Complete site translation coverage

## 文件结构 / File Structure

```
src/
├── i18n/
│   ├── messages/
│   │   ├── en.json          # 英文翻译
│   │   └── zh.json          # 中文翻译
│   └── request.js           # i18n 请求配置
├── middleware.js            # 路由中间件
├── i18n.js                 # i18n 主配置
├── app/
│   ├── [locale]/           # 国际化路由
│   │   ├── layout.jsx      # 语言布局
│   │   ├── page.jsx        # 首页
│   │   ├── about/          # 关于页面
│   │   ├── contact/        # 联系页面
│   │   ├── exhibitions/    # 展览页面
│   │   ├── paper/          # Paper 展览
│   │   └── spiral/         # Spiral 展览
│   ├── layout.jsx          # 根布局（重定向）
│   └── page.jsx            # 根页面（重定向）
└── components/
    └── ui/
        └── LanguageSwitcher/  # 语言切换组件
```

## 路由结构 / Routing Structure

- `/` → 重定向到 `/en`
- `/en` → 英文首页
- `/zh` → 中文首页
- `/en/about` → 英文关于页面
- `/zh/about` → 中文关于页面
- 其他页面同理...

## 使用方法 / Usage

### 在组件中使用翻译 / Using translations in components

```jsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
    const t = useTranslations('navigation');
    
    return <h1>{t('home')}</h1>;
}
```

### 添加新的翻译内容 / Adding new translations

1. 在 `src/i18n/messages/en.json` 中添加英文翻译
2. 在 `src/i18n/messages/zh.json` 中添加中文翻译

```json
// en.json
{
  "newSection": {
    "title": "New Title",
    "description": "New description"
  }
}

// zh.json
{
  "newSection": {
    "title": "新标题",
    "description": "新描述"
  }
}
```

### 语言切换 / Language Switching

语言切换组件已集成在Header中，用户可以点击 EN/中文 按钮切换语言。

The language switcher is integrated in the Header, users can click EN/中文 buttons to switch languages.

## 配置说明 / Configuration

### 支持的语言 / Supported Locales
- `en` - English
- `zh` - 中文 (Chinese)

### 默认语言 / Default Locale
- 默认语言为英文 (English)

### 路由前缀 / Route Prefix
- 所有路由都包含语言前缀 (All routes include locale prefix)
- 例如: `/en/about`, `/zh/about`

## 开发注意事项 / Development Notes

1. 所有新页面都应该在 `src/app/[locale]/` 目录下创建
2. 使用 `useTranslations` hook 获取翻译内容
3. 链接使用 `Link` 组件并包含 locale 参数
4. 新增翻译内容需要同时更新两个语言文件

1. All new pages should be created under `src/app/[locale]/`
2. Use `useTranslations` hook to get translated content
3. Use `Link` component with locale parameter for navigation
4. New translations need to be added to both language files

## 测试 / Testing

访问以下URL测试i18n功能：
- http://localhost:3000 (重定向到 /en)
- http://localhost:3000/en
- http://localhost:3000/zh
- http://localhost:3000/en/about
- http://localhost:3000/zh/about

Visit these URLs to test i18n functionality:
- http://localhost:3000 (redirects to /en)
- http://localhost:3000/en
- http://localhost:3000/zh
- http://localhost:3000/en/about
- http://localhost:3000/zh/about
