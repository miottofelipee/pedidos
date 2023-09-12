class Pedido {
    constructor(cliente, numero, desc){
        this.cliente = cliente;
        this.numero = numero;
        this.desc = desc;
        this.id = this.gerarId();
    }

    gerarId() {
        return Math.floor(Math.random() * 1000);
    }
}

class PedidoService {
    constructor(){
        this.pedidos = [];
    }

    adicionarPedido(parametro){
        if (verificacaoInputs()) {
            envieMsg("Preencha todas as informações", "erro");
        } else {
            this.pedidos.push(parametro);
            console.log(this.pedidos);
            envieMsg("Cadastrado com sucesso!", "sucesso");
        limparInputs();
    }
    }

    listarPedidos(){
        return this.pedidos
    }

    listarPedidosPorId(parametro) {
        return this.pedidos.find(pedido => pedido.id == parametro);
    }

    atualizarPedidos(id, nome, numero, desc) {
        const pedido = this.listarPedidosPorId(id);
        pedido.nome = nome;
        pedido.numero = numero;
        pedido.desc = desc;

        return pedido;
    }

    deletarPedido(parametro) {
        return (this.pedidos = this.pedidos.filter(
            (pedido) => pedido.id != parametro
        ))
    }
}

const pedidoService = new PedidoService();

function listarPedidos() {
    const pedidos = pedidoService.listarPedidos();
    console.log(pedidos);

    const elementoLista = document.getElementById("listarPedidos");
    elementoLista.innerHTML = '';
    let content = '';
    pedidos.forEach((pedido) => {
        content += `
        <div>
        <p> Id: ${pedido.id}</p>
        <p> Cliente: ${pedido.cliente}</p>
        <p> Numero: ${pedido.numero}</p>
        <p> Descrição do pedido: ${pedido.desc}</p>
        <button id="botaoEditar" onclick="atualizarPedidos(${pedido.id})">Editar</button>
        <button id="removerPedido" onclick="removerPedido(${pedido.id})">Excluir</button>
        </div>
        `
    }
    )
    elementoLista.innerHTML = content;
}

function criarPedido(){
    const cliente = document.getElementById('cliente').value;
    const numero = document.getElementById('numero').value;
    const desc = document.getElementById('desc').value;
    const novoPedido = new Pedido(cliente, numero, desc)
    pedidoService.adicionarPedido(novoPedido);
    listarPedidos();
}

function envieMsg(msg, tipo) {
    const msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = '';

    const msgParaTela = `
    <p class="${tipo}">${msg}</p>
    `
    msgDiv.innerHTML += msgParaTela;

    setTimeout(function () {
        msgDiv.innerHTML = "";
    }, 3500);
}

function verificacaoInputs() {
    let cliente = document.getElementById("cliente").value;
    let numero = document.getElementById("numero").value;
    let desc = document.getElementById("desc").value;

    if (cliente == '' || numero == '' || desc == '') {
        envieMsg("Coloque os dados certos 😡", "error");
        return true;
    } else {
        console.log("Pedido cadastrado!")
        return false;
    }
}

function  limparInputs(){
    document.getElementById('cliente').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('desc').value = '';
}

function removerPedido(id) {
    pedidoService.deletarPedido(id);

    listarPedidos();

    document.getElementById('listarPedidos').classList.add('hidden');
}

function atualizarPedidos(id) {
    const pedido = pedidoService.listarPedidosPorId(id);

    document.getElementById("cliente").value = pedido.cliente;
    document.getElementById("numero").value = pedido.numero;
    document.getElementById("desc").value = pedido.desc;
    

    document.getElementById("removerPedido").classList.add("hidden");
    document.getElementById("botaoEditar").classList.remove("hidden");
    aux = id;
}

function editarPedido() {
   const cliente = document.getElementById("cliente").value;
   const numero = document.getElementById("numero").value;
   const desc = document.getElementById("desc").value;

    pedidoService.atualizarPedidos(aux, cliente, numero, desc);

    listarPedidos();

    document.getElementById("removerPedido").classList.remove("hidden");
    document.getElementById("botaoEditar").classList.add("hidden");

    document.getElementById('listarPedidos').classList.add('hidden');
    aux = null;
}