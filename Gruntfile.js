module.exports = function ( grunt ) {
  grunt.initConfig({
    jshint: {
      app: ['app.js'],
      qa: ['Gruntfile.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};
