module.exports = [
  { text: "🏠 首页", link: "/" },
  { text: '前端',
    items: [
      { text: 'HTML', link: '/docs/frontend/html/' },
      { text: 'CSS', link: '/docs/frontend/css/' },
      { text: 'JavaScript', link: '/docs/frontend/javascript/' },
      { text: 'Vue', link: '/docs/frontend/vue/' },
      { text: 'React', link: '/docs/frontend/react/' },
      { text: 'Webpack', link: '/docs/frontend/webpack/' },
      { text: 'Engineering', link: '/docs/frontend/Engineering/' },
      // { text: 'node', link: '/baodian/zero/' }
      { text: 'Dried', link: '/docs/summary/' }
    ]
  },
  {
    text: '📖 面试宝典',
    items: [
      { text: '基础面试', link: '/docs/baodian/zero/' },
      { text: '进阶面试', link: '/docs/baodian/high/index', activeMatch: '^/high/' },
    ]
  },
  {
    text: '📃 题库',
    items: [
      { text: 'CSS',
        link: '/docs/questionBank/css/'
      },
      { text: 'HTML', 
        link: '/docs/questionBank/html/'
      },
      { text: 'JavaScript', 
        link: '/docs/questionBank/javascript/'
      },
    ]
  },
  {
    text: '其他',
    items: [
      {
        text: '随笔',
        link: '/docs/other/'
      },
      {
        text: '学习',
        link: '/docs/study/'
      },
      {
        text: '读书',
        link: '/docs/books/'
      },
    ]
  },
  { text: "📅 归档", link: "/docs" },
  { text: "📂 分类", link: "/tags" }
]