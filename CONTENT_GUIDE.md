# 内容维护指南

这个仓库是一个无需构建、可直接由 GitHub Pages 发布的静态个人主页。页面外观、功能代码和日常内容已经拆分：通常只需编辑一处配置，而不需要再在超长的 HTML 中查找。

## 最常修改的文件

| 要做的事 | 修改位置 |
| --- | --- |
| 修改站点名称、标语、主页文案 | `assets/js/site-config.js` 中的 `texts.zh` / `texts.en` |
| **新增或修改顶部友链** | `assets/js/site-config.js` 中两个语言各自的 `links` 数组 |
| 修改“柑音手帐”个人资料链接 | `assets/js/site-config.js` 中两个语言各自的 `blogFallback` |
| 修改 GitHub 用户名 | `assets/js/site-config.js` 顶部的 `githubUsername` |
| 修改背景音乐歌单 | `assets/js/site-config.js` 顶部的 `playlistIds` |
| 增删主题、调整配色 | `assets/js/site-config.js` 中的 `themes` |
| 新增照片 | 放入 `pictures/`，再在 `pictures/list.txt` 添加路径 |
| 调整布局、字号和动画 | `assets/css/site.css` |
| 修改页面交互逻辑 | `assets/js/main.js` |
| 修改页面结构 | `index.html` |

## 新增友链

在 `assets/js/site-config.js` 中找到 `texts.zh` 的 `links`，每个对象就是一个顶部按钮：

```js
links: [
    { icon: "fab fa-github", name: "GitHub", url: "https://github.com/Serendisand", tooltip: "GitHub主页" },
    { icon: "fas fa-book", name: "柑音手帐", url: "https://Serendisand.github.io/Tangerine-Echo-Journal/", tooltip: "打开柑音手帐" }
]
```

然后在 `texts.en` 的 `links` 中也添加对应英文内容，保证切换语言后友链不会消失：

```js
{ icon: "fas fa-book", name: "Tangerine Echo Journal", url: "https://Serendisand.github.io/Tangerine-Echo-Journal/", tooltip: "Open Tangerine Echo Journal" }
```

- 每一项之间用英文逗号 `,` 分隔。
- `name` 是按钮显示的名字，`url` 是跳转地址，`tooltip` 是悬停提示。
- 图标来自 Font Awesome；不确定时可沿用 `fas fa-link`。

## 更新照片

1. 将图片放入 `pictures/`，例如 `pictures/15.jpg`。
2. 在 `pictures/list.txt` 末尾新增一行：`pictures/15.jpg`。
3. 提交并推送后，GitHub Pages 会自动更新。

## 日常发布流程

修改文件后，使用 Git 提交并推送到 `main` 分支。GitHub Pages 会自动发布；通常几分钟后刷新站点即可看到结果。

> 建议：日常内容只改 `assets/js/site-config.js` 和 `pictures/list.txt`。涉及布局或行为的调整，再分别改 CSS 与主脚本。
