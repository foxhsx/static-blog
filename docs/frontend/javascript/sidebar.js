module.exports = [
  {
    text: 'JavaScript',
    path: '/docs/frontend/javascript/',
    collapsable: true,
    children: [
      {
        text: 'JavaScript-基础语法',
        path: '/docs/frontend/javascript/notes/syntax/',
        collapsable: true,
        children: [
          { text: 'HTML中的JavaScript', link: '/docs/frontend/javascript/notes/syntax/JavaScript-HTML'},
          { text: 'JavaScript基础语法', link: '/docs/frontend/javascript/notes/syntax/JavaScript-syntax'},
          { text: 'JavaScript数据类型', link: '/docs/frontend/javascript/notes/syntax/JavaScript-DataType'},
          { text: 'JavaScript操作符', link: '/docs/frontend/javascript/notes/syntax/JavaScript-Operators'},
          { text: 'JavaScript表达式', link: '/docs/frontend/javascript/notes/syntax/JavaScript-Expressions'},
        ]
      },
      {
        text: 'JavaScript-流程控制语句',
        path: '/docs/frontend/javascript/notes/processControl/',
        collapsable: true,
        children: [
          { text: 'JavaScript之if_else', link: '/docs/frontend/javascript/notes/processControl/if_else'},
          { text: 'JavaScript之switch', link: '/docs/frontend/javascript/notes/processControl/Switch'},
          { text: 'JavaScript之循环语句', link: '/docs/frontend/javascript/notes/processControl/loop'},
        ]
      },
      {
        text: 'JavaScript-内置对象',
        path: '/docs/frontend/javascript/notes/builtInObjects/',
        collapsable: true,
        children: [
          { text: 'JavaScript内置对象——String字符串', link: '/docs/frontend/javascript/notes/builtInObjects/String'},
          { text: 'JavaScript内置对象——Array数组', link: '/docs/frontend/javascript/notes/builtInObjects/Array'},
          { text: 'JavaScript内置对象——Math对象', link: '/docs/frontend/javascript/notes/builtInObjects/Math'},
          { text: 'JavaScript内置对象——Date对象', link: '/docs/frontend/javascript/notes/builtInObjects/Date'},
        ]
      },
      {
        text: 'JavaScript-函数',
        path: '/docs/frontend/javascript/notes/Function/',
        collapsable: true,
        children: [
          { text: 'JavaScript之函数', link: '/docs/frontend/javascript/notes/Function/Function'}
        ]
      },
      {
        text: 'JavaScript-BOM',
        path: '/docs/frontend/javascript/notes/BOM/',
        collapsable: true,
        children: [
          { text: 'JavaScript之BOM', link: '/docs/frontend/javascript/notes/BOM/BOM'},
          { text: 'BOM对象之window', link: '/docs/frontend/javascript/notes/BOM/bom_window'},
          { text: 'BOM对象之location', link: '/docs/frontend/javascript/notes/BOM/bom_location'},
          { text: 'BOM对象之navigator', link: '/docs/frontend/javascript/notes/BOM/bom_navigator'},
          { text: 'BOM对象之screen', link: '/docs/frontend/javascript/notes/BOM/bom_screen'},
          { text: 'BOM对象之history', link: '/docs/frontend/javascript/notes/BOM/bom_history'},
        ]
      },
      {
        text: 'JavaScript-DOM',
        path: '/docs/frontend/javascript/notes/DOM/',
        collapsable: true,
        children: [
          {text: 'JavaScript之DOM基础', link: '/docs/frontend/javascript/notes/DOM/DOM'},
          {text: 'JavaScript之DOM事件', link: '/docs/frontend/javascript/notes/DOM/DOM-EVENT'},
        ]
      },
      {
        text: '客户端检查',
        path: '/docs/frontend/javascript/notes/ClientCheck/',
        collapsable: true,
        children: [
          { text: '能力检测', link: '/docs/frontend/javascript/notes/ClientCheck/power_check'},
          { text: '用户代理检测', link: '/docs/frontend/javascript/notes/ClientCheck/proxy_check'},
          { text: '软件与硬件检测', link: '/docs/frontend/javascript/notes/ClientCheck/soft_hardware_check'},
        ]
      },
      {
        text: 'ES6',
        path: '/docs/frontend/javascript/notes/ES6/',
        children: [
          { text: 'ES6 常用语法', link: '/docs/frontend/javascript/notes/ES6/in_common_use_es6'},
        ]
      }
    ]
  }
]