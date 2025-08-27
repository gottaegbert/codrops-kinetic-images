# 🎨 简单展览上传指南

## 🚀 快速开始

### 1. 启动系统
```bash
npm run dev              # 启动网站
npm run sanity:studio    # 启动CMS管理
```

### 2. 访问地址
- **网站**: http://localhost:3000
- **管理**: http://localhost:3000/admin  
- **CMS**: http://localhost:3333

## 📸 上传第一期展览图片

### 简单4步上传：

1. **打开CMS管理**
   - 访问 http://localhost:3333
   - 登录你的Sanity账户

2. **创建展览**
   - 点击 "📁 Exhibitions"
   - 点击 "Create" 按钮
   - 填写：
     - Exhibition Title: "第一期展览"
     - ✅ Current Exhibition (勾选这个很重要！)
     - Artist: "艺术家姓名"
     - Description: "展览描述"

3. **上传图片**
   - 在同一页面的 "Exhibition Images" 部分
   - 直接拖拽10张图片到这里
   - 为每张图片添加 Alt Text（描述）
   - 可以添加 Image Title（可选）

4. **发布**
   - 点击 "Publish" 按钮
   - 完成！

### ✨ 查看效果
- 访问 http://localhost:3000 看3D画廊
- 访问 http://localhost:3000/admin 检查状态

## 🔄 添加更多展览

以后要添加新展览：

1. 把旧展览的 "Current Exhibition" **取消勾选**
2. 创建新展览，**勾选** "Current Exhibition"  
3. 上传新图片
4. 发布

**注意**：只有一个展览可以设为 "Current"，这样网站就会显示最新的展览。

## 🛠️ 故障排除

### 图片没显示？
- ✅ 确认展览已勾选 "Current Exhibition"
- ✅ 确认已点击 "Publish"
- ✅ 刷新网站页面

### CMS打不开？
- ✅ 确认运行了 `npm run sanity:studio`
- ✅ 检查网络连接
- ✅ 清除浏览器缓存

就这么简单！🎉