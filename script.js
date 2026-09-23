"use strict";

/* =====================================================
   MERCADO MM
   JAVASCRIPT NOVO
===================================================== */


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
   PROMOÇÕES
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
   UTILIDADES
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

        return valor
            ? JSON.parse(valor)
            : padrao;

    } catch {

        return padrao;

    }

}


function idNovo() {

    return (
        Date.now() +
        "-" +
        Math.floor(
            Math.random() * 10000
        )
    );

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
   ACESSO
===================================================== */

function mostrarLogin() {

    document
        .getElementById("loginBox")
        .classList.remove("escondido");

    document
        .getElementById("cadastroBox")
        .classList.add("escondido");

}


function mostrarCadastro() {

    document
        .getElementById("loginBox")
        .classList.add("escondido");

    document
        .getElementById("cadastroBox")
        .classList.remove("escondido");

}


function entrarNoSistema() {

    document
        .getElementById("acesso")
        .classList.add("escondido");

    document
        .getElementById("app")
        .classList.remove("escondido");

}


function sairDoSistema() {

    document
        .getElementById("app")
        .classList.add("escondido");

    document
        .getElementById("acesso")
        .classList.remove("escondido");

}


/* =====================================================
   CADASTRO
===================================================== */

function cadastrar(evento) {

    evento.preventDefault();


    const nome =
        document
            .getElementById("cadastroNome")
            .value
            .trim();

    const senha =
        document
            .getElementById("cadastroSenha")
            .value;

    const confirmacao =
        document
            .getElementById("cadastroConfirmacao")
            .value;

    const erro =
        document.getElementById(
            "cadastroErro"
        );


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


    if (senha !== confirmacao) {

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

        id: idNovo(),

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


    document
        .getElementById("cadastroForm")
        .reset();


    entrarNoSistema();

    mostrarPagina("inicio");

}


/* =====================================================
   LOGIN
===================================================== */

function login(evento) {

    evento.preventDefault();


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
        document.getElementById(
            "loginErro"
        );


    erro.textContent = "";


    const usuario =
        carregar(
            CHAVE_USUARIO,
            null
        );


    if (!usuario) {

        mostrarCadastro();

        document.getElementById(
            "cadastroErro"
        ).textContent =
            "Crie sua conta primeiro.";

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


    document
        .getElementById("loginForm")
        .reset();


    entrarNoSistema();

    mostrarPagina("inicio");

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
        .getElementById("nomeConta")
        .value =
        usuario.nome;


    abrirModal("contaModal");

}


function salvarConta(evento) {

    evento.preventDefault();


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
            .getElementById("nomeConta")
            .value
            .trim();


    if (nome.length < 2) {

        alert(
            "Digite um nome válido."
        );

        return;

    }


    usuario.nome =
        nome;


    salvar(
        CHAVE_USUARIO,
        usuario
    );


    fecharModal("contaModal");


    alert(
        "Nome atualizado com sucesso."
    );

}


function sairConta() {

    localStorage.removeItem(
        CHAVE_LOGIN
    );


    fecharModal("contaModal");

    sairDoSistema();

    mostrarLogin();

}


/* =====================================================
   NAVEGAÇÃO
===================================================== */

function mostrarPagina(id) {

    document
        .querySelectorAll(".pagina")
        .forEach(pagina => {

            pagina.classList.remove(
                "ativa"
            );

        });


    const pagina =
        document.getElementById(id);


    if (!pagina) {
        return;
    }


    pagina.classList.add(
        "ativa"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function configurarNavegacao() {

    document
        .querySelectorAll("[data-pagina]")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    mostrarPagina(
                        botao.dataset.pagina
                    );

                }
            );

        });

}


/* =====================================================
   PRODUTOS
===================================================== */

function criarProduto(produto) {

    return `

        <article class="produto">

            <div class="produto-foto">

                <img
                    src="${escapar(produto.imagem)}"
                    alt="${escapar(produto.nome)}"
                    onerror="
                        this.onerror=null;
                        this.src='img/mercado-mm.jpg';
                    "
                >

            </div>

            <div class="produto-conteudo">

                <h3>
                    ${escapar(produto.nome)}
                </h3>

                <div class="preco">
                    ${dinheiro(produto.preco)}
                </div>

                ${
                    produto.unidade
                        ? `
                            <div class="unidade">
                                por ${escapar(produto.unidade)}
                            </div>
                        `
                        : ""
                }

                <div class="produto-botoes">

                    <button
                        class="comprar"
                        data-comprar="${produto.id}"
                        type="button"
                    >
                        Comprar agora
                    </button>

                    <button
                        class="adicionar"
                        data-adicionar="${produto.id}"
                        type="button"
                    >
                        + Adicionar ao carrinho
                    </button>

                </div>

            </div>

        </article>

    `;

}


function mostrarProdutos() {

    const html =
        produtos
            .map(criarProduto)
            .join("");


    document
        .getElementById(
            "promocoesInicio"
        )
        .innerHTML = html;


    document
        .getElementById(
            "promocoes"
        )
        .innerHTML = html;


    document
        .querySelectorAll(
            "[data-adicionar]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    adicionarCarrinho(
                        Number(
                            botao.dataset.adicionar
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(
            "[data-comprar]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    comprarAgora(
                        Number(
                            botao.dataset.comprar
                        )
                    );

                }
            );

        });

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

}


