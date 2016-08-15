'use strict';

app.config(function ($stateProvider) {

  $stateProvider.state('state2', {
    url: '/train',
    templateUrl: '/state-2/template.html',
    controller: 'State2Ctrl',
    resolve: {
      inputs: function (TrainerFactory) {
        return TrainerFactory.getInputs();
      }
    }
  });
});

app.controller('State2Ctrl', function ($scope, TrainerFactory, inputs) {


  function Neuron (id) {
    this.id = id;
  }

  function HiddenLayer () {
    this.neurons = [];
    for(var i = 1; i < 6; i++) {
      this.neurons.push(new Neuron(i));
    }
  }

  HiddenLayer.prototype.addToNeurons = function () {
    this.neurons.push(new Neuron(this.neurons.length + 1));
  };

  HiddenLayer.prototype.removeFromNeurons = function () {
    this.neurons.pop();
  };

  $scope.numInputs = inputs;

  $scope.hiddenLayers = [];

  $scope.trainNetwork = function () {
    $scope.greeting = 'The network is being trained!!!';
    // show some kind of 'loading' graphic
  };

  $scope.addLayers = function () {
    $scope.hiddenLayers.push(new HiddenLayer());
  };

  $scope.removeLayers = function () {
    if ($scope.hiddenLayers.length) {
      $scope.hiddenLayers.pop();
    }
  };

  $scope.addNeurons = function (index) {
    $scope.hiddenLayers[index].addToNeurons();
  };

  $scope.removeNeurons = function (index) {
    $scope.hiddenLayers[index].removeFromNeurons();
  };

});
