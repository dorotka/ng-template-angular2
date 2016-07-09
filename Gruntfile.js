module.exports = function (grunt) {
// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            app1: {
                files: [
                    {
                        expand: true,
                        src: [
                            'app/*.js'
                        ],
                        ext: '.annotated.js', // Dest filepaths will have this extension.
                        extDot: 'last',       // Extensions in filenames begin after the last dot
                    },
                ],
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'app/*.annotated.js'
                ],
                dest: 'dist/app/all.js'
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: false,
                sourceMap: false,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            target: {
                src: 'dist/app/all.js',
                dest: 'dist/app/all.min.js'
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/styles/app.min.css': [
                        'styles/app.css'
                    ]
                }
            }
        },
        compass: {
            dist: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            },
            prod: {
                options: {
                    config: 'config.rb',
                    environment: 'production',
                    force: true
                }
            },
            clean: {
                options: {
                    config: 'config.rb',
                    clean: true
                }
            },
            watch: {
                options: {
                    config: 'config.rb',
                    watch: true
                }
            }
        },
        watch: {
            css: {
                files: ['styles/src/**/*.scss', 'styles/src/*.scss'],
                tasks: ['compass']
            }
        },
        clean: {
            target: ['dist/app/*','dist/styles/*','dist/fonts/*']
        },

        html2js: {
//            https://github.com/karlgoldstein/grunt-html2js
            options: {
                base: '/',
                rename: function(moduleName){
                    return '/' + moduleName;
                }
            },
            main: {
                src: ['templates/**/**/**/*.tpl.html'],
                dest: 'dist/templates/templates.js'
            }
        },

        imagemin: {                          // Task
            dynamic: {
                options: {                       // Target options
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'img',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/img'                  // Destination path prefix
                }]
                }
            },

        copy: {
            main: {
                src:'fonts/*',
                dest: 'dist/'
            },
            images: {
                src: ['**/*'],
                dest: 'dist/'
            }
        }
    });


    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

// Default task(s).
    //grunt.registerTask('minify', ['newer:imagemin']);
    grunt.registerTask('default', ['clean','html2js','ngAnnotate','concat','uglify','cssmin','copy']);
    grunt.registerTask('dev',['compass:clean','compass:watch']);
};
