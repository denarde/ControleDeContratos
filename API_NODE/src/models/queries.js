const queriesSql = {
    sqlResumo: `
            SELECT (SELECT Count(1) 
            FROM   contas 
            WHERE  datacadastro = ? 
                AND ? <= datavencimentocontrato)           AS qtdContas, 
        Ifnull((SELECT Sum(valorpago) 
                FROM   contas 
                WHERE  datacadastro = ? 
                        AND ? <= datavencimentocontrato), 0)AS valorTotal, 
        Ifnull((SELECT Sum(valorpago) 
                FROM   contas 
                WHERE  datacadastro = ? 
                        AND ? <= datavencimentocontrato 
                        AND ispago = 1), 0)                            AS valorPagoTotal, 
        (SELECT Count(1) 
            FROM   contas 
            WHERE  datacadastro = ? 
                AND ? <= datavencimentocontrato 
                AND ispago = 1)                                       AS qtdPago, 
        (SELECT Count(1) 
            FROM   contas 
            WHERE  datacadastro = ? 
                AND ? <= datavencimentocontrato 
                AND ispago = 0)                                       AS qtdReceber 
        FROM   dual 
    `,
    sqlPesquisar: `
        SELECT * 
        FROM   contas 
        WHERE  datacadastro = ? 
            AND ? <= datavencimentocontrato 
    `,
    sqlCadastrar: `
        INSERT INTO contas 
            (nome, 
            datapagamento, 
            datacadastro, 
            datavencimentocontrato, 
            ispago, 
            valorpago) 
        VALUES      (?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?) 
    `,
    sqlAlterar: `
        UPDATE contas 
        SET nome = ?, 
            valorpago = ?, 
            datavencimentocontrato = ?, 
            ispago = ? 
        WHERE  id = ? 
    `,
    sqlExcluir: `
        DELETE FROM contas WHERE id = ?
    `       
    ,
    sqlPago: `
        UPDATE contas 
        SET    ispago = ? 
        WHERE  id = ?
    `



}

module.exports = queriesSql