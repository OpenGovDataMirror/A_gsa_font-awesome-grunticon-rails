var fs = require('fs');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    clean: [ 'build', 'vendor' ],

    copy: {
      generated_images: {
        cwd: 'build/assets/png',
        expand: true,
        src: '*',
        dest: 'vendor/assets/images/png/'
      },
      generated_javascripts: {
        cwd: 'build/assets',
        expand: true,
        src: '*.js',
        dest: 'vendor/assets/javascripts/'
      },
      generated_stylesheets: {
        cwd: 'build/assets',
        expand: true,
        src: '*.css',
        dest: 'vendor/assets/stylesheets/'
      },
      static_images: {
        cwd: 'src/assets/images',
        expand: true,
        src: '*',
        dest: 'vendor/assets/images/'
      },
      static_javascripts: {
        cwd: 'src/assets/javascripts',
        expand: true,
        src: '*',
        dest: 'vendor/assets/javascripts/'
      },
      static_stylesheets: {
        cwd: 'src/assets/stylesheets',
        expand: true,
        src: '*',
        dest: 'vendor/assets/stylesheets/'
      }
    },

    grunticon: {
      fontawesome: {
        files: [{
          expand: true,
          cwd: 'build/transformed',
          src: ['*.svg'],
          dest: 'build/assets'
        }],
        options: {
          colors: {
            black: '#000',
            inactive: '#999',
            lightblue: '#08c'
          },
          corsEmbed: true,
          cssprefix: '.fa-',
          datapngcss: 'font-awesome-grunticon-rails-icons.data.png.css',
          datasvgcss: 'font-awesome-grunticon-rails-icons.data.svg.css',
          defaultHeight: '56px',
          defaultWidth: '56px',
          enhanceSVG: true,
          loadersnippet: 'font-awesome-grunticon-rails-loader.js',
          urlpngcss: 'font-awesome-grunticon-rails-fallback.css'
        }
      }
    },

    jshint: {
      build: ['Gruntfile.js'],
      options: {
        reporter: require('jshint-stylish')
      }
    },

    pkg: grunt.file.readJSON('package.json')

  });

  grunt.registerTask('svg-extract', 'Use font-awesome-svg-png to extract a subset of FA icons', function() {
    var sys = require('sys');
    var execSync = require('child_process').execSync;
    var filename = __dirname + '/icons.list';
    var iconList = fs.readFileSync(filename).toString().split("\n").join(',');
    program = ['font-awesome-svg-png', '--dest', 'build/raw', '--no-png', '--color', 'white', '--icons', iconList].join(' ');
    console.log(program);
    execSync(program);
  });

  grunt.registerTask('transform', 'Transform extracted SVGs into fill-less, smaller icons', function() {
    var svgpath = require('svgpath');
    var dom = require('xmldom').DOMParser;

    var path = require('path');
    var glob = require('glob');
    var mkdirp = require('mkdirp');
    var forceWidth = 16;

    var rootDir = __dirname + '/build';
    var sourceDir = rootDir + '/raw/white/svg';
    var destDir = rootDir + '/transformed';

    mkdirp.sync(destDir);

    console.log(sourceDir);

    files = glob.sync('*.svg', { cwd: sourceDir });

    for(var i = 0; i<files.length; i++) {
        var file = files[i];
        console.log(file);
        content = fs.readFileSync(sourceDir + '/' + file).toString();

        doc = new dom().parseFromString(content);
        svg = doc.getElementsByTagName('svg')[0];
        width = parseInt(svg.getAttribute('width'));
        spath = svg.getElementsByTagName('path')[0];

        var scaleFactor = forceWidth/width;
        svg.removeAttribute('width');
        svg.removeAttribute('height');

        svg.setAttribute('viewBox', '0 0 ' + forceWidth.toString() + ' ' + forceWidth.toString());
        spath.setAttribute('d', svgpath(spath.getAttribute('d')).scale(scaleFactor).rel().toString());

        fs.writeFileSync(destDir + '/' + path.basename(file, '.svg') + '.colors-black-lightblue-inactive.svg', doc.toString());
        console.log("finished: " + file);
    }
  });

  grunt.registerTask('default', [
    'clean',
    'svg-extract',
    'transform',
    'grunticon',
    'copy'
  ]);
};
