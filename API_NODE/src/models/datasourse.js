const retornaDataBase = () => {
    const Sqlite3 = require('sqlite3').verbose();

    const db = new Sqlite3.Database('../src/constasDatabase.db')

    const create = `
    CREATE TABLE if not exists contas (
        id                      INTEGER      PRIMARY KEY AUTOINCREMENT,
        nome                    VARCHAR (60),
        dataPagamento           DATE,
        dataCadastro            DATE,
        dataVencimentoContrato  DATE,
        isPago                  INT,
        valorPago               DOUBLE
    );
    CREATE TABLE if not exists dual (
        [column] NUMERIC
    );
    `
    db.serialize( function() {
    db.run(create)
    })

    return db
}


module.exports = retornaDataBase