function comprarAgora(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    if (!produto) {
        return;
    }


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


function alterarQuantidade(
    id,
    valor
) {

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

    salvarCarrinho(

        pegarCarrinho()
            .filter(
                item =>
                    item.id !== id
            )

    );


    atualizarCarrinho();

}


function totalCarrinho() {

    return pegarCarrinho()
        .reduce(
            (total, item) => {

                return total +
                    item.preco *
                    item.quantidade;

            },
            0
        );

}


function atualizarCarrinho() {

    const carrinho =
        pegarCarrinho();


    const contador =
        carrinho.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );


    document
        .getElementById(
            "contador"
        )
        .textContent = contador;


    const container =
        document.getElementById(
            "carrinhoItens"
        );


    if (carrinho.length === 0) {

        container.innerHTML = `

            <div class="vazio">

                <h3>
                    Seu carrinho está vazio.
                </h3>

                <p>
                    Escolha uma promoção para começar.
                </p>

            </div>

        `;

    } else {

        container.innerHTML =
            carrinho
                .map(item => `

                    <div class="item-carrinho">

                        <div>

                            <h3>
                                ${escapar(item.nome)}
                            </h3>

                            <small>
                                ${dinheiro(item.preco)}
                                ${
                                    item.unidade
                                        ? " / " +
                                          escapar(item.unidade)
                                        : ""
                                }
                            </small>

                            <div class="quantidades">

                                <button
                                    type="button"
                                    data-menos="${item.id}"
                                >
                                    −
                                </button>

                                <strong>
                                    ${item.quantidade}
                                </strong>

                                <button
                                    type="button"
                                    data-mais="${item.id}"
                                >
                                    +
                                </button>

                            </div>

                            <button
                                type="button"
                                class="remover"
                                data-remover="${item.id}"
                            >
                                Remover
                            </button>

                        </div>

                        <strong>
                            ${dinheiro(
                                item.preco *
                                item.quantidade
                            )}
                        </strong>

                    </div>

                `)
                .join("");


        document
            .querySelectorAll("[data-menos]")
            .forEach(botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        alterarQuantidade(
                            Number(
                                botao.dataset.menos
                            ),
                            -1
                        );

                    }
                );

            });


        document
            .querySelectorAll("[data-mais]")
            .forEach(botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        alterarQuantidade(
                            Number(
                                botao.dataset.mais
                            ),
                            1
                        );

                    }
                );

            });


        document
            .querySelectorAll("[data-remover]")
            .forEach(botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        removerCarrinho(
                            Number(
                                botao.dataset.remover
                            )
                        );

                    }
                );

            });

    }


    document
        .getElementById(
            "carrinhoTotal"
        )
        .textContent =
        dinheiro(
            totalCarrinho()
        );

}


/* =====================================================
   MODAIS
===================================================== */

function abrirModal(id) {

    document
        .getElementById(id)
        .classList.remove(
            "escondido"
        );

}


function fecharModal(id) {

    document
        .getElementById(id)
        .classList.add(
            "escondido"
        );

}


/* =====================================================
   CHECKOUT
===================================================== */

function abrirCheckout() {

    if (
        pegarCarrinho().length === 0
    ) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    atualizarResumo();

    fecharModal("carrinhoModal");

    abrirModal("checkoutModal");

    atualizarEntrega();

    atualizarTroco();

}


function atualizarResumo() {

    const carrinho =
        pegarCarrinho();


    document
        .getElementById(
            "resumoPedido"
        )
        .innerHTML = `

            <strong>
                Resumo da compra
            </strong>

            <br>

            ${
                carrinho
                    .map(item => `

                        ${item.quantidade}x
                        ${escapar(item.nome)}
                        —
                        ${dinheiro(
                            item.preco *
                            item.quantidade
                        )}

                        <br>

                    `)
                    .join("")
            }

            <br>

            <strong>
                Total:
                ${dinheiro(totalCarrinho())}
            </strong>

        `;

}


