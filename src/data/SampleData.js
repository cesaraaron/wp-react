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
      rendered:
        '<p>This is a test for Jetpack&#8217;s Tiled Gallery.</p>\n<p>You can install <a title="Jetpack for WordPress" href="http://jetpack.me/" target="_blank">Jetpack</a> or <a title="Slim Jetpack" href="http://wordpress.org/extend/plugins/slimjetpack/" target="_blank">Slim Jetpack</a> to test it out.</p>\n\n\t\t<style type=\'text/css\'>\n\t\t\t#gallery-1 {\n\t\t\t\tmargin: auto;\n\t\t\t}\n\t\t\t#gallery-1 .gallery-item {\n\t\t\t\tfloat: left;\n\t\t\t\tmargin-top: 10px;\n\t\t\t\ttext-align: center;\n\t\t\t\twidth: 25%;\n\t\t\t}\n\t\t\t#gallery-1 img {\n\t\t\t\tborder: 2px solid #cfcfcf;\n\t\t\t}\n\t\t\t#gallery-1 .gallery-caption {\n\t\t\t\tmargin-left: 0;\n\t\t\t}\n\t\t\t/* see gallery_shortcode() in wp-includes/media.php */\n\t\t</style>\n\t\t<div id=\'gallery-1\' class=\'gallery galleryid-1031 gallery-columns-4 gallery-size-thumbnail\'><dl class=\'gallery-item\'>\n\t\t\t<dt class=\'gallery-icon portrait\'>\n\t\t\t\t<a href=\'http://localhost:8080/tiled-gallery/fight-club\'><img width="150" height="150" src="http://localhost:8080/wp-content/uploads/2013/03/fight-club-150x150.jpg" class="attachment-thumbnail size-thumbnail" alt="Fight Club" srcset="http://localhost:8080/wp-content/uploads/2013/03/fight-club-150x150.jpg 150w, http://localhost:8080/wp-content/uploads/2013/03/fight-club-1200x1200.jpg 1200w, http://localhost:8080/wp-content/uploads/2013/03/fight-club-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" /></a>\n\t\t\t</dt></dl><dl class=\'gallery-item\'>\n\t\t\t<dt class=\'gallery-icon portrait\'>\n\t\t\t\t<a href=\'http://localhost:8080/tiled-gallery/the-dark-knight-rises\'><img width="150" height="150" src="http://localhost:8080/wp-content/uploads/2013/03/the-dark-knight-rises-150x150.jpg" class="attachment-thumbnail size-thumbnail" alt="The Dark Knight Rises" srcset="http://localhost:8080/wp-content/uploads/2013/03/the-dark-knight-rises-150x150.jpg 150w, http://localhost:8080/wp-content/uploads/2013/03/the-dark-knight-rises-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" /></a>\n\t\t\t</dt></dl><dl class=\'gallery-item\'>\n\t\t\t<dt class=\'gallery-icon portrait\'>\n\t\t\t\t<a href=\'http://localhost:8080/tiled-gallery/captain-america\'><img width="150" height="150" src="http://localhost:8080/wp-content/uploads/2013/03/captain-america-150x150.jpg" class="attachment-thumbnail size-thumbnail" alt="Captain America" srcset="http://localhost:8080/wp-content/uploads/2013/03/captain-america-150x150.jpg 150w, http://localhost:8080/wp-content/uploads/2013/03/captain-america-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" /></a>\n\t\t\t</dt></dl><dl class=\'gallery-item\'>\n\t\t\t<dt class=\'gallery-icon portrait\'>\n\t\t\t\t<a href=\'http://localhost:8080/tiled-gallery/man-of-steel\'><img width="150" height="150" src="http://localhost:8080/wp-content/uploads/2013/03/man-of-steel-150x150.jpg" class="attachment-thumbnail size-thumbnail" alt="Man Of Steel" srcset="http://localhost:8080/wp-content/uploads/2013/03/man-of-steel-150x150.jpg 150w, http://localhost:8080/wp-content/uploads/2013/03/man-of-steel-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" /></a>\n\t\t\t</dt></dl><br style="clear: both" /><dl class=\'gallery-item\'>\n\t\t\t<dt class=\'gallery-icon portrait\'>\n\t\t\t\t<a href=\'http://localhost:8080/tiled-gallery/spider-man\'><img width="150" height="150" src="http://localhost:8080/wp-content/uploads/2013/03/spider-man-150x150.jpg" class="attachment-thumbnail size-thumbnail" alt="The Amazing Spider Man" srcset="http://localhost:8080/wp-content/uploads/2013/03/spider-man-150x150.jpg 150w, http://localhost:8080/wp-content/uploads/2013/03/spider-man-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" /></a>\n\t\t\t</dt></dl><dl class=\'gallery-item\'>\n\t\t\t<dt class=\'gallery-icon portrait\'>\n\t\t\t\t<a href=\'http://localhost:8080/tiled-gallery/ironman-2\'><img width="150" height="150" src="http://localhost:8080/wp-content/uploads/2013/03/ironman-2-150x150.jpg" class="attachment-thumbnail size-thumbnail" alt="Iron Man 2" srcset="http://localhost:8080/wp-content/uploads/2013/03/ironman-2-150x150.jpg 150w, http://localhost:8080/wp-content/uploads/2013/03/ironman-2-100x100.jpg 100w" sizes="(max-width: 150px) 100vw, 150px" /></a>\n\t\t\t</dt></dl>\n\t\t\t<br style=\'clear: both\' />\n\t\t</div>\n\n<p>This is some text after the Tiled Gallery just to make sure that everything spaces nicely.</p>\n',
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
    post: 1077,
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
    post: 877,
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
