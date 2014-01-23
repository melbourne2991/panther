// Karma configuration
// Generated on Sun Jan 12 2014 23:42:58 GMT+1100 (EST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: './',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'manual_components/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',

      'js/app.js',
      'js/animations.js',
      'js/controllers.js',
      'js/filters.js',
      'js/services.js',
      'js/directives.js',

      'js/tests/*.js',

      'partials/**/*.html',

      //fixtures
      {pattern: 'js/tests/api_mock/*.json', watched: true, served: true, included: false},
      {pattern: 'partials/product/*.html', watched: true, served: true, included: false}
    ],

    preprocessors: {
      'partials/**/*.html': ['ng-html2js']
    },

    // list of files to exclude
    exclude: [
      
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });

};