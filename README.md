<h1>
  <b>一个外语小说阅读器</b>
</h1>

## 功能

- 📦 直接读取 `epub` 文件
- ☁️ 阅读历史记录
- 🔥 支持左滑翻译
- 😃 专有名词替换

## 支持的翻译API

- 百度
- 有道
- ~~微软(待支持)~~
- ~~谷歌(待支持)~~

## 待办事项

- [ ] 支持微软翻译
- [ ] 支持谷歌翻译
- [-] 配置翻译API密钥
- [ ] 专有名词配置
- [ ] IndexDB 保存读取的数据

### 部署与克隆

你可以直接使用 `netlify` 直接部署

或

```bash
git clone https://github.com/FuBaooo/epub-reading
cd epub-reading
pnpm i # 如果使用的不是 pnpm, 运行: npm install -g pnpm
pnpm dev
```
