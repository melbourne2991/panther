module.exports = function(grunt) {
  // Configuration goes here
  grunt.initConfig({
	   less: {
	  	options: {
	  		paths: ["public/bower_components/bootstrap/less"]		
	  	},
	  	files: {
	  		"public/css/bootstrap.css" : "public/bower_components/bootstrap/less/bootstrap.less"
	  	}  	
	  } 
  });

  // Load plugins here
  grunt.loadNpmTasks("grunt-contrib");
  grunt.loadNpmTasks("grunt-contrib-less");
};