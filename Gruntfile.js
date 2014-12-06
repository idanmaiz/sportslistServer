module.exports = function(grunt) {
    var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
    banner += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';
 
    grunt.initConfig({
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: { src: ['tests/*.js'] }
        },
	
	execute: {
        	dev: {
           	  // execute javascript files in a node child_process
            	  src: ['app.js']
        	},
		
		production: {
		  src: ['app.js']
		}
	},

	supervisor: {
	 	        target: {
   			    script: "app.js"
  			}
	}	
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-supervisor');

	 
    grunt.registerTask('test',['simplemocha']);

    grunt.registerTask('dev',['test','execute:dev']);

    grunt.registerTask('start', ['supervisor']);
};
