module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: "\n /* \n * PikadayResponsive \n * A responsive datepicker built on top of Pikaday. It shows the native datepicker on mobile devices and a nice JS-picker on desktop. \n * \n * @author: Francesco Novy \n * @licence: MIT <http://www.opensource.org/licenses/mit-license.php> \n * @link https://github.com/mydea/PikadayResponsive \n * @copyright: (c) <%= grunt.template.today('yyyy') %> \n * @version: <%= pkg.version %> \n */ \n\n",

        modernizr: {
            dist: {
                "dest": "dist/dependencies/pikaday-responsive-modernizr.js",
                "devFile": "src/pikaday-responsive.js",
                "uglify": true
            }
        },
        cssmin: {
            minify: {
                files: {
                    'dist/package_components/pikaday-responsive.min.css': ['dist/package_components/pikaday-responsive.css'],
                    'dist/pikaday-package.min.css': ['dist/pikaday-package.css'],
                    'dist/package_components/pikaday.min.css': ['dist/package_components/pikaday.css']
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            pickADayResponsive: {
                options: {
                    banner: "<%= banner %>"
                },
                files: {
                    'dist/package_components/pikaday-responsive.min.js': ['dist/package_components/pikaday-responsive.js'],
                    'dist/pikaday-package.min.js': ['dist/pikaday-package.js']
                }
            },
            vendor: {
                files: {
                    'dist/package_components/moment-timezone.min.js': ['dist/package_components/moment-timezone.js'],
                    'dist/package_components/pikaday-responsive.min.js': ['dist/package_components/pikaday-responsive.js'],
                    'dist/package_components/pikaday.min.js': ['dist/package_components/pikaday.js']
                }
            }
        },
        concat: {
            lib: {
                options: {
                    banner: "<%= banner %>"
                },
                src: ["src/pikaday-responsive.js"],
                dest: "dist/package_components/pikaday-responsive.js"
            },
            dependencies: {
                files: {
                    "dist/package_components/pikaday.js": ["bower_components/pikaday/pikaday.js"],
                    "dist/package_components/pikaday.css": ["bower_components/pikaday/css/pikaday.css"],
                    "dist/package_components/moment.js": ["bower_components/moment/moment.js"],
                    "dist/package_components/moment.min.js": ["bower_components/moment/min/moment.min.js"],
                    "dist/package_components/moment-timezone.js": ["bower_components/moment-timezone/moment-timezone.js"],
                    "dist/dependencies/jquery.min.js": ["bower_components/jquery/dist/jquery.min.js"],
                }
            },
            app: {
                options: {
                    banner: "<%= banner %>"
                },
                src: ['dist/package_components/moment.js', 'dist/package_components/pikaday.js', 'dist/package_components/pikaday-responsive.js'],
                dest: 'dist/pikaday-package.js'
            },
            css: {
                src: ["dist/package_components/pikaday.css", "dist/package_components/pikaday-responsive.css"],
                dest: "dist/pikaday-package.css"
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: "none"
                },
                files: {
                    'dist/package_components/pikaday-responsive.css': 'src/css/scss/pikaday-responsive.scss'
                }
            }
        },
        "bower-install-simple": {
            options: {
                color: true
            },
            "prod": {
                options: {
                    production: true
                }
            },
            "dev": {
                options: {
                    production: false
                }
            }
        },
        'bower-update': {
            options: {
                pickAll: true,
                filter: function(package, options) {
                    if (package.name.indexOf('jquery') === 0) {
                        return false
                    }
                    return true
                },
                rangeChar: '~'
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-bower-install-simple');
    grunt.loadNpmTasks('grunt-bower-update');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ["bower-update", "bower-install-simple", "sass", "concat", "uglify", "cssmin", "modernizr"]);

};
