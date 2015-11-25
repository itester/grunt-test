module.exports = function(grunt) {

	// 1-config
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				stripBanners: true,
				banner: '/*!<%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				separator: ';'
			},
			js: {
				src: ['src/js/utils/common.js', 'src/js/utils/*.js', 'src/js/test.js', 'src/js/app.js'],
				dest: 'build/js/<%= pkg.name %>.js'
			}
		},

		uglify: {
			options: {
				stripBanners: true,
				banner: '/*!<%= pkg.name %>.min.js <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				src: '<%= concat.js.dest %>',
				dest: 'build/js/<%= pkg.name %>.min.js'
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: false,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					"module": true,
					"jQuery": true,
					"$": true,
					"common": true,
					"console": false
				}
			},
			gruntfile: ['Gruntfile.js'],
			files: ['src/js/*.js']
		},

		less: {
			development: {
				options: {
					compress: false,
					yuicompress: false
				},
				files: {
					"src/less/css/common.css": "src/less/common.less"
						/*,
							          "css/APP.web.index.css": "src/web/less/APP.web.index.less"*/
				}
			}
			/*,
				      production: {
				        options: {
				          modifyVars: {
				            //imagepath_page: '"/misc/images/"',
				            //imagepath: '"/misc/images/"'
				          },
				          compress: true,
				          yuicompress: true,
				          optimization: 2
				        },
				        files: {
				          "src/less/common.min.css": "src/less/common.less"
				        }
				      }*/
		},
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			compress: {
				files: {
					'build/css/<%= pkg.name %>.min.css': ['src/less/css/normalize.css', 'src/less/css/common.css']
				}
			}
		},
		/*
		connect: {
			options: {
				port: 18082,
				hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
				livereload: 35729 //声明给 watch 监听的端口
			},

			server: {
				options: {
					open: true, //自动打开网页 http://
					base: [
						'grunt-test' //主目录
					]
				}
			}
		},
		*/
		watch: {
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['concat', 'jshint', 'uglify', 'less', 'cssmin', 'watch'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['src/less/*.less'],
				tasks: ['less', 'cssmin'],
				options: {
					spawn: false
				}
			},
			js: {
				files: ['src/js/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					spawn: false
				}
			}/*,
			livereload: {
				options: {
					livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
				},

				files: [ //下面文件的改变就会实时刷新网页
					'Gruntfile.js',
					'*.html',
					'src/less/{,*//*}*.less',
					'src/js/{,*//*}*.js',
					'images/{,*//*}*.{png,jpg}'
				]
			}*/
		}
	});

	//2-load
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	/*
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('serve', [
		'connect:server',
		'watch'
	]);
	*/

	//3-register
	grunt.registerTask('default', ['concat', 'jshint', 'uglify', 'less', 'cssmin', 'watch']);
};