function atualizarEntrega() {

    const tipo =
        document.getElementById(
            "tipoEntrega"
        ).value;


    const area =
        document.getElementById(
            "enderecoArea"
        );


    if (tipo === "entrega") {

        area.classList.remove(
            "escondido"
        );

    } else {

        area.classList.add(
            "escondido"
        );

    }

}


function atualizarTroco() {

    const forma =
        document.getElementById(
            "pagamento"
        ).value;


    const area =
        document.getElementById(
            "trocoArea"
        );


    if (forma === "dinheiro") {

        area.classList.remove(
            "escondido"
        );

    } else {

        area.classList.add(
            "escondido"
        );

        document
            .getElementById(
                "trocoPara"
            )
            .value = "";

        document
            .getElementById(
                "trocoResultado"
            )
            .textContent = "";

    }

}


function calcularTroco() {

    const valor =
        Number(
            document.getElementById(
                "trocoPara"
            ).value
        );


    const total =
        totalCarrinho();


    const resultado =
        document.getElementById(
            "trocoResultado"
        );


    if (!valor) {

        resultado.textContent = "";

        return;

    }


    if (valor < total) {

        resultado.textContent =
            "O valor é menor que o total.";

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
        "#18a558";

}


/* =====================================================
   FINALIZAR PEDIDO
===================================================== */

function finalizarPedido(evento) {

    evento.preventDefault();


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
        document.getElementById(
            "tipoEntrega"
        ).value;


    const pagamento =
        document.getElementById(
            "pagamento"
        ).value;


    let endereco = null;


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


    const pedido = {

        id: idNovo(),

        data:
            new Date().toISOString(),

        cliente:
            usuario
                ? usuario.nome
                : "Cliente",

        itens:
            carrinho.map(item => ({
                ...item
            })),

        total:
            totalCarrinho(),

        tipoEntrega: tipo,

        endereco,

        pagamento,

        trocoPara,

        troco

    };


    salvarHistorico(
        pedido
    );


    const mensagem =
        criarMensagemWhatsApp(
            pedido
        );


    /*
     * Limpa o carrinho antes de enviar.
     */

    salvarCarrinho([]);

    atualizarCarrinho();


    /*
     * Fecha o checkout.
     */

    fecharModal(
        "checkoutModal"
    );


    /*
     * Abre WhatsApp.
     */

    window.open(
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        encodeURIComponent(
            mensagem
        ),
        "_blank"
    );


    /*
     * Mostra mensagem quando
     * o cliente volta ao site.
     */

    localStorage.setItem(
        "mercadoMM_compraEnviada",
        "true"
    );

}


/* =====================================================
   WHATSAPP
===================================================== */

function criarMensagemWhatsApp(pedido) {

    let mensagem =
        "*NOVO PEDIDO - MERCADO MM*\n\n";


    mensagem +=
        "*Cliente:* " +
        pedido.cliente +
        "\n\n";


    mensagem +=
        "*PRODUTOS:*\n";


    pedido.itens.forEach(item => {

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

    });


    mensagem +=
        "\n*TOTAL: " +
        dinheiro(
            pedido.total
        ) +
        "*\n\n";


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

function salvarHistorico(pedido) {

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


    mostrarHistorico();

}


function mostrarHistorico() {

    const container =
        document.getElementById(
            "historicoLista"
        );


    const historico =
        carregar(
            CHAVE_HISTORICO,
            []
        );


    if (historico.length === 0) {

        container.innerHTML = `

            <div class="vazio">

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

                        <div class="data">
                            ${data}
                        </div>

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

                        <p>
                            <strong>
                                Total:
                                ${dinheiro(pedido.total)}
                            </strong>
                        </p>

                        <p>
                            ${
                                pedido.tipoEntrega ===
                                "entrega"
                                    ? "🚚 Entrega"
                                    : "🏪 Retirada"
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


function mostrarLista() {

    const lista =
        pegarLista();


    const container =
        document.getElementById(
            "itensLista"
        );


    if (lista.length === 0) {

        container.innerHTML = `

            <div class="vazio">

                Sua lista está vazia.

            </div>

        `;

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
                                ? `
                                    <br>
                                    Marca:
                                    ${escapar(item.marca)}
                                `
                                : ""
                        }

                        ${
                            item.obs
                                ? `
                                    <br>
                                    Obs.:
                                    ${escapar(item.obs)}
                                `
                                : ""
                        }

                    </div>

                    <button
                        type="button"
                        data-remover-lista="${item.id}"
                    >
                        Remover
                    </button>

                </div>

            `)
            .join("");


    document
        .querySelectorAll(
            "[data-remover-lista]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    removerLista(
                        botao.dataset.removerLista
                    );

                }
            );

        });

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

        id: idNovo(),

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

    const lista =
        pegarLista();


    if (lista.length === 0) {
        return;
    }


    if (
        !confirm(
            "Deseja realmente limpar sua lista?"
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


function enviarListaWhatsApp() {

    const lista =
        pegarLista();


    if (lista.length === 0) {

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


    lista.forEach(item => {

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

    });


    mensagem +=
        "\nObrigado!";


    window.open(
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        encodeURIComponent(
            mensagem
        ),
        "_blank"
    );

}


/* =====================================================
   EVENTOS
===================================================== */

function configurarEventos() {

    document
        .getElementById(
            "irCadastro"
        )
        .addEventListener(
            "click",
            mostrarCadastro
        );


    document
        .getElementById(
            "irLogin"
        )
        .addEventListener(
            "click",
            mostrarLogin
        );


    document
        .getElementById(
            "cadastroForm"
        )
        .addEventListener(
            "submit",
            cadastrar
        );


    document
        .getElementById(
            "loginForm"
        )
        .addEventListener(
            "submit",
            login
        );


    document
        .getElementById(
            "btnCarrinho"
        )
        .addEventListener(
            "click",
            () => {

                atualizarCarrinho();

                abrirModal(
                    "carrinhoModal"
                );

            }
        );


    document
        .getElementById(
            "finalizarCarrinho"
        )
        .addEventListener(
            "click",
            abrirCheckout
        );


    document
        .getElementById(
            "btnConta"
        )
        .addEventListener(
            "click",
            abrirConta
        );


    document
        .getElementById(
            "contaForm"
        )
        .addEventListener(
            "submit",
            salvarConta
        );


    document
        .getElementById(
            "sairConta"
        )
        .addEventListener(
            "click",
            sairConta
        );


    document
        .getElementById(
            "tipoEntrega"
        )
        .addEventListener(
            "change",
            atualizarEntrega
        );


    document
        .getElementById(
            "pagamento"
        )
        .addEventListener(
            "change",
            atualizarTroco
        );


    document
        .getElementById(
            "trocoPara"
        )
        .addEventListener(
            "input",
            calcularTroco
        );


    document
        .getElementById(
            "checkoutForm"
        )
        .addEventListener(
            "submit",
            finalizarPedido
        );


    document
        .getElementById(
            "adicionarLista"
        )
        .addEventListener(
            "click",
            adicionarLista
        );


    document
        .getElementById(
            "limparLista"
        )
        .addEventListener(
            "click",
            limparLista
        );


    document
        .getElementById(
            "enviarLista"
        )
        .addEventListener(
            "click",
            enviarListaWhatsApp
        );


    document
        .querySelectorAll(
            "[data-fechar]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    fecharModal(
                        botao.dataset.fechar
                    );

                }
            );

        });


    document
        .getElementById(
            "fecharRetorno"
        )
        .addEventListener(
            "click",
            () => {

                fecharModal(
                    "retornoModal"
                );

            }
        );


    configurarNavegacao();

}


/* =====================================================
   RETORNO DO WHATSAPP
===================================================== */

function verificarRetorno() {

    const compra =
        localStorage.getItem(
            "mercadoMM_compraEnviada"
        );


    if (
        compra !== "true"
    ) {
        return;
    }


    localStorage.removeItem(
        "mercadoMM_compraEnviada"
    );


    setTimeout(() => {

        abrirModal(
            "retornoModal"
        );

    }, 500);

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        configurarEventos();

        mostrarProdutos();

        atualizarCarrinho();

        mostrarLista();

        mostrarHistorico();


        const logado =
            localStorage.getItem(
                CHAVE_LOGIN
            ) === "true";


        const usuario =
            carregar(
                CHAVE_USUARIO,
                null
            );


        if (
            logado &&
            usuario
        ) {

            entrarNoSistema();

        } else {

            sairDoSistema();


            /*
             * Se ainda não existe conta,
             * abre o cadastro.
             */

            if (!usuario) {

                mostrarCadastro();

            } else {

                mostrarLogin();

            }

        }


        verificarRetorno();

    }
);


/* =====================================================
   RETORNO AO SITE
===================================================== */

window.addEventListener(
    "pageshow",
    () => {

        verificarRetorno();

    }
);