function buscaContas() {
    axios.get('http://localhost:3000/v1', {})
        .then(response => {
            const json = JSON.parse(response.data)
            preencherContas(json)
        })
        .catch(error => {
            console.log(error)
        })



}

function preencherContas(contas) {
    console.log("teste :", contas)
    const tbodyElemnt = document.getElementById("tbodyContas")

    constasGlobal = contas
    while (tbodyElemnt.firstChild) {
        tbodyElemnt.removeChild(tbodyElemnt.firstChild)
    }
    for (conta of contas) {
        let trElement = document.createElement('tr')
        let tdElement = document.createElement('td')
        let tdText = document.createTextNode(conta.nome)

        //nome
        tdElement.appendChild(tdText)
        trElement.appendChild(tdElement)
        tbodyElemnt.appendChild(trElement)

        //valor
        tdText = document.createTextNode("R$" + conta.valorPago)
        tdElement = document.createElement('td')
        tdElement.appendChild(tdText)
        trElement.appendChild(tdElement)
        tbodyElemnt.appendChild(trElement)

        //vencimentoContrato
        tdText = document.createTextNode(conta.dataVencimentoContrato)
        tdElement = document.createElement('td')
        tdElement.appendChild(tdText)
        trElement.appendChild(tdElement)
        tbodyElemnt.appendChild(trElement)

        //pago
        tdElement = document.createElement('td')
        inputElement = document.createElement('input')
        inputElement.setAttribute('type', 'checkbox')
        inputElement.checked = (conta.isPago == 1) ? true : false
        tdElement.appendChild(inputElement)
        trElement.appendChild(tdElement)
        tbodyElemnt.appendChild(trElement)

        //alterar
        let linkElement = document.createElement('a')
        let linkText = document.createTextNode('Alterar')
        linkElement.appendChild(linkText)
        linkElement.setAttribute('href', '#')
        linkElement.setAttribute('onclick', 'selecionaContaAlterar('+ conta.id +')');
        tdElement = document.createElement('td')
        tdElement.appendChild(linkElement)
        trElement.appendChild(tdElement)
        tbodyElemnt.appendChild(trElement)

        //Excluir
        linkElement = document.createElement('a')
        linkText = document.createTextNode('Excluir')
        linkElement.appendChild(linkText)
        linkElement.setAttribute('href', '#')
        linkElement.setAttribute('onclick', 'excluirPorId('+ conta.id +')');
        tdElement = document.createElement('td')
        tdElement.appendChild(linkElement)
        trElement.appendChild(tdElement)
        tbodyElemnt.appendChild(trElement)

    }

}



function buscaResumo() {


    axios.get('http://localhost:3000/v1/resumo', {})
    .then(response => {
        const json = JSON.parse(response.data)
        preencherResumo(json)
    })
    .catch(error => {
        console.log(error)
    })

}

function preencherResumo(resumo) {
    console.log("Resumo :", resumo)
    console.log("qtdContas :", resumo[0].qtdContas)
    console.log("valorTotal :", resumo[0].valorTotal)

    const tbodyElemnt = document.getElementById("tbodyResumo")
    while (tbodyElemnt.firstChild) {
        tbodyElemnt.removeChild(tbodyElemnt.firstChild)
    }
    let trElement = document.createElement('tr')
    let tdElement = document.createElement('td')
    let tdText

    //qtdContas
    tdText = document.createTextNode(resumo[0].qtdContas)
    tdElement.appendChild(tdText)
    trElement.appendChild(tdElement)
    tbodyElemnt.appendChild(trElement)

    //valorTotal
    tdElement = document.createElement('td')
    tdText = document.createTextNode('R$' + resumo[0].valorTotal)
    tdElement.appendChild(tdText)
    trElement.appendChild(tdElement)
    tbodyElemnt.appendChild(trElement)

    //valorPagoTotal
    tdElement = document.createElement('td')
    tdText = document.createTextNode('R$' + resumo[0].valorPagoTotal)
    tdElement.appendChild(tdText)
    trElement.appendChild(tdElement)
    tbodyElemnt.appendChild(trElement)

    //qtdPago
    tdElement = document.createElement('td')
    tdText = document.createTextNode(resumo[0].qtdPago)
    tdElement.appendChild(tdText)
    trElement.appendChild(tdElement)
    tbodyElemnt.appendChild(trElement)

    //qtdReceber
    tdElement = document.createElement('td')
    tdText = document.createTextNode(resumo[0].qtdReceber)
    tdElement.appendChild(tdText)
    trElement.appendChild(tdElement)
    tbodyElemnt.appendChild(trElement)

}

function excluirPorId(id) {
    const excluir = {}
    excluir.id = id
    axios.post('http://localhost:3000/v1/excluir', excluir, { headers: { 'Accept': 'application/json' } })
        .then(function (response) {
            console.log(response.status)
            buscaResumo()
            buscaContas()
        })
        .catch(function (error) {
            console.log(error)
        })

    

}

buscaContas()
buscaResumo()

function selecionaContaAlterar(id){
    const contas = window.constasGlobal
    let conta = contas.find(conta => conta.id === id);
    console.log(conta.id)
    localStorage.setItem('conta' , JSON.stringify(conta))

    window.location.href = "alterar.html";


}