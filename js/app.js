drawBoard();

var puzzle = [];

var puzzleReversed = [];

var difficultyThreshold = 0.4;

$('input[name="difficulty"]').change(function() {
    _val = $(this).val();
    
    if (_val == 'easy') {
        difficultyThreshold = 0.3;
    } else if (_val == 'normal') {
        difficultyThreshold = 0.4;
    } else if (_val == 'hard') {
        difficultyThreshold = 0.5;
    }
});



$('#new').click(function() {
    generatePuzzle();
    
    drawTopNums();
    drawLeftNums();
    
    $('div.square').removeClass('no')
    .removeClass('maybe')
    .removeClass('yes')
    .removeClass('on')
    .removeClass('off')
    .removeClass('on-hidden')
    .removeClass('off-hidden');
    
    for (_x = 0; _x < 10; _x++) {
        for (_y = 0; _y < 10; _y++) {
            if (puzzle[_x][_y]) {
                $('#' + _x + '_' + _y + '_square').addClass('on-hidden');
            } else {
                $('#' + _x + '_' + _y + '_square').addClass('off-hidden');
            }
            getColNums(_y);
        }
                
        getRowNums(_x);
    }
    
    return false;
});

$('#solution').click(function() {
    $('div.square').each(function() {
        _this = $(this);
        if (_this.hasClass('on-hidden')) {
            _this.addClass('on').removeClass('on-hidden');
        } else if (_this.hasClass('off-hidden')) {
            _this.addClass('off').removeClass('off-hidden');
        } else if (_this.hasClass('on')) {
            _this.addClass('on-hidden').removeClass('on');
        } else if (_this.hasClass('off')) {
            _this.addClass('off-hidden').removeClass('off');
        }
    });
    
    return false;
});

$('#debug').click(function() {
    generatePuzzle();
    
    drawTopNums();
    drawLeftNums();
    
    $('div.square').removeClass('no')
    .removeClass('maybe')
    .removeClass('yes')
    .removeClass('on')
    .removeClass('off')
    .removeClass('on-hidden')
    .removeClass('off-hidden');
    
    for (_x = 0; _x < 10; _x++) {
        for (_y = 0; _y < 10; _y++) {
            if (puzzle[_x][_y]) {
                $('#' + _x + '_' + _y + '_square').addClass('yes');
            }
            getColNums(_y);
        }
                
        getRowNums(_x);
    }
    
    return false;
});

$('div.square').click(function() {
    _this = $(this);
    if (_this.hasClass('yes')) {
        _this.addClass('no').removeClass('yes');
    } else if (_this.hasClass('no')) {
        _this.addClass('maybe').removeClass('no');
    } else if (_this.hasClass('maybe')) {
        _this.removeClass('maybe');
    } else {
        _this.addClass('yes');
    }
});


function getRowNums(_x) {
    _cells = puzzle[_x];
    
    _html = '';
    count = 0;
    for (i = 0; i < 11; i++) {
        if (_cells[i] == 1) {
            count++;
        } else {
            if (count != 0) {
                _html += ' ' + count;
            }
            
            count = 0;
        }
    }
    
    $('#row' + _x).html(_html);
}

function getColNums(_y) {
    _cells = puzzleReversed[_y];
    
    _html = '';
    count = 0;
    for (i = 0; i < 11; i++) {
        if (_cells[i] == 1) {
            count++;
        } else {
            if (count != 0) {
                _html += count + '<br />';
            }
            
            count = 0;
        }
    }
    
    $('#col' + _y).html(_html);
}

function getRandomNum() {
    return Math.random() >= difficultyThreshold ? 1 : 0;
}

function generatePuzzle() {
    for (x = 0; x < 10; x++) {
        puzzle[x] = [];
        
        for (y = 0; y < 10; y++) {
            puzzle[x][y] = getRandomNum();
        }
    }
    
    for (x = 0; x < 10; x++) {
        puzzleReversed[x] = [];

        for (y = 0; y < 10; y++) {
            puzzleReversed[x][y] = puzzle[y][x];
        }
    }
}

function drawTopNums() {
    _html = '';
    for(i = 9; i > -1; i--) {
        _html += '<div id="col' + i + '" class="col"></div>';
    }
    
    $('#top_nums').append(_html);
}


function drawLeftNums() {
    _html = '';
    
    for(i = 0; i < 10; i++) {
        _html += '<div id="row' + i + '" class="row"></div>';
    }
    
    $('#left_nums').append(_html);
}

function drawBoard() {
    _html = '';
    for (x = 0; x < 10; x++) {
        for (y = 0; y < 10; y++) {
            _html += '<div id="' + x + '_' + y + '_square" class="square"></div>';
        }
    }
    
    $('#board').append(_html);
}