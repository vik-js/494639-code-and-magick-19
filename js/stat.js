'use strict';

var CLOUD_WIDTH = 420; // ширина табло
var CLOUD_HEIGHT = 270; // высота табло
var CLOUD_X = 100; // координата X табло
var CLOUD_Y = 10; // координата Y табло
var GAP = 20; // отступ
var GAP_SHADOW = 10; // смещение тени
var GAP_BAR_X = CLOUD_X + GAP * 2; // расстояние до начала колонок
var BAR_HEIGHT = 150; // высота колонки
var BAR_WIDTH = 40; // ширина колонки
var BAR_DISTANCE = 50; // расстояние между колонками


// табло и тень
var renderCloudShape = function (ctx, x, y, color) {
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
// стили текста
var createFontStyle = function (ctx, font, style) {
  ctx.font = font;
  ctx.fillStyle = style;
};
// область внутри табло с результатами
window.renderStatistics = function (ctx, players, times) {
  renderCloudShape(ctx, CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloudShape(ctx, CLOUD_X, CLOUD_Y, '#fff');
  createFontStyle(ctx, '16px PT Mono', '#000');
  ctx.fillText('Ура Вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP_SHADOW + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP_SHADOW + GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barHeigth = (BAR_HEIGHT * (100 * times[i]) / maxTime) / 100; // расчет высоты колонки
    var currentX = GAP_BAR_X + (BAR_WIDTH + BAR_DISTANCE) * i; // итерация каждой колонки

    createFontStyle(ctx, '16px PT Mono', '#000');
    ctx.fillText(Math.round(times[i]), currentX, CLOUD_Y + GAP / 2 + GAP * 3 + BAR_HEIGHT - barHeigth);
    ctx.fillText(players[i], currentX, CLOUD_Y + GAP * 5 + BAR_HEIGHT);

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + intRand(0, 100) + '%,' + intRand(0, 100) + '%)';
    ctx.fillRect(currentX, CLOUD_Y + GAP * 4 + BAR_HEIGHT, BAR_WIDTH, -barHeigth);
  }
};
