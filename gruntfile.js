module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				banner: "/*! \n * PikadayResponsive \n * \n * author: Francesco Novy \n * licence: MIT license \n * https://github.com/mydea/PikadayResponsive \n */\n\n"
			},
			app: {
				src: ['bower_components/momentjs/moment.js', 'bower_components/pikaday/pikaday.js', 'pikaday-responsive/pikaday-responsive.jquery.js'],
				dest: 'pikaday-responsive/pikaday-package.js'
			},
			css: {
				src: ["bower_components/pikaday/css/pikaday.css", "pikaday-responsive/css/pikaday-responsive.css"],
				dest: "pikaday-responsive/css/pikaday-package.css"
			}
		},
		uglify: {
			options: {
				mangle: false,
				banner: "/*! \n * PikadayResponsive \n * \n * author: Francesco Novy \n * licence: MIT license \n * https://github.com/mydea/PikadayResponsive \n */\n\n"
			},
			pikadayResponsive: {
				src: 'pikaday-responsive/pikaday-responsive.jquery.js',
				dest: 'pikaday-responsive/pikaday-responsive.jquery.min.js'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded',
					banner: "/*! \n * PikadayResponsive \n * \n * author: Francesco Novy \n * licence: MIT license \n * https://github.com/mydea/PikadayResponsive \n */\n\n"
				},
				files: {
					'pikaday-responsive/css/pikaday-responsive.css': 'pikaday-responsive/css/scss/pikaday-responsive.scss'
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