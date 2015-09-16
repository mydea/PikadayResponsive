module.exports = function (grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: "/*! \n * PikadayResponsive \n * A responsive datepicker built on top of Pikaday. It shows the native datepicker on mobile devices and a nice JS-picker on desktop. \n * \n * @author: Francesco Novy \n * @licence: MIT <http://www.opensource.org/licenses/mit-license.php> \n * @link https://github.com/mydea/PikadayResponsive \n * @copyright: (c) <%= grunt.template.today('yyyy') %> \n * @version: <%= pkg.version %> \n */ \n\n",

        concat: {
            options: {
                banner: "<%= banner %>"
            },
            copy: {
                src: ["src/pikaday-responsive.js"],
                dest: "dist/pikaday-responsive.js"
            },
            app: {
                src: ['bower_components/momentjs/moment.js', 'bower_components/pikaday/pikaday.js', 'src/pikaday-responsive.js'],
                dest: 'dist/pikaday-package.js'
            },
            css: {
                src: ["bower_components/pikaday/css/pikaday.css", "dist/pikaday-responsive.css"],
                dest: "dist/pikaday-package.css"
            }
        },
        uglify: {
            options: {
                mangle: false,
                banner: "<%= banner %>"
            },
            pikadayResponsive: {
                src: 'src/pikaday-responsive.js',
                dest: 'dist/pikaday-responsive.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: "none",
                    banner: "<%= banner %>"
                },
                files: {
                    'dist/pikaday-responsive.css': 'src/css/scss/pikaday-responsive.scss'
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ["sass", "uglify", "concat"]);

};