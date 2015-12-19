module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		less: {
			build: {
				files: {
					'css/main.css': 'styles/main.less'
				}
			}
		},
		ftp_push: {
		    demo: {
		    	options: {
		    		authKey: 'netology',
		    		host: 'university.netology.ru',
		    		dest: '/fbb-store/',
		    		port: 21
		    	},
		    	files: [{
		    		expand: true,
		    		cwd: '.',
		    		src: [
		    		      'index.html',
		    		      'css/main.css'
		    		]
		        }]
		    }
		 }
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-ftp-push');
	
	grunt.registerTask('default', ['less', 'ftp_push']);

};