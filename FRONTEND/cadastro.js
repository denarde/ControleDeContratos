function cadastraConta() {
    id = document.getElementById('id')
    nome = document.getElementById('nome').value
    vencimento = document.getElementById('vencimento').value
    valor = document.getElementById('valor').value
    pago = document.getElementById('pago').checked

    vencimento = new Date(vencimento)

    conta = {}

    conta.id = id
    conta.nome = nome
    conta.dataPagamento ='00/00/0000'
    conta.dataCadastro = '00/00/0000'
    conta.dataVencimentoContrato = vencimento.toLocaleDateString()
    conta.isPago = (pago = true) ? 1 : 0
    conta.valorPago = valor


    axios.post('http://localhost:3000/v1/cadastrar', conta , {headers: {'Accept': 'application/json'}})
        .then(function (response) {
            console.log(response.status);
        })
        .catch(function (error) {
            console.log(error);
    });
    
    limpaForm()

}

function limpaForm(){
    document.getElementById('nome').value = null
    document.getElementById('vencimento').value= null
    document.getElementById('valor').value = null
    document.getElementById('pago').checked = false

}