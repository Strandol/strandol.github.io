module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // Load all grunt-* packages from package.json
  require('time-grunt')(grunt);       // Display the elapsed execution time of grunt tasks

  grunt.initConfig({

    sass: {
      dist: {
        files: {
          'build/css/style.css': ['src/scss/style.scss']
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: 'build/css/style.css'
      }
    },


    cmq: {
      style: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },


    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },


    concat: {
      start: {
        src: [
          // 'src/js/plugin.js',
          'src/js/script.js'
        ],
        dest: 'build/js/script.min.js'
      }
    },


    uglify: {
      start: {
        files: {
          'build/js/script.min.js': ['build/js/script.min.js']
        }
      }
    },


    imagemin: {
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['build/img/*.{png,jpg,gif,svg}']
        }]
      }
    },


    clean: {
      build: [
        'build/css',
        'build/img',
        'build/js',
        'build/*.html',
      ]
    },


    copy: {
      js_vendors: {
        expand: true,
        cwd: 'src/js/vendors/',
        src: ['**'],
        dest: 'build/js/',
      },
      img: {
        expand: true,
        cwd: 'src/img/',
        src: ['*.{png,jpg,gif,svg}'],
        dest: 'build/img/',
      },
      css_min: {
        src: ['build/css/style.css'],
        dest: 'build/css/style.min.css',
      },
      css_add: {
        expand: true,
        cwd: 'src/scss/css/',
        src: ['*.css'],
        dest: 'build/css/',
      }
      // fonts: {
      //   expand: true,
      //   cwd: 'src/font/',
      //   src: ['*.{eot,svg,woff,ttf}'],
      //   dest: 'build/font/',
      // },
    },


    includereplace: {
      html: {
        src: '*.html',
        dest: 'build/',
        expand: true,
        cwd: 'src/'
      }
    },


    watch: {
      style: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['copy:js'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      images: {
        files: ['src/img/**/*.{png,jpg,gif,svg}'],
        tasks: ['img'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      html: {
        files: ['src/*.html', 'src/_html_inc/*.html'],
        tasks: ['includereplace:html'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    },

    csscomb: {
      style:{
        expand: true,
        src: ["src/scss/**/*.scss"]
      }
    },


    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'build/css/*.css',
            'build/js/*.js',
            'build/img/*.{png,jpg,gif,svg}',
            'build/*.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "build/",
          },
          startPath: "/form.html",

          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    },

  });


  grunt.registerTask('default', [
    // 'copy:css_add',           // копируем дополнительные CSS-файлы из src/scss/css/ в build/css/
    'sass',                   // компилируем стили в          build/css/style.css
    'postcss',                // обрабатываем автопрефиксером build/css/style.css
    'copy:css_min',           // создаем                      build/css/style.min.css
    'cmq',                    // объединяем медиа-правила в   build/css/style.min.css
    'cssmin',                 // минифицируем                 build/css/style.min.css
    'concat',                 // объединяем все указанные JS-файлы в build/js/script.min.js
    'uglify',                 // минифицируем                        build/js/script.min.js
    'copy:js_vendors',        // копируем всё из src/js/vendors/ в build/js/
    'copy:img',               // копируем всё из src/img/ в build/img/
    // 'copy:fonts',             // копируем всё из src/font/ в build/font/
    // 'imagemin',               // минифицируем картинки в build/img/
    'includereplace:html',    // собираем HTML-файлы в build/
    'browserSync',            // запускаем плюшки автообновления
    'watch',                   // запускаем слежение за изменениями файлов
  ]);


  grunt.registerTask('build', [
    'clean:build',            // удаляем build/
    'copy:css_add',           // копируем дополнительные CSS-файлы из src/scss/css/ в build/css/
    'sass',                   // компилируем стили в          build/css/style.css
    'postcss',                // обрабатываем автопрефиксером build/css/style.css
    'copy:css_min',           // создаем                      build/css/style.min.css
    'cmq',                    // объединяем медиа-правила в   build/css/style.min.css
    'cssmin',                 // минифицируем                 build/css/style.min.css
    'concat',                 // объединяем все указанные JS-файлы в build/js/script.min.js
    'uglify',                 // минифицируем                        build/js/script.min.js
    'copy:js_vendors',        // копируем всё из src/js/vendors/ в build/js/
    'copy:img',               // копируем всё из src/img/ в build/img/
    // 'copy:fonts',             // копируем всё из src/font/ в build/font/
    'imagemin',               // минифицируем картинки в build/img/
    'includereplace:html',    // собираем HTML-файлы в build/
  ]);

}
