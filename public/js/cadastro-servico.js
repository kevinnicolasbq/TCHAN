const socket = io('http://localhost:2000')

socket.on('feedback', data => {
    let text = data[0]
    let ok = data[1]
    alert(text)
    console.log('feedbakc ' + text)
    if(ok){
        //voltar();
        document.getElementById('voltar').click()
    }
})


function cadastrarServico(){
    let data = []
    let erros = []
    let fun = [af, validaNome, validaDescricao, validaDuracao, validaValor]
    console.log(serviceForm)
    serviceForm.forEach((el, i) => {
        if (i) {
            if (fun[i](document.getElementById(el).value) != "Sucesso") {
                erros.push(fun[i](document.getElementById(el).value))
            }
            let texto = document.getElementById(el).value
            if(i == 3){texto = formataValor(texto)}
            data.push(texto)
        }
    })

    if (!erros.length) {
        let resultado = window.prompt("Digite a sua senha");
        data.push(resultado)
        socket.emit('newService', data)
    } else {
        let msg = ''
        erros.forEach(e => {
            msg = msg + '\n' + e
        })

        alert(msg)
    }
}


function cadastrarCliente() {
    //const clientForm = ['id', 'nome', 'rua', 'cep', 'cidade', 'estado', 'telefone', 'celular', 'rg', 'cpf']
    let data = []
    let erros = []
    let fun = [af, validaNome, validaCPF, validaTelefone, validaEmail]
    clientForm.forEach((el, i) => {
        console.log('el ' + el)
        //if(el == '')
        if (i) {
            if (fun[i](document.getElementById(el).value) != "Sucesso") {
                erros.push(fun[i](document.getElementById(el).value))
            }
            let texto = document.getElementById(el).value
            if(i == 2){texto = formataCPF(texto)}
            data.push(texto)
        }
    })
    if (!erros.length) {
        let resultado = window.prompt("Digite a sua senha");
        data.push(resultado)
        socket.emit('newClient', data)
    } else {
        let msg = ''
        erros.forEach(e => {
            msg = msg + '\n' + e
        })

        alert(msg)
    }
}