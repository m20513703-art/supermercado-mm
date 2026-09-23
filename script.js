"use strict";


/* =====================================================
   CONFIGURAÇÕES
===================================================== */

const WHATSAPP = "5519981123401";

const CHAVE_USUARIO = "mercadoMM_usuario";
const CHAVE_LOGIN = "mercadoMM_login";
const CHAVE_CARRINHO = "mercadoMM_carrinho";
const CHAVE_LISTA = "mercadoMM_lista";
const CHAVE_HISTORICO = "mercadoMM_historico";


/* =====================================================
   PRODUTOS
===================================================== */

const produtos = [

    {
        id: 1,
        nome: "Contra-filé",
        preco: 28.90,
        unidade: "kg",
        imagem: "img/contra-file.jpg"
    },

    {
        id: 2,
        nome: "Coca-Cola 2 litros",
        preco: 8.99,
        unidade: "",
        imagem: "img/coca-cola-2l.jpg"
    },

    {
        id: 3,
        nome: "Arroz Kome Tudo 5 kg",
        preco: 15.90,
        unidade: "",
        imagem: "img/arroz-kome-tudo-5kg.jpg"
    },

    {
        id: 4,
        nome: "Sabão em Pó OMO 800 g",
        preco: 12.90,
        unidade: "",
        imagem: "img/omo-800g.jpg"
    }

];


/* =====================================================
   FUNÇÕES BÁSICAS
===================================================== */

