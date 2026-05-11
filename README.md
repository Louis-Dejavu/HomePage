# GitHub 个人主页

这是一个基于 `个人主页创建指南.md` 制作的静态 GitHub Pages 个人主页，采用学术主页常见的简洁排版。

## 文件说明

- `index.html`：个人主页首页，包含背景、技术栈、项目、科研、竞赛与实习经历。
- `cv.html`：简历页面，支持浏览器打印或保存为 PDF。
- `guide.html`：上线与维护指南。
- `assets/styles.css`：页面样式。
- `assets/script.js`：移动端导航交互。
- `assets/avatar.jpeg`：头像素材。

## 本地预览

可以直接用浏览器打开 `index.html`，也可以运行：

```bash
python3 -m http.server 4173
```

然后访问 `http://127.0.0.1:4173`。

## 上线到 GitHub Pages

1. 创建公开仓库：`你的GitHub用户名.github.io`。
2. 上传本目录中的页面文件和 `assets/` 文件夹。
3. 在仓库 Settings → Pages 中选择 `main` 分支和根目录。
4. 访问 `https://你的GitHub用户名.github.io`。
