function alterarConta() {
    

    nome = document.getElementById('nome').value
    vencimento = document.getElementById('vencimento').value
    valor = document.getElementById('valor').value
    pago = document.getElementById('pago').checked

    vencimento = new Date(vencimento)

    conta = {}

    const id = JSON.parse(localStorage.getItem('conta')).id

    conta.id = id
    conta.nome = nome
    conta.dataPagamento = '00/00/0000'
    conta.dataCadastro = '00/00/0000'
    conta.dataVencimentoContrato = vencimento.toLocaleDateString()
    conta.isPago = (pago == true) ? 1 : 0
    conta.valorPago = valor

    axios.post('http://localhost:3000/v1/alterar', conta, { headers: { 'Accept': 'application/json' } })
        .then(function (response) {
            console.log(response.status);
            limpaForm()
            window.location.href = "index.html";
        })
        .catch(function (error) {
            console.log(error);
        });



    

    botaoElement = document.getElementById('botaoAlterar') 
    botaoElement.setAttribute('disabled', '')

}

function carregarConta() {
    
    const conta = JSON.parse(localStorage.getItem('conta'))

    const data = formataData(conta.dataVencimentoContrato)
    console.log(data)
    document.getElementById('nome').value = conta.nome
    document.getElementById('vencimento').value = data
    document.getElementById('valor').value = conta.valorPago
    document.getElementById('pago').checked = (conta.isPago == 1) ? true : false

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}




function formataData(data) {
    console.log(typeof data)
    const dia = data.substring(0, 2)
    const mes = data.substring(3, 5)
    const ano = data.substring(6, 10)
    return ano + '-' + mes + '-' + dia
}

function limpaForm() {
    document.getElementById('nome').value = null
    document.getElementById('vencimento').value = null
    document.getElementById('valor').value = null
    document.getElementById('pago').checked = false
    

}



carregarConta()
