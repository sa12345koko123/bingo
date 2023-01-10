// 'use strict';

// {
//     const currentNumber = document.getElementById('current-number');
//     const startButton = document.getElementById('start-button');
//     const result = document.getElementById('result');

//     const from = 1;
//     const to = 75;
//     const lotteryNumbers = [];

//     const resetLotteryNumbers = nums => {
//         for (let i = from; i <= to; i++) {
//             nums.push(i);
//         }
//     };
//     resetLotteryNumbers(lotteryNumbers);

//     const fragment = document.createDocumentFragment();
//     let row;

//     lotteryNumbers.forEach((num, index) => {
//         if (index % 15 === 0) {
//             row = fragment.appendChild(document.createElement('div'));
//             row.classList.add('row');
//         }

//         const column = document.createElement('div');
//         column.textContent = num;
//         column.classList.add('column');

//         row.appendChild(column);
//     });

//     result.appendChild(fragment);

//     const resetBingo = () => {
//         currentNumber.textContent = '?';
//         startButton.textContent = 'Go!!';

//         const hits = result.querySelectorAll('.hit');
//         hits.forEach(hit => {
//             hit.classList.remove('hit');
//         });

//         resetLotteryNumbers(lotteryNumbers);
//     };

//     startButton.addEventListener('click', () => {
//         const randomNumber = Math.floor(Math.random() * lotteryNumbers.length);
//         const winningNumber = lotteryNumbers.splice(randomNumber, 1);

//         if (lotteryNumbers.length === 0) {
//             startButton.textContent = 'Reset';
//         }

//         if (winningNumber.length === 0) {
//             resetBingo();
//             return;
//         }

//         currentNumber.textContent = winningNumber[0];

//         const columns = result.querySelectorAll('.column');
//         columns[winningNumber[0] - 1].classList.add('hit');
//     });
// }

window.addEventListener('load', function bingo() {
  let setBtn = document.getElementById('setBtn');
  let startBtn = document.getElementById('startBtn');
  let stopBtn = document.getElementById('stopBtn');
  let resetBtn = document.getElementById('resetBtn');
  let result = document.getElementById('result');
  let position = 'beforeend';
  let dramroll = document.getElementById('dramroll');
  let pingpong = document.getElementById('pingpong');
  // ボタンの起動
  resetBtn.disabled = true;
  startBtn.disabled = true;
  stopBtn.disabled = true;
  // セットクリック
  function setBingo(){
    let max = parseInt(document.setmenu.dat.value, 10);    // 入力された値を数値に変換
    let numList = [...Array(max).keys()].map(i => ++i);    // max分の番号を入れた配列
    let el01 = document.querySelector('#numList');
    let el02 = document.querySelector('#result');
    // ボタンの起動
    setBtn.disabled = true;
    resetBtn.disabled = false;
    startBtn.disabled = false;
    // 番号リストを出力
    for(i = 0; i < max; i++) {
      let value = '<li>' + numList[i] + '</li>';
      el01.insertAdjacentHTML(position, value);    // １からmaxまでのくじ番号リストを出力
    }
    // くじを作成
    for (i = max - 1; i >= 0; i--) {    // 配列内の整数をシャッフル
      let random = Math.floor(Math.random() * (i + 1));
      [numList[i], numList[random]] = [numList[random], numList[i]];
    }
    // スタートクリック
    function startBingo() {
      if (0 < numList.length) {
        stopBtn.disabled = false;
        startBtn.disabled = true;
        pingpong.pause();
        pingpong.currentTime = 0;
        dramroll.play();
        let status = true;    // ルーレットを起動
        roulette = setInterval(function() {
          let rouletteNum = Math.floor((Math.random() *max) + 1);    // maxまでのランダムな数を作成
          document.getElementById('roulette').innerHTML = rouletteNum;    // 表示
        }, 30);
      } else {
        ;
      }
    }
    startBtn.addEventListener('click', startBingo);
    // ストップクリック
    function stopBingo() {
      status = false;    // ルーレットを停止
      dramroll.pause();
      dramroll.currentTime = 0;
      pingpong.play();
      if (0 < numList.length) {
        stopBtn.disabled = true;
        startBtn.disabled = false;
        clearInterval(roulette);
        let current = numList.shift();    // 結果を取り出す
        document.getElementById('roulette').innerHTML = current;    // 結果をルーレット上に出力
        let value = '<li>' + current + '</li>';
        result.insertAdjacentHTML(position, value);    // 結果リストに当選番号を出力
        let hitNum = document.getElementById('numList').getElementsByTagName('li');    // くじ番号リストのli要素
        let hit = hitNum[current - 1];    // 当選番号と同じ番号のli要素
        hit.classList.add('hit');
        if(numList.length == 0) {
          startBtn.disabled = true;
        } else {
          ;
        }
      } else {
        ;
      }
    }
    stopBtn.addEventListener('click', stopBingo);
    // リセットクリック
    function resetBingo() {
      window.location.reload();
    }
    resetBtn.addEventListener('click', resetBingo);
  }
  setBtn.addEventListener('click', setBingo);
  // テキストボックスでエンターキーが押された場合にビンゴをセットする
  function keydown(e) {
    if(e.keyCode == 13) {
      document.getElementById('value').nextElementSibling.focus();
    }
  }
  document.getElementById('value').addEventListener('keydown', keydown);
}, false);