export function transformResponse(response) {
  output({items: response})
}

export function throwError({title, subtitle, arg}) {
  output({
    items: [
      {
        title,
        subtitle,
        arg,
      }
    ]
  })
}

export function output(results) {
  console.log(JSON.stringify(results, null, '\t'))
}