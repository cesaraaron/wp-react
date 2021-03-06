export const posts = [
  {
    id: 1,
    date: '2017-09-15T17:42:48',
    date_gmt: '2017-09-15T17:42:48',
    guid: { rendered: 'http://localhost/?p=1' },
    modified: '2017-09-15T17:42:48',
    modified_gmt: '2017-09-15T17:42:48',
    slug: 'hello-world',
    status: 'publish',
    type: 'post',
    link: 'http://localhost:8080/hello-world',
    title: { rendered: 'Hello world!' },
    content: {
      rendered:
        '<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n',
      protected: false
    },
    excerpt: {
      rendered:
        '<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n',
      protected: false
    },
    author: 1,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'open',
    sticky: false,
    template: '',
    format: 'standard',
    meta: [],
    categories: [1],
    tags: [],
    _links: {
      self: [{ href: 'http://localhost:8080/wp-json/wp/v2/posts/1' }],
      collection: [{ href: 'http://localhost:8080/wp-json/wp/v2/posts' }],
      about: [{ href: 'http://localhost:8080/wp-json/wp/v2/types/post' }],
      author: [
        {
          embeddable: true,
          href: 'http://localhost:8080/wp-json/wp/v2/users/1'
        }
      ],
      replies: [
        {
          embeddable: true,
          href: 'http://localhost:8080/wp-json/wp/v2/comments?post=1'
        }
      ],
      'version-history': [
        { href: 'http://localhost:8080/wp-json/wp/v2/posts/1/revisions' }
      ],
      'wp:attachment': [
        { href: 'http://localhost:8080/wp-json/wp/v2/media?parent=1' }
      ],
      'wp:term': [
        {
          taxonomy: 'category',
          embeddable: true,
          href: 'http://localhost:8080/wp-json/wp/v2/categories?post=1'
        },
        {
          taxonomy: 'post_tag',
          embeddable: true,
          href: 'http://localhost:8080/wp-json/wp/v2/tags?post=1'
        }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 1031,
    date: '2013-03-15T17:23:27',
    date_gmt: '2013-03-15T22:23:27',
    guid: { rendered: 'http://wptest.io/demo/?p=1031' },
    modified: '2013-03-15T17:23:27',
    modified_gmt: '2013-03-15T22:23:27',
    slug: 'tiled-gallery',
    status: 'publish',
    type: 'post',
    link: 'http://localhost:8080/tiled-gallery',
    title: { rendered: 'Tiled Gallery' },
    content: {
      rendered: '<p>titled gallery content</p>',
      protected: false
    },
    excerpt: {
      rendered:
        '<p>This is a test for Jetpack&#8217;s Tiled Gallery. You can install Jetpack or Slim Jetpack to test it out. This is some text after the Tiled Gallery just to make sure that everything spaces nicely.</p>\n',
      protected: false
    },
    author: 6,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'open',
    sticky: false,
    template: '',
    format: 'standard',
    meta: [],
    categories: [15, 16, 17],
    tags: [],
    _links: {
      self: [{ href: 'http://localhost:8080/wp-json/wp/v2/posts/1031' }],
      collection: [{ href: 'http://localhost:8080/wp-json/wp/v2/posts' }],
      about: [{ href: 'http://localhost:8080/wp-json/wp/v2/types/post' }],
      author: [
        {
          embeddable: true,
          href: 'http://localhost:8080/wp-json/wp/v2/users/6'
        }
      ],
      replies: [
        {
          embeddable: true,
          href: 'http://localhost:8080/wp-json/wp/v2/comments?post=1031'
        }
      ],
      'version-history': [
        { href: 'http://localhost:8080/wp-json/wp/v2/posts/1031/revisions' }
      ],
      'wp:attachment': [
        { href: 'http://localhost:8080/wp-json/wp/v2/media?parent=1031' }
      ],
      'wp:term': [
        {
          taxonomy: 'category',
          embeddable: true,
          href: 'http://localhost:8080/wp-json/wp/v2/categories?post=1031'
        },
        {
          taxonomy: 'post_tag',
          embeddable: true,
          href: 'http://localhost:8080/wp-json/wp/v2/tags?post=1031'
        }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  }
]

export const comments = [
  {
    id: 2,
    post: 1,
    parent: 0,
    author: 0,
    author_name: 'Chris Ames',
    author_url: 'http://chrisam.es/',
    date: '2013-03-15T18:16:59',
    date_gmt: '2013-03-15T23:16:59',
    content: {
      rendered:
        '<p>Ello! Pretend you&#8217;re reading this comment with an English accent.</p>\n'
    },
    link: 'http://wptest.io/demo/page-comments/#comment-2',
    status: 'approved',
    type: 'comment',
    author_avatar_urls: {
      '24':
        'http://2.gravatar.com/avatar/25df3939b2e33bd19783411afd5bc6e3?s=24&d=retro&r=g',
      '48':
        'http://2.gravatar.com/avatar/25df3939b2e33bd19783411afd5bc6e3?s=48&d=retro&r=g',
      '96':
        'http://2.gravatar.com/avatar/25df3939b2e33bd19783411afd5bc6e3?s=96&d=retro&r=g'
    },
    meta: [],
    _links: {
      self: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/comments/2' }],
      collection: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/comments' }],
      up: [
        {
          embeddable: true,
          post_type: 'page',
          href: 'http://wptest.io/demo/wp-json/wp/v2/pages/1077'
        }
      ],
      children: [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/comments?parent=2' }
      ]
    }
  },
  {
    id: 31,
    post: 1,
    parent: 0,
    author: 0,
    author_name: 'Jared Erickson',
    author_url: 'http://jarederickson.com/',
    date: '2013-03-14T13:07:19',
    date_gmt: '2013-03-14T18:07:19',
    content: {
      rendered:
        '<p>Non-breaking text is my favorite!</p>\n<p>Super/Duper/Long/NonBreaking/Path/Name/To/A/File/That/Is/Way/Deep/Down/In/Some/Mysterious/Remote/Desolate/Part/Of/The/Operating/System/To/A/File/That/Just/So/Happens/To/Be/Strangely/Named/Supercalifragilisticexpialidocious.txt</p>\n'
    },
    link: 'http://wptest.io/demo/2013/01/05/non-breaking-text/#comment-31',
    status: 'approved',
    type: 'comment',
    author_avatar_urls: {
      '24':
        'http://2.gravatar.com/avatar/b2c1febfd11117eef66c351c1d4c10f1?s=24&d=retro&r=g',
      '48':
        'http://2.gravatar.com/avatar/b2c1febfd11117eef66c351c1d4c10f1?s=48&d=retro&r=g',
      '96':
        'http://2.gravatar.com/avatar/b2c1febfd11117eef66c351c1d4c10f1?s=96&d=retro&r=g'
    },
    meta: [],
    _links: {
      self: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/comments/31' }],
      collection: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/comments' }],
      up: [
        {
          embeddable: true,
          post_type: 'post',
          href: 'http://wptest.io/demo/wp-json/wp/v2/posts/877'
        }
      ],
      children: [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/comments?parent=31' }
      ]
    }
  }
]

export const categories = [
  {
    id: 2,
    count: 3,
    description: 'Posts in this category test image and text alignment.',
    link: 'http://wptest.io/demo/category/alignment/',
    name: 'Alignment',
    slug: 'alignment',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    _links: {
      self: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/categories/2' }],
      collection: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/categories' }],
      about: [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/taxonomies/category' }
      ],
      'wp:post_type': [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/posts?categories=2' }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 3,
    count: 2,
    description: 'Posts in this category test the aside post format.',
    link: 'http://wptest.io/demo/category/post-format-aside/',
    name: 'Aside',
    slug: 'post-format-aside',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    _links: {
      self: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/categories/3' }],
      collection: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/categories' }],
      about: [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/taxonomies/category' }
      ],
      'wp:post_type': [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/posts?categories=3' }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  }
]

export const users = [
  {
    id: 1,
    name: '7704wpczar',
    url: '',
    description: '',
    link: 'http://wptest.io/demo/author/7704wpczar/',
    slug: '7704wpczar',
    avatar_urls: {
      '24':
        'http://0.gravatar.com/avatar/c942ee663e0eb9a930d4fb8bf33a9d7b?s=24&d=retro&r=g',
      '48':
        'http://0.gravatar.com/avatar/c942ee663e0eb9a930d4fb8bf33a9d7b?s=48&d=retro&r=g',
      '96':
        'http://0.gravatar.com/avatar/c942ee663e0eb9a930d4fb8bf33a9d7b?s=96&d=retro&r=g'
    },
    meta: [],
    _links: { self: [Array], collection: [Array] }
  },
  {
    id: 4,
    name: 'Chris Ames',
    url: '',
    description: '',
    link: 'http://wptest.io/demo/author/dewde/',
    slug: 'dewde',
    avatar_urls: {
      '24':
        'http://2.gravatar.com/avatar/25df3939b2e33bd19783411afd5bc6e3?s=24&d=retro&r=g',
      '48':
        'http://2.gravatar.com/avatar/25df3939b2e33bd19783411afd5bc6e3?s=48&d=retro&r=g',
      '96':
        'http://2.gravatar.com/avatar/25df3939b2e33bd19783411afd5bc6e3?s=96&d=retro&r=g'
    },
    meta: [],
    _links: { self: [Array], collection: [Array] }
  }
]

export const pages = [
  {
    id: 2,
    date: '2016-09-24T17:52:38',
    date_gmt: '2016-09-24T17:52:38',
    guid: { rendered: 'http://demo.s19741.p245.sites.pressdns.com/?page_id=2' },
    modified: '2016-09-24T17:52:38',
    modified_gmt: '2016-09-24T17:52:38',
    slug: 'sample-page',
    status: 'publish',
    type: 'page',
    link: 'http://wptest.io/demo/sample-page/',
    title: { rendered: 'Sample Page' },
    content: {
      rendered:
        '<p>This is an example page. It&#8217;s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:</p>\n<blockquote><p>Hi there! I&#8217;m a bike messenger by day, aspiring actor by night, and this is my website. I live in Los Angeles, have a great dog named Jack, and I like pi&#241;a coladas. (And gettin&#8217; caught in the rain.)</p></blockquote>\n<p>&#8230;or something like this:</p>\n<blockquote><p>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</p></blockquote>\n<p>As a new WordPress user, you should go to <a href="http://demo.s19741.p245.sites.pressdns.com/wp-admin/">your dashboard</a> to delete this page and create new pages for your content. Have fun!</p>\n',
      protected: false
    },
    excerpt: {
      rendered:
        '<p>This is an example page. It&#8217;s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this: Hi there! I&#8217;m a bike messenger &hellip; <a href="http://wptest.io/demo/sample-page/" class="more-link">Continue reading<span class="screen-reader-text"> &#8220;Sample Page&#8221;</span></a></p>\n',
      protected: false
    },
    author: 1,
    featured_media: 0,
    parent: 0,
    menu_order: 0,
    comment_status: 'closed',
    ping_status: 'open',
    template: '',
    meta: [],
    _links: {
      self: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/pages/2' }],
      collection: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/pages' }],
      about: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/types/page' }],
      author: [
        {
          embeddable: true,
          href: 'http://wptest.io/demo/wp-json/wp/v2/users/1'
        }
      ],
      replies: [
        {
          embeddable: true,
          href: 'http://wptest.io/demo/wp-json/wp/v2/comments?post=2'
        }
      ],
      'version-history': [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/pages/2/revisions' }
      ],
      'wp:attachment': [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/media?parent=2' }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 1102,
    date: '2013-03-15T18:28:48',
    date_gmt: '2013-03-15T23:28:48',
    guid: { rendered: 'http://wptest.io/demo/?page_id=1102' },
    modified: '2013-03-15T18:28:48',
    modified_gmt: '2013-03-15T23:28:48',
    slug: 'grandchild-page',
    status: 'publish',
    type: 'page',
    link: 'http://wptest.io/demo/parent-page/child-page-03/grandchild-page/',
    title: { rendered: 'Grandchild Page' },
    content: {
      rendered: '<p>This is a grandchild page.</p>\n',
      protected: false
    },
    excerpt: {
      rendered: '<p>This is a grandchild page.</p>\n',
      protected: false
    },
    author: 1,
    featured_media: 0,
    parent: 1094,
    menu_order: 0,
    comment_status: 'open',
    ping_status: 'open',
    template: '',
    meta: [],
    _links: {
      self: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/pages/1102' }],
      collection: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/pages' }],
      about: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/types/page' }],
      author: [
        {
          embeddable: true,
          href: 'http://wptest.io/demo/wp-json/wp/v2/users/3'
        }
      ],
      replies: [
        {
          embeddable: true,
          href: 'http://wptest.io/demo/wp-json/wp/v2/comments?post=1102'
        }
      ],
      'version-history': [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/pages/1102/revisions' }
      ],
      up: [
        {
          embeddable: true,
          href: 'http://wptest.io/demo/wp-json/wp/v2/pages/1094'
        }
      ],
      'wp:attachment': [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/media?parent=1102' }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  },
  {
    id: 1098,
    date: '2013-03-15T18:27:40',
    date_gmt: '2013-03-15T23:27:40',
    guid: { rendered: 'http://wptest.io/demo/?page_id=1098' },
    modified: '2013-03-15T18:27:40',
    modified_gmt: '2013-03-15T23:27:40',
    slug: 'child-page-05',
    status: 'publish',
    type: 'page',
    link: 'http://wptest.io/demo/parent-page/child-page-05/',
    title: { rendered: 'Child Page 05' },
    content: { rendered: '<p>This is a child page.</p>\n', protected: false },
    excerpt: { rendered: '<p>This is a child page.</p>\n', protected: false },
    author: 1,
    featured_media: 0,
    parent: 1088,
    menu_order: 0,
    comment_status: 'open',
    ping_status: 'open',
    template: '',
    meta: [],
    _links: {
      self: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/pages/1098' }],
      collection: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/pages' }],
      about: [{ href: 'http://wptest.io/demo/wp-json/wp/v2/types/page' }],
      author: [
        {
          embeddable: true,
          href: 'http://wptest.io/demo/wp-json/wp/v2/users/3'
        }
      ],
      replies: [
        {
          embeddable: true,
          href: 'http://wptest.io/demo/wp-json/wp/v2/comments?post=1098'
        }
      ],
      'version-history': [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/pages/1098/revisions' }
      ],
      up: [
        {
          embeddable: true,
          href: 'http://wptest.io/demo/wp-json/wp/v2/pages/1088'
        }
      ],
      'wp:attachment': [
        { href: 'http://wptest.io/demo/wp-json/wp/v2/media?parent=1098' }
      ],
      curies: [{ name: 'wp', href: 'https://api.w.org/{rel}', templated: true }]
    }
  }
]
