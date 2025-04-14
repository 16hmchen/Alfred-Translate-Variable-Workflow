import {transformResponse, throwError} from "./transform.js"

const defaultPrompt = '你是一个翻译助手，精通中英文;接下来我会给你一些单词或者短语或者短句，请你翻译成英文。要翻译成程序变量中的变量名或者方法名，要求尽可能言简意;翻译内容使用小驼峰命名法;每次尽可能地提供多个翻译结果，使用逗号隔开'

function translateVariable(description) {
  const prompt = process.env.PROMPT || defaultPrompt
  const messages = []
  prompt.split(';').forEach(line => {
    messages.push({
      role: 'system',
      content: line
    })
  })
  messages.push({
    role: 'user',
    content: description
  })

  return fetch(process.env.OPEN_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPEN_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": process.env.MODEL,
      "messages": messages
    })
  }).then(response => response.json()).then(data => {
    return data.choices[0].message.content.split(', ')
  })
}

async function main() {
  if (!process.env.OPEN_API_KEY) {
    throwError({
      title: '请配置 OPEN_API_KEY 环境变量',
      subtitle: '回车打开 openrouter 官网创建 API KEY',
      arg: 'https://openrouter.ai'
    })
    return
  }
  const input = process.argv[2];
  const result = await translateVariable(input).then(res => {
    return res.map(item => ({
      title: item,
      subtitle: '回车复制该内容',
      valid: true,
      arg: item,
    }))
  });

  return transformResponse(result)
}

if (decodeURI(import.meta.url) === `file://${process.argv[1]}`) {
  main()
}