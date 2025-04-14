import {transformResponse} from './transform.js';

function main() {
  const input = process.argv[2];
  return transformResponse([
    {
      title: '按回车开始翻译：' + input,
      value: input,
      valid: true,
      arg: input,
    }
  ])
}

if (decodeURI(import.meta.url) === `file://${process.argv[1]}`) {
  main()
}