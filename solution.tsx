/*

  const row0 = [board[0], board[1], board[2]]
    const row1 = [board[3], board[4], board[5]]
    const row2 = [board[6], board[7], board[8]]


        const column0 = [board[0], board[3], board[6]]
    const column1 = [board[1], board[4], board[7]]
    const column2 = [board[2], board[5], board[8]]


        const diag0 = [board[0], board[4], board[8]]
    const diag1 = [board[2], board[4], board[6]]


        const checkRow = (row: string[]) => {
        return (
            (row[0] === row[1] && row[1] === row[2] && row[0] != "" && row[1] != "" && row[2] != "") ? true : false)
    }

    const checkColumn = (column: string[]) => {
        return (
            (column[0] === column[1] && column[1] === column[2] && column[0] != "" && column[1] != "" && column[2] != "") ? true : false)
    }

    const checkDiag = (diag: string[]) => {
        return (
            (diag[0] === diag[1] && diag[1] === diag[2] && diag[0] != "" && diag[1] != "") ? true : false)
    }