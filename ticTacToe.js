var newGame = new function () {
    var table = document.getElementById('table');
    var tds = document.getElementsByTagName('td');
    var arr = [];
    var player1 = true;
    var win1 = 0;
    var win2 = 0;
    var winner;
    var counter = 0;
    var winCount1 = document.getElementById('counter1');
    var winCount2 = document.getElementById('counter2');

    function clickHandler() {
        var target = event.target;
        var symbol = player1 ? 'X' : 'O';
        if (target.tagName === 'TD') {
            if (target.className === 'background') {
                return;
            }

            target.classList.add('background');

            var tdIndex = target.getAttribute('td');

            target.innerHTML = symbol;
            arr[tdIndex] = symbol;
            counter++;

            if (findWinner(symbol)) {
                setTimeout(showWinner(player1), 10000);
                // showWinner(player1);
            } else if(counter === 9) {
                alert("Ничья");
                counter = 0;
                clearCells(tds);
            }

        }
        player1 = !player1;

    }
    table.addEventListener('click', clickHandler);

    var winCombination = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    function findWinner(char) {
        return winCombination.some(item => item.every(index => arr[index] === char));
    }

    function clearCells(tds) {
        arr = [];
        [].forEach.call(tds, function (td) {
            td.innerHTML = '';
            td.classList.remove('background');
        });
    }

    function showWinner(winner) {
        var winText = winner ? 'Player1' : 'Player2';

        var winCount = winner ? document.getElementById('counter1') : document.getElementById('counter2');
        var win = winner ? win1++ : win2++;
        var count = winner ? winCount1 : winCount2;

        win++;
        count.innerHTML = win;
        player1 = winner;

        counter = 0;

        alert(winText);

        var result = confirm('Продолжаем игру? Иначе счёт обнулится!');

        if (!result) {
            win1 = 0;
            winCount1.innerHTML = win1;
            win2 = 0;
            winCount2.innerHTML = win2;
        }
        clearCells(tds);
    }
};