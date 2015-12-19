module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		less: {
			build: {
				files: {
					'css/main.css': 'styles/main.less'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	
	grunt.registerTask('default', [ 'uglify' ]);

};