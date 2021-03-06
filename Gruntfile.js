module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: ['src/init.js', 'src/modules/**/*.js'],
				dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},		

		jasmine: {
			coverage: {
				src: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
				options: {
					version: "2.0.0",
					'--web-security' : false,
					'--local-to-remote-url-access' : true,
					'--ignore-ssl-errors' : true,
					specs: 'spec/*Spec.js',
					vendor: 'lib/*.js',
					helpers: 'spec/Helpers/*.js',
					keepRunner: true,
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: 'coverage/coverage.json',
						report: 'coverage',
						thresholds: {
							lines: 50,
							statements: 50,
							branches: 50,
							functions: 50
						}
					}
				}
			}
		},

		watch: {
  			scripts: {
    			files: ['**/*.js'],
    			tasks: ['default'],
    			options: {
      				spawn: false,
    			},
  			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'uglify', 'jasmine']);
	grunt.registerTask('watch-changes', ['watch'])
};