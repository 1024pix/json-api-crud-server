module.exports = (() => {

  const config = {

    port: parseInt(process.env.PORT, 10) || 3000,

  };

  if (process.env.NODE_ENV === 'production') {
    // Add your "production" settings here
  }

  if (process.env.NODE_ENV === 'test') {
    // Add your "test" settings here
  }

  return config;

})();
