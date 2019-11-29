export default class BoardEngine {
    field = [];
    rows = 0;
    cols = 0;
    mines = 0;
    minesPlaced = false;
    onLose;
    onWin;
    revealedCount = 0;
    revealedToWin = 0;
    markedCount = 0;
    gameOver = false;

    constructor (height, width, mines, onLose, onWin) {
        this.rows = height;
        this.cols = width;
        this.mines = mines;
        this.onLose = onLose;
        this.onWin = onWin; 
        this.revealedToWin = (height * width) - mines;

        for (let i = 0; i < this.rows; i++) {
            this.field.push([]);
            for (let j = 0; j < this.cols; j++) {
                this.field[i].push({
                    revealed: false,
                    mine: false,
                    adjacents: 0,
                    marked: false
                });
                
            }
        }
    }

    placeMines (positions) {
        for (let i = 0; i < this.mines; i++) {
            const position = positions.splice(Math.floor(Math.random() * positions.length), 1)[0];
            this.field[position.r][position.c].mine         = true;
            this.field[position.r][position.c].adjacents    = -1;
        }
    }

    adjacentIterToDisplacement (s) {
        switch (s) {
            case 0: return { r: 1, c: 0 }
            case 1: return { r: 1, c: 1 }
            case 2: return { r: 0, c: 1 }
            case 3: return { r:-1, c: 1 }
            case 4: return { r:-1, c: 0 }
            case 5: return { r:-1, c:-1 }
            case 6: return { r: 0, c:-1 }
            case 7: return { r: 1, c:-1 }
        }
    }

    calculateAdjacents () {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if(this.field[i][j].mine)
                    continue;

                let adjacentsCount = 0;
                for (let s = 0; s < 8; s++) {
                    const displacement = this.adjacentIterToDisplacement(s);
                    const rDelta = i + displacement.r;
                    const cDelta = j + displacement.c;

                    if (rDelta < 0 || rDelta >= this.rows || cDelta < 0 || cDelta >= this.cols)
                        continue;

                    if (this.field[rDelta][cDelta].mine)
                        ++adjacentsCount;
                }

                this.field[i][j].adjacents = adjacentsCount;
            }
        }
    }

    getBoard () {
        return this.field;
    }

    getMarked () {
        return this.markedCount;
    }

    reveal (row, col) {
        if (this.gameOver) return false;
        if (!this.minesPlaced) {
            const positions = [];

            for (let i = 0; i < this.rows; i++)
                for (let j = 0; j < this.cols; j++)
                    if (!(
                        ( i === row - 1 || i === row || i === row + 1 ) &&
                        ( j === col - 1 || j === col || j === col + 1 )
                    )) positions.push({ r: i, c: j });

            this.placeMines(positions);
            this.calculateAdjacents();

            this.minesPlaced = true;
        }

        const cell = this.field[row][col]; 
        if (cell.revealed || cell.marked) return false;

        if (cell.mine) {
            this.onLose();
            return false;
        }

        cell.revealed = true;
        this.revealedCount++;
        if (this.revealedCount === this.revealedToWin && this.markedCount === this.mines)
            this.onWin();
        
        if (this.field[row][col].adjacents === 0) {
            for (let s = 0; s < 8; s++) {
                const displacement = this.adjacentIterToDisplacement(s);
                const rDelta = row + displacement.r;
                const cDelta = col + displacement.c;

                if (rDelta < 0 || rDelta >= this.rows || cDelta < 0 || cDelta >= this.cols)
                    continue;

                this.reveal(rDelta, cDelta);
            }
        }
        
        return true;
    }

    mark (row, col) {
        if (this.gameOver || this.field[row][col].revealed) return false;

        this.field[row][col].marked = !this.field[row][col].marked;
        this.markedCount += this.field[row][col].marked ? 1 : -1;

        if (this.revealedCount === this.revealedToWin && this.markedCount === this.mines) {
            this.gameOver = true;
            this.onWin();
        }

        return true;
    }
};