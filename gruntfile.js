module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				banner: "/*! \n * PikadayResponsive \n * \n * author: Francesco Novy \n * licence: MIT license \n * https://github.com/mydea/PikadayResponsive \n */\n\n",
			},
			app: {
				src: ['libs/moment-2.6.0.min.js', 'pikaday/pikaday.min.js', 'pikaday/pikaday-responsive.jquery.min.js'],
				dest: 'pikaday/pikaday-package.js'
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			pikaday: {
				src: 'pikaday/pikaday.js',
				dest: 'pikaday/pikaday.min.js'
			},
			pikadayResponsive: {
				src: 'pikaday/pikaday-responsive.jquery.js',
				dest: 'pikaday/pikaday-responsive.jquery.min.js'
			}
		}

	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ["uglify", "concat"]);

};