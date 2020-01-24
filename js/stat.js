'use strict';

var CLOUD_WIDTH = 420; // ширина табло
var CLOUD_HEIGHT = 270; // высота табло
var CLOUD_X = 100; // координата X табло
var CLOUD_Y = 10; // координата Y табло
var GAP = 20; // отступ
var GAP_SHADOW = 10; // padding тени
var BAR_HEIGHT = 150; // высота колонки
var BAR_WIDTH = 40; // ширина колонки
var BAR_DISTANCE = 50; // расстояние между колонками

// создание табло
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
// случайное число от min до max
var intRand = function (min, max) {
  return Math.round(min + (max - min) * Math.random());
};
// область внутри табло с результатами
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000'; // цвет элементов по умолчанию

  var maxTime = getMaxElement(times);

  ctx.fillText('Ура Вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP_SHADOW + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP_SHADOW + GAP * 2);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'top';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_DISTANCE) * i, CLOUD_Y + GAP * 3 + BAR_HEIGHT - (BAR_HEIGHT * (100 * times[i]) / maxTime) / 100);

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + intRand(0, 100) + '%,' + intRand(0, 100) + '%)';
    ctx.fillRect(CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_DISTANCE) * i, CLOUD_Y + GAP * 4 + BAR_HEIGHT, BAR_WIDTH, -(BAR_HEIGHT * (100 * times[i]) / maxTime) / 100);

    ctx.fillStyle = '#000';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(players[i], CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_DISTANCE) * i, CLOUD_Y + GAP * 5 + BAR_HEIGHT);
  }
};
