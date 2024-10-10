// Karma configuration file
// This configuration is modularized for better readability and maintainability.
// It supports both development and CI environments efficiently.

module.exports = function (config) {
  const isCI = process.env.CI === 'true';

  const reporters = ['progress', 'kjhtml'];
  const browsers = ['Chrome'];

  // Add CI-specific browser if running in CI environment
  if (isCI) {
    browsers.push('ChromeHeadlessCI'); 
  }
  
  // Configure coverage reporter settings
  function configureCoverageReporter() {
    return {
      dir: require('path').join(__dirname, './coverage/server-app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    };
  }

  // Configure Jasmine client settings
  function configureClient() {
    return {
      jasmine: {
        // Jasmine options can be added here
      },
      clearContext: false // Keep Jasmine Spec Runner output visible
    };
  }

  // Configure Jasmine HTML reporter settings
  function configureJasmineHTMLReporter() {
    return {
      suppressAll: true // Suppress duplicated traces
    };
  }

  // Configure custom launchers for browsers
  function configureCustomLaunchers() {
    return {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'] // CI-specific flag
      }
    };
  }

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: configureClient(),
    jasmineHtmlReporter: configureJasmineHTMLReporter(),
    coverageReporter: configureCoverageReporter(),
    reporters: reporters,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: !isCI, // Do not auto-watch in CI
    browsers: browsers,
    singleRun: isCI, // Run once in CI
    restartOnFileChange: !isCI, // Restart on file change unless in CI
    customLaunchers: configureCustomLaunchers(), // Add custom launchers
  });
};
