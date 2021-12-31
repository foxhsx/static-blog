module.exports = [
  {
    text: 'JavaScript',
    path: '/docs/questionBank/javascript/',
    collapsable: true,
    children: [
      {
        text: 'String',
        collapsable: true,
        children: [
          { text: 'String基础题', link: '/docs/questionBank/javascript/notes/select_string'},
          { text: 'String编程题', link: '/docs/questionBank/javascript/notes/code_string'},
        ]
      },
      {
        text: 'Math',
        collapsable: true,
        children: [
          { text: 'Math基础题', link: '/docs/questionBank/javascript/notes/select_math'},
          { text: 'Math编程题', link: '/docs/questionBank/javascript/notes/code_math'},
        ]
      },
      {
        text: 'Array',
        collapsable: true,
        children: [
          { text: 'Array基础题', link: '/docs/questionBank/javascript/notes/select_array'}
        ]
      },
      {
        text: 'Function',
        collapsable: true,
        children: [
          { text: '函数基础题', link: '/docs/questionBank/javascript/notes/select_function'}
        ]
      }
    ]
  }
]