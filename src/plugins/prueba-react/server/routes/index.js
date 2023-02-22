module.exports = [
  {
    method: 'GET',
    path: '/calculations',
    handler: 'myController.index',
    config: {
      policies: [],
    }
  },
  {
    method: 'GET',
    path: '/calculations',
    handler: 'calculations.getCalculations',
    config: {
      policies: [],
    }
  }
];
