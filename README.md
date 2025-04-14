# Alfred Translate Variable Workflow

一个 Alfred Workflow，用于将中文单词/短语翻译成程序中的变量名或方法名。

## 功能特点

- 将中文单词/短语翻译成英文变量名或方法名
- 自定义 prompt，默认使用 camelCase 命名规范
- 提供多个翻译结果供选择
- 支持一键复制翻译结果

## 快速开始

1. 下载最新的 `.alfredworkflow` 文件
2. 双击安装到 Alfred
3. 配置 OpenRouter API Key（见下方配置说明）
4. 使用 `tl` 关键词开始使用

## 使用方法

1. 在 Alfred 中输入 `tl` 关键词
2. 输入需要翻译的中文单词或短语
3. 按回车开始翻译
4. 从多个翻译结果中选择一个，按回车复制到剪贴板

## 配置说明

本 Workflow 需要配置 OpenRouter API Key 才能正常工作：

1. 访问 [OpenRouter](https://openrouter.ai/) 注册并获取 API Key
2. 在 Alfred 的 Workflow 设置中找到 "translate variable" 工作流
3. 点击右上角的 `[x]` 按钮打开工作流设置
4. 在 "Workflow Environment Variables" 部分添加以下变量：
   - `OPEN_API_KEY`: 你的 OpenRouter API Key
   - `OPEN_API_URL`: 默认为 `https://openrouter.ai/api/v1/chat/completions`
   - `MODEL`: 默认为 `deepseek/deepseek-chat-v3-0324:free`
   - `PROMPT`: 自定义提示词（可选）

## 自定义提示词

你可以通过修改 `PROMPT` 环境变量来自定义翻译提示词。默认提示词为：

```
你是一个翻译助手，精通中英文;接下来我会给你一些单词或者短语或者短句，请你翻译成英文。要翻译成程序变量中的变量名或者方法名，要求尽可能言简意;翻译内容使用小驼峰命名法;每次尽可能地提供多个翻译结果，使用逗号隔开
```

## 开发说明

本项目使用 Node.js 开发，主要文件包括：

- `index.js`: 入口文件，处理初始输入
- `translate.js`: 核心翻译逻辑
- `transform.js`: 处理 Alfred 输出格式
- `run-node`: 运行 Node.js 脚本的辅助脚本