function dinheiro(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


function salvar(chave, valor) {

    localStorage.setItem(
        chave,
        JSON.stringify(valor)
    );

}


function carregar(chave, padrao) {

    try {

        const valor =
            localStorage.getItem(chave);

        if (!valor) {

            return padrao;

        }

        return JSON.parse(valor);

    } catch {

        return padrao;

    }

}


function gerarId() {

    return Date.now() +
        "-" +
        Math.floor(Math.random() * 9999);

}


function escapar(texto) {

    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   LOGIN
===================================================== */

function mostrarCadastro() {

    document
        .getElementById("loginArea")
        .classList.add("oculto");

    document
        .getElementById("cadastroArea")
        .classList.remove("oculto");

}


function mostrarLogin() {

    document
        .getElementById("cadastroArea")
        .classList.add("oculto");

    document
        .getElementById("loginArea")
        .classList.remove("oculto");

}


function cadastrar() {

    const nome =
        document
            .getElementById("cadastroNome")
            .value
            .trim();

    const senha =
        document
            .getElementById("cadastroSenha")
            .value;

    const senha2 =
        document
            .getElementById("cadastroSenha2")
            .value;

    const erro =
        document
            .getElementById("erroCadastro");

    erro.textContent = "";


    if (nome.length < 2) {

        erro.textContent =
            "Digite seu nome.";

        return;

    }


    if (senha.length < 4) {

        erro.textContent =
            "A senha precisa ter pelo menos 4 caracteres.";

        return;

    }


    if (senha !== senha2) {

        erro.textContent =
            "As senhas não são iguais.";

        return;

    }


    const usuarioExistente =
        carregar(
            CHAVE_USUARIO,
            null
        );


    if (usuarioExistente) {

        erro.textContent =
            "Já existe uma conta neste aparelho.";

        return;

    }


    const usuario = {

        id: gerarId(),

        nome: nome,

        senha: senha,

        criadoEm:
            new Date().toISOString()

    };


    salvar(
        CHAVE_USUARIO,
        usuario
    );


    localStorage.setItem(
        CHAVE_LOGIN,
        "true"
    );


    entrarNoSistema();

    mostrarPagina("inicio");

}


/* =====================================================
   ENTRAR
===================================================== */

function entrar() {

    const nome =
        document
            .getElementById("loginNome")
            .value
            .trim();

    const senha =
        document
            .getElementById("loginSenha")
            .value;

    const erro =
        document
            .getElementById("erroLogin");


    erro.textContent = "";


    const usuario =
        carregar(
            CHAVE_USUARIO,
            null
        );


    if (!usuario) {

        erro.textContent =
            "Nenhuma conta encontrada.";

        return;

    }


    if (
        nome.toLowerCase() !==
        usuario.nome.toLowerCase()
        ||
        senha !== usuario.senha
    ) {

        erro.textContent =
            "Nome ou senha incorretos.";

        return;

    }


    localStorage.setItem(
        CHAVE_LOGIN,
        "true"
    );


    entrarNoSistema();

    mostrarPagina("inicio");

}


function entrarNoSistema() {

    document
        .getElementById("telaLogin")
        .classList.add("oculto");

    document
        .getElementById("sistema")
        .classList.remove("oculto");

}


function sair() {

    localStorage.removeItem(
        CHAVE_LOGIN
    );

    document
        .getElementById("sistema")
        .classList.add("oculto");

    document
        .getElementById("telaLogin")
        .classList.remove("oculto");

    mostrarLogin();

}


/* =====================================================
   NAVEGAÇÃO
===================================================== */

function mostrarPagina(id) {

    document
        .querySelectorAll(".pagina")
        .forEach(
            pagina =>
                pagina.classList.remove("ativa")
        );


    const pagina =
        document.getElementById(id);


    if (!pagina) {

        return;

    }


    pagina.classList.add("ativa");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   PRODUTOS
===================================================== */

function mostrarProdutos() {

    const html =
        produtos
            .map(produto => {

                return `

                    <article class="produto">

                        <img
                            src="${escapar(produto.imagem)}"
                            alt="${escapar(produto.nome)}"
                            onerror="
                                this.onerror=null;
                                this.src='img/mercado-mm.jpg';
                            "
                        >

                        <div class="produto-conteudo">

                            <h3>
                                ${escapar(produto.nome)}
                            </h3>

                            <div class="preco">
                                ${dinheiro(produto.preco)}
                            </div>

                            ${
                                produto.unidade
                                    ?
                                    `<div class="unidade">
                                        por ${escapar(produto.unidade)}
                                    </div>`
                                    :
                                    ""
                            }

                            <button
                                class="comprar"
                                onclick="comprarAgora(${produto.id})"
                            >
                                Comprar agora
                            </button>

                            <button
                                class="adicionar"
                                onclick="adicionarCarrinho(${produto.id})"
                            >
                                + Adicionar ao carrinho
                            </button>

                        </div>

                    </article>

                `;

            })
            .join("");


    document
        .getElementById("produtos")
        .innerHTML = html;


    document
        .getElementById("produtosInicio")
        .innerHTML = html;

}


/* =====================================================
   CARRINHO
===================================================== */

function pegarCarrinho() {

    return carregar(
        CHAVE_CARRINHO,
        []
    );

}


function salvarCarrinho(carrinho) {

    salvar(
        CHAVE_CARRINHO,
        carrinho
    );

}


function adicionarCarrinho(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    if (!produto) {

        return;

    }


    const carrinho =
        pegarCarrinho();


    const existente =
        carrinho.find(
            item => item.id === id
        );


    if (existente) {

        existente.quantidade++;

    } else {

        carrinho.push({

            id: produto.id,

            nome: produto.nome,

            preco: produto.preco,

            unidade: produto.unidade,

            quantidade: 1

        });

    }


    salvarCarrinho(carrinho);

    atualizarCarrinho();


    alert(
        produto.nome +
        " foi adicionado ao carrinho."
    );

}


function comprarAgora(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    if (!produto) {

        return;

    }


    /*
       IMPORTANTE:

       Comprar agora NÃO abre o carrinho.

       Ele coloca somente aquele produto
       no carrinho temporariamente e vai
       direto para o checkout.
    */

    salvarCarrinho([

        {

            id: produto.id,

            nome: produto.nome,

            preco: produto.preco,

            unidade: produto.unidade,

            quantidade: 1

        }

    ]);


    atualizarCarrinho();

    abrirCheckout();

}


function totalCarrinho() {

    return pegarCarrinho()
        .reduce(
            (total, item) =>
                total +
                (
                    item.preco *
                    item.quantidade
                ),
            0
        );

}


function atualizarCarrinho() {

    const carrinho =
        pegarCarrinho();


    const quantidade =
        carrinho.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );


    document
        .getElementById("contadorCarrinho")
        .textContent = quantidade;


    const container =
        document.getElementById(
            "carrinhoItens"
        );


    if (carrinho.length === 0) {

        container.innerHTML = `

            <div class="card">

                <h3>
                    Seu carrinho está vazio.
                </h3>

                <p>
                    Escolha uma oferta para começar.
                </p>

            </div>

        `;

    } else {

        container.innerHTML =

            carrinho
                .map(item => {

                    return `

                        <div class="item-carrinho">

                            <div>

                                <strong>
                                    ${escapar(item.nome)}
                                </strong>

                                <br>

                                <small>
                                    ${dinheiro(item.preco)}
                                </small>

                                <div class="quantidade">

                                    <button
                                        onclick="alterarQuantidade(
                                            ${item.id},
                                            -1
                                        )"
                                    >
                                        −
                                    </button>

                                    <strong>
                                        ${item.quantidade}
                                    </strong>

                                    <button
                                        onclick="alterarQuantidade(
                                            ${item.id},
                                            1
                                        )"
                                    >
                                        +
                                    </button>

                                </div>

                                <button
                                    class="remover"
                                    onclick="removerCarrinho(
                                        ${item.id}
                                    )"
                                >
                                    Remover
                                </button>

                            </div>

                            <strong>
                                ${
                                    dinheiro(
                                        item.preco *
                                        item.quantidade
                                    )
                                }
                            </strong>

                        </div>

                    `;

                })
                .join("");

    }


    document
        .getElementById("totalCarrinho")
        .textContent =
            dinheiro(totalCarrinho());

}


function alterarQuantidade(id, valor) {

    const carrinho =
        pegarCarrinho();


    const item =
        carrinho.find(
            produto => produto.id === id
        );


    if (!item) {

        return;

    }


    item.quantidade += valor;


    if (item.quantidade <= 0) {

        salvarCarrinho(

            carrinho.filter(
                produto =>
                    produto.id !== id
            )

        );

    } else {

        salvarCarrinho(carrinho);

    }


    atualizarCarrinho();

}


function removerCarrinho(id) {

    const carrinho =
        pegarCarrinho()
            .filter(
                item =>
                    item.id !== id
            );


    salvarCarrinho(carrinho);

    atualizarCarrinho();

}


function abrirCarrinho() {

    atualizarCarrinho();

    abrirModal(
        "modalCarrinho"
    );

}


/* =====================================================
   MODAIS
===================================================== */

function abrirModal(id) {

    document
        .getElementById(id)
        .classList.remove("oculto");

}


function fecharModal(id) {

    document
        .getElementById(id)
        .classList.add("oculto");

}


/* =====================================================
   CHECKOUT
===================================================== */

function abrirCheckout() {

    const carrinho =
        pegarCarrinho();


    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    atualizarResumo();

    fecharModal(
        "modalCarrinho"
    );

    abrirModal(
        "modalCheckout"
    );


    alterarEntrega();

    alterarPagamento();

}


function atualizarResumo() {

    const carrinho =
        pegarCarrinho();


    let html =
        "<strong>Produtos:</strong><br><br>";


    carrinho.forEach(item => {

        html +=
            item.quantidade +
            "x " +
            escapar(item.nome) +
            " — " +
            dinheiro(
                item.preco *
                item.quantidade
            ) +
            "<br>";

    });


    html +=
        "<br><strong>Total: " +
        dinheiro(totalCarrinho()) +
        "</strong>";


    document
        .getElementById(
            "resumoPedido"
        )
        .innerHTML = html;

}


function alterarEntrega() {

    const tipo =
        document
            .getElementById(
                "tipoEntrega"
            )
            .value;


    const area =
        document
            .getElementById(
                "enderecoArea"
            );


    if (tipo === "entrega") {

        area.classList.remove(
            "oculto"
        );

    } else {

        area.classList.add(
            "oculto"
        );

    }

}


function alterarPagamento() {

    const pagamento =
        document
            .getElementById(
                "pagamento"
            )
            .value;


    const area =
        document
            .getElementById(
                "trocoArea"
            );


    if (pagamento === "dinheiro") {

        area.classList.remove(
            "oculto"
        );

    } else {

        area.classList.add(
            "oculto"
        );

        document
            .getElementById(
                "trocoPara"
            )
            .value = "";

        document
            .getElementById(
                "resultadoTroco"
            )
            .textContent = "";

    }

}


function calcularTroco() {

    const valor =
        Number(
            document
                .getElementById(
                    "trocoPara"
                )
                .value
        );


    const total =
        totalCarrinho();


    const resultado =
        document
            .getElementById(
                "resultadoTroco"
            );


    if (!valor) {

        resultado.textContent = "";

        return;

    }


    if (valor < total) {

        resultado.textContent =
            "O valor informado é menor que o total.";

        resultado.style.color =
            "#d62828";

        return;

    }


    resultado.textContent =
        "Troco: " +
        dinheiro(
            valor - total
        );

    resultado.style.color =
        "#19a857";

}


/* =====================================================
   FINALIZAR PEDIDO
===================================================== */

function finalizarPedido() {

    const carrinho =
        pegarCarrinho();


    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    const usuario =
        carregar(
            CHAVE_USUARIO,
            null
        );


    const tipo =
        document
            .getElementById(
                "tipoEntrega"
            )
            .value;


    const pagamento =
        document
            .getElementById(
                "pagamento"
            )
            .value;


    let endereco = null;


    /* ENTREGA */

    if (tipo === "entrega") {

        const rua =
            document
                .getElementById("rua")
                .value
                .trim();

        const numero =
            document
                .getElementById("numero")
                .value
                .trim();

        const bairro =
            document
                .getElementById("bairro")
                .value
                .trim();

        const referencia =
            document
                .getElementById("referencia")
                .value
                .trim();


        if (
            !rua ||
            !numero ||
            !bairro
        ) {

            alert(
                "Preencha Rua, Número e Bairro."
            );

            return;

        }


        endereco = {

            rua,

            numero,

            bairro,

            referencia

        };

    }


    /* DINHEIRO */

    let trocoPara = null;

    let troco = null;


    if (
        pagamento === "dinheiro"
    ) {

        trocoPara =
            Number(
                document
                    .getElementById(
                        "trocoPara"
                    )
                    .value
            );


        if (
            !trocoPara ||
            trocoPara < totalCarrinho()
        ) {

            alert(
                "Informe um valor suficiente para o troco."
            );

            return;

        }


        troco =
            trocoPara -
            totalCarrinho();

    }


    /* PEDIDO */

    const pedido = {

        id: gerarId(),

        data:
            new Date().toISOString(),

        cliente:
            usuario
                ? usuario.nome
                : "Cliente",

        itens:
            carrinho.map(
                item => ({
                    ...item
                })
            ),

        total:
            totalCarrinho(),

        tipoEntrega:
            tipo,

        endereco:
            endereco,

        pagamento:
            pagamento,

        trocoPara:
            trocoPara,

        troco:
            troco

    };


    /* HISTÓRICO */

    const historico =
        carregar(
            CHAVE_HISTORICO,
            []
        );


    historico.unshift(
        pedido
    );


    salvar(
        CHAVE_HISTORICO,
        historico
    );


    /* WHATSAPP */

    const mensagem =
        montarMensagem(
            pedido
        );


    /*
       Limpamos o carrinho depois
       de montar o pedido.
    */

    salvarCarrinho([]);

    atualizarCarrinho();


    fecharModal(
        "modalCheckout"
    );


    /*
       Abre o WhatsApp.
    */

    const url =
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        encodeURIComponent(
            mensagem
        );


    window.open(
        url,
        "_blank"
    );


    /*
       Mostra a mensagem de
       agradecimento no próprio site.
    */

    setTimeout(
        () => {

            abrirModal(
                "modalSucesso"
            );

        },
        500
    );


    mostrarHistorico();

}


/* =====================================================
   MENSAGEM WHATSAPP
===================================================== */

function montarMensagem(pedido) {

    let mensagem =
        "*NOVO PEDIDO - MERCADO MM*\n\n";


    mensagem +=
        "*Cliente:* " +
        pedido.cliente +
        "\n\n";


    mensagem +=
        "*PRODUTOS:*\n";


    pedido.itens.forEach(
        item => {

            mensagem +=
                "• " +
                item.quantidade +
                "x " +
                item.nome +
                " — " +
                dinheiro(
                    item.preco *
                    item.quantidade
                ) +
                "\n";

        }
    );


    mensagem +=
        "\n*TOTAL:* " +
        dinheiro(
            pedido.total
        ) +
        "\n\n";


    /* ENTREGA */

    if (
        pedido.tipoEntrega ===
        "entrega"
    ) {

        mensagem +=
            "*RECEBIMENTO:* Entrega\n\n";

        mensagem +=
            "*ENDEREÇO:*\n";

        mensagem +=
            "Rua: " +
            pedido.endereco.rua +
            "\n";

        mensagem +=
            "Número: " +
            pedido.endereco.numero +
            "\n";

        mensagem +=
            "Bairro: " +
            pedido.endereco.bairro +
            "\n";


        if (
            pedido.endereco.referencia
        ) {

            mensagem +=
                "Referência: " +
                pedido.endereco.referencia +
                "\n";

        }


        mensagem += "\n";

    } else {

        mensagem +=
            "*RECEBIMENTO:* Retirada no Mercado MM\n\n";

    }


    /* PAGAMENTO */

    const formas = {

        pix: "Pix",

        credito: "Crédito",

        debito: "Débito",

        dinheiro: "Dinheiro"

    };


    mensagem +=
        "*PAGAMENTO:* " +
        formas[pedido.pagamento] +
        "\n";


    if (
        pedido.pagamento ===
        "dinheiro"
    ) {

        mensagem +=
            "Troco para: " +
            dinheiro(
                pedido.trocoPara
            ) +
            "\n";

        mensagem +=
            "Troco: " +
            dinheiro(
                pedido.troco
            ) +
            "\n";

    }


    mensagem +=
        "\n*PEDIDO:* " +
        pedido.id;


    mensagem +=
        "\n\nObrigado por comprar no Mercado MM!";


    return mensagem;

}


/* =====================================================
   HISTÓRICO
===================================================== */

function mostrarHistorico() {

    const historico =
        carregar(
            CHAVE_HISTORICO,
            []
        );


    const container =
        document.getElementById(
            "historicoLista"
        );


    if (
        historico.length === 0
    ) {

        container.innerHTML = `

            <div class="card centralizado">

                <h3>
                    Nenhum pedido ainda.
                </h3>

                <p>
                    Seus pedidos aparecerão aqui.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =

        historico
            .map(pedido => {

                const data =
                    new Date(
                        pedido.data
                    ).toLocaleString(
                        "pt-BR"
                    );


                return `

                    <div class="historico-card">

                        <h3>
                            Pedido ${escapar(pedido.id)}
                        </h3>

                        <small>
                            ${data}
                        </small>

                        <ul>

                            ${
                                pedido.itens
                                    .map(item => `

                                        <li>

                                            ${item.quantidade}x
                                            ${escapar(item.nome)}
                                            —
                                            ${dinheiro(
                                                item.preco *
                                                item.quantidade
                                            )}

                                        </li>

                                    `)
                                    .join("")
                            }

                        </ul>

                        <strong>
                            Total:
                            ${dinheiro(pedido.total)}
                        </strong>

                        <p>

                            ${
                                pedido.tipoEntrega ===
                                "entrega"
                                    ?
                                    "🚚 Entrega"
                                    :
                                    "🏪 Retirada"
                            }

                        </p>

                    </div>

                `;

            })
            .join("");

}


/* =====================================================
   LISTA DE COMPRAS
===================================================== */

function pegarLista() {

    return carregar(
        CHAVE_LISTA,
        []
    );

}


function adicionarLista() {

    const produto =
        document
            .getElementById(
                "listaProduto"
            )
            .value
            .trim();


    const marca =
        document
            .getElementById(
                "listaMarca"
            )
            .value
            .trim();


    const quantidade =
        document
            .getElementById(
                "listaQuantidade"
            )
            .value
            .trim();


    const obs =
        document
            .getElementById(
                "listaObs"
            )
            .value
            .trim();


    if (!produto) {

        alert(
            "Digite o produto."
        );

        return;

    }


    const lista =
        pegarLista();


    lista.push({

        id: gerarId(),

        produto,

        marca,

        quantidade:
            quantidade || "1",

        obs

    });


    salvar(
        CHAVE_LISTA,
        lista
    );


    document
        .getElementById(
            "listaProduto"
        )
        .value = "";

    document
        .getElementById(
            "listaMarca"
        )
        .value = "";

    document
        .getElementById(
            "listaQuantidade"
        )
        .value = "";

    document
        .getElementById(
            "listaObs"
        )
        .value = "";


    mostrarLista();

}


function mostrarLista() {

    const lista =
        pegarLista();


    const container =
        document.getElementById(
            "listaItens"
        );


    if (
        lista.length === 0
    ) {

        container.innerHTML =
            "<p>Nenhum item na lista.</p>";

        return;

    }


    container.innerHTML =

        lista
            .map(item => `

                <div class="lista-item">

                    <div>

                        <strong>
                            ${item.quantidade}x
                            ${escapar(item.produto)}
                        </strong>

                        ${
                            item.marca
                                ?
                                `<br>Marca:
                                ${escapar(item.marca)}`
                                :
                                ""
                        }

                        ${
                            item.obs
                                ?
                                `<br>Obs.:
                                ${escapar(item.obs)}`
                                :
                                ""
                        }

                    </div>

                    <button
                        onclick="removerLista('${item.id}')"
                    >
                        Remover
                    </button>

                </div>

            `)
            .join("");

}


function removerLista(id) {

    const lista =
        pegarLista()
            .filter(
                item =>
                    String(item.id) !==
                    String(id)
            );


    salvar(
        CHAVE_LISTA,
        lista
    );


    mostrarLista();

}


function limparLista() {

    if (
        !confirm(
            "Deseja limpar sua lista?"
        )
    ) {

        return;

    }


    salvar(
        CHAVE_LISTA,
        []
    );


    mostrarLista();

}


function enviarLista() {

    const lista =
        pegarLista();


    if (
        lista.length === 0
    ) {

        alert(
            "Sua lista está vazia."
        );

        return;

    }


    const usuario =
        carregar(
            CHAVE_USUARIO,
            null
        );


    let mensagem =
        "*LISTA DE COMPRAS - MERCADO MM*\n\n";


    if (usuario) {

        mensagem +=
            "*Cliente:* " +
            usuario.nome +
            "\n\n";

    }


    lista.forEach(
        item => {

            mensagem +=
                "• " +
                item.quantidade +
                "x " +
                item.produto;


            if (item.marca) {

                mensagem +=
                    " — " +
                    item.marca;

            }


            if (item.obs) {

                mensagem +=
                    " (" +
                    item.obs +
                    ")";

            }


            mensagem += "\n";

        }
    );


    const url =
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        encodeURIComponent(
            mensagem
        );


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   CONTA
===================================================== */

function abrirConta() {

    const usuario =
        carregar(
            CHAVE_USUARIO,
            null
        );


    if (!usuario) {

        return;

    }


    document
        .getElementById(
            "nomeConta"
        )
        .value =
            usuario.nome;


    abrirModal(
        "modalConta"
    );

}


function salvarNome() {

    const usuario =
        carregar(
            CHAVE_USUARIO,
            null
        );


    if (!usuario) {

        return;

    }


    const nome =
        document
            .getElementById(
                "nomeConta"
            )
            .value
            .trim();


    if (nome.length < 2) {

        alert(
            "Digite um nome válido."
        );

        return;

    }


    usuario.nome = nome;


    salvar(
        CHAVE_USUARIO,
        usuario
    );


    fecharModal(
        "modalConta"
    );


    alert(
        "Nome atualizado."
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        mostrarProdutos();

        atualizarCarrinho();

        mostrarLista();

        mostrarHistorico();


        const usuario =
            carregar(
                CHAVE_USUARIO,
                null
            );


        const logado =
            localStorage.getItem(
                CHAVE_LOGIN
            ) === "true";


        if (
            usuario &&
            logado
        ) {

            entrarNoSistema();

        } else {

            document
                .getElementById(
                    "sistema"
                )
                .classList.add(
                    "oculto"
                );

            document
                .getElementById(
                    "telaLogin"
                )
                .classList.remove(
                    "oculto"
                );


            if (usuario) {

                mostrarLogin();

            } else {

                mostrarCadastro();

            }

        }

    }
);