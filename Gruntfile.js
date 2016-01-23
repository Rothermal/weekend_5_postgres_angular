module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: 'client/client.js'
        },
        watch: {
            scripts: {
                files: 'client/client.js',
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            }
        },
        //css: {
        //    files: '**/*.scss',
        //    tasks: ['sass']
        //},
        uglify: {
            build: {
                src: 'client/client.js',
                dest: 'server/public/assets/scripts/client.min.js'
            }
        },
        //sass: {
        //    dist: {
        //        files: {
        //            'server/public/styles/stylesheet.css' : 'server/public/styles/stylesheet.scss'
        //        }
        //    }
        //},
        copy: {
            angular: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular-route/angular-route.min.js"
                ],
                "dest": "server/public/vendor/"
            },
        bootstrap: {
            expand: true,
            cwd: "node_modules/bootstrap/dist/css/",
            src: [
                "bootstrap.min.css",
                "bootstrap.min.css.map"
            ],
            "dest": "server/public/vendor/bootstrap/"
        }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify','watch']);

};
