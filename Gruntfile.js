
"use strict";  

module.exports = function(grunt) {
  var port = 10000;

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    svg2png: {
        all: {
            files: [
                { src: ['img/svg/*.svg'], dest: 'img/png/' }
            ]
        }
    },

    uglify: {
      my_target: {
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    },

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    compass: {                 // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'scss',
          cssDir: 'css',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'scss',
          cssDir: 'css'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      
      options: {
        livereload: true
      },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['compass']
      },

      scripts: {
        files: ['js/script.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
      svg: {
        files: ['img/svg/*.svg'],
        tasks: ['svg2png']
      },
      livereload: {
        files: ['*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
        options: {
          livereload: true
        }
      }
    },
    //Non PHP server
    connect: {
      server: {
        options: {
          port: port,
          hostname: 'localhost',
          keepalive: false,
          //debug: true
          livereload: true,
          base: ''
        }
      }
    }

  });

/*
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
*/
  grunt.registerTask('serve', [ 'connect', 'watch' ]);

}