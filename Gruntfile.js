module.exports = function(grunt) {
  // Configuration goes here
  grunt.initConfig({

   less: {
      development: {
        files: {
            "public/css/app.css" : "public/less/app.less"
        }   
     } 
    }
  });

  // Load plugins here
  grunt.loadNpmTasks("grunt-contrib");
  grunt.loadNpmTasks("grunt-contrib-less");
};