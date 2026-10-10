# AI Conversation Privacy Guardian

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

### Introduction

This browser extension monitors and intercepts front-end requests that read or upload your conversation data on AI assistant websites (such as ChatGPT, DeepSeek, Claude, Gemini, Kimi, etc.).

When a webpage attempts to access or transmit your private dialogue data, the extension will show a pop-up window. You can choose **Allow** or **Deny**.  
If you choose **Deny**, the request will be blocked and the data will not leave your browser.

### Primary Audience and Original Intention

This project is **primarily intended for Chinese-speaking users**.  
The designer is Chinese.  

The original intention of creating this tool is to stand from the user's perspective and protect the user's right to know when their private data is being accessed or transmitted.  
Users should be informed before their conversation data is read or uploaded.

Users of other languages are welcome to fork this repository and adapt it to their own needs.  
Suggestions, issues, and pull requests are all very welcome.

### Features

- Supports mainstream AI assistant websites such as ChatGPT, DeepSeek, Claude, Gemini, Kimi, and others.
- Detects sensitive front-end requests made via `fetch` and `XMLHttpRequest`.
- Shows a pop-up with the API URL and a sample of the data being accessed.
- Allows the user to choose **Allow** or **Deny**.
- When denied, returns a simulated 403 response and blocks the data from leaving the browser.
- Records all detected events to local storage logs, which can be viewed and cleared.

### Limitations

- This extension can only intercept requests made by the web front-end.  
  It cannot intercept or prevent the service provider from reading your conversation data directly from their own server-side database.
- LocalStorage access is monitored and logged, but not blocked, because localStorage APIs are synchronous and cannot wait for user decisions.

### Installation

#### Chrome / Edge

1. Download or clone this repository.
2. Open the browser extension management page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
3. Enable "Developer mode".
4. Click "Load unpacked" and select this project folder.
5. Open an AI assistant website. The extension will start automatically.

#### Safari

Safari requires Xcode packaging.  
You can use `safari-web-extension-converter` to generate an Xcode project, then sign and run it.

### License

MIT License

---

<a name="中文"></a>
## 中文

### 项目介绍

这是一个浏览器扩展，用于监控和拦截 AI 助手网页版（如 ChatGPT、DeepSeek、Claude、Gemini、Kimi 等）对历史对话数据的前端读取和上传行为。

当网页尝试访问或发送您的私有对话数据时，扩展会弹窗提醒，您可以选择 **允许** 或 **拒绝**。  
如果选择 **拒绝**，该请求会被拦截，数据将不会离开您的浏览器。

### 主要面向用户与初心

本项目 **主要面向中国用户**。  
设计者是中国人。

创作这个工具的初心是：**站在用户的角度，让用户对自己的隐私数据在被调用和访问时保有知情权。**  
在对话数据被读取或上传之前，用户应当获得提醒。

其他语言的使用者可以自由 fork 本仓库并进行二次创新。  
欢迎大家提出建议，提交 issue 或 pull request。

### 功能

- 支持 ChatGPT、DeepSeek、Claude、Gemini、Kimi 等主流智能体网页版。
- 检测通过 `fetch` 和 `XMLHttpRequest` 发出的敏感前端请求。
- 弹窗显示接口地址和正在访问的数据摘要。
- 用户可选择 **允许** 或 **拒绝**。
- 拒绝时返回模拟的 403 响应，阻断数据传出浏览器。
- 所有检测到的事件都会记录到本地日志，可以查看和清空。

### 局限性

- 只能拦截网页前端发出的请求，无法阻止服务商在服务器端直接读取数据库中的历史对话数据。
- localStorage 访问仅记录不拦截，因为 localStorage 是同步 API，无法异步等待用户决定。

### 安装方法

#### Chrome / Edge

1. 下载或克隆本仓库。
2. 打开浏览器扩展管理页面：
   - Chrome：`chrome://extensions`
   - Edge：`edge://extensions`
3. 开启“开发者模式”。
4. 点击“加载已解压的扩展程序”，选择本项目文件夹。
5. 打开任意 AI 助手网页版，扩展会自动生效。

#### Safari

Safari 需要使用 Xcode 打包。  
可使用 `safari-web-extension-converter` 生成 Xcode 项目，然后签名运行。

### 许可证

MIT License
