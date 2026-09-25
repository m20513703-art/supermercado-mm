"use strict";

/* =====================================================
   CONFIGURAÇÃO
===================================================== */

const WHATSAPP = "5519981123401";

let carrinho =
    JSON.parse(
        localStorage.getItem("mercadoMM_carrinho")
    ) || [];

let setorAtual = "";


/* =====================================================
   NOMES DOS SETORES
===================================================== */

const setores = {

    acougue: "🥩 Açougue",
    hortifruti: "🥬 Hortifruti",
    laticinios: "🥛 Laticínios",
    bebidas: "🥤 Bebidas",
    biscoitos: "🍪 Biscoitos e Snacks",
    limpeza: "🧹 Limpeza",
    higiene: "🧴 Higiene e Perfumaria",
    pet: "🐶 Pet Shop",
    padaria: "🥖 Padaria",
    outros: "📦 Outros"

};


/* =====================================================
   PRODUTOS
===================================================== */

const produtos = {

    acougue: [

        "Carne bovina - Alcatra",
        "Carne bovina - Contrafilé",
        "Carne bovina - Picanha",
        "Carne bovina - Maminha",
        "Carne bovina - Fraldinha",
        "Carne bovina - Patinho",
        "Carne bovina - Coxão mole",
        "Carne bovina - Coxão duro",
        "Carne bovina - Acém",
        "Carne bovina - Músculo",
        "Carne bovina - Costela",
        "Carne bovina - Cupim",

        "Carne suína - Pernil",
        "Carne suína - Lombo",
        "Carne suína - Costela",
        "Carne suína - Panceta",
        "Carne suína - Bisteca",
        "Carne suína - Paleta",
        "Carne suína - Copa",
        "Carne suína - Toucinho",

        "Frango - Peito",
        "Frango - Coxa",
        "Frango - Sobrecoxa",
        "Frango - Asa",
        "Frango - Coxinha da asa",
        "Frango - Filezinho",
        "Frango - Coração",
        "Frango - Pescoço",
        "Frango - Fígado",
        "Frango - Pé",

        "Para churrasco - Alcatra",
        "Para churrasco - Picanha",
        "Para churrasco - Maminha",
        "Para churrasco - Fraldinha",
        "Para churrasco - Costela",
        "Para churrasco - Cupim",
        "Para churrasco - Contrafilé",
        "Para churrasco - Linguiça",
        "Para churrasco - Asa de frango",
        "Para churrasco - Coração de frango"

    ],

    hortifruti: [

        "Alface",
        "Couve",
        "Repolho",
        "Rúcula",
        "Agrião",
        "Espinafre",

        "Tomate",
        "Cebola",
        "Alho",
        "Batata",
        "Batata-doce",
        "Mandioca",
        "Cenoura",
        "Beterraba",
        "Abobrinha",
        "Berinjela",
        "Pepino",
        "Pimentão",
        "Brócolis",
        "Couve-flor",
        "Chuchu",
        "Milho verde",

        "Banana",
        "Maçã",
        "Laranja",
        "Limão",
        "Mamão",
        "Melancia",
        "Melão",
        "Abacaxi",
        "Uva",
        "Morango",
        "Manga",
        "Abacate",
        "Pera",
        "Kiwi",

        "Salsa",
        "Cebolinha",
        "Cheiro-verde",
        "Coentro",

        "Para churrasco - Cebola",
        "Para churrasco - Tomate",
        "Para churrasco - Pimentão",
        "Para churrasco - Alho",
        "Para churrasco - Limão",
        "Para churrasco - Mandioca"

    ],

    laticinios: [

        "Leite",
        "Leite em pó",
        "Queijo",
        "Mussarela",
        "Presunto",
        "Requeijão",
        "Manteiga",
        "Margarina",
        "Iogurte",
        "Creme de leite",
        "Leite condensado",
        "Achocolatado",
        "Coalhada"

    ],

    bebidas: [

        "Água",
        "Água com gás",
        "Refrigerante",
        "Suco",
        "Néctar",
        "Energético",
        "Isotônico",
        "Chá",
        "Café pronto"

    ],

    biscoitos: [

        "Biscoito recheado",
        "Biscoito doce",
        "Biscoito salgado",
        "Biscoito de água e sal",
        "Wafer",
        "Torrada",
        "Pipoca",
        "Salgadinho",
        "Amendoim",
        "Castanhas",
        "Pão de forma",
        "Pão de forma integral",
        "Bolo de pacotinho",
        "Bolinho pequeno"

    ],

    limpeza: [

        "Sabão em pó",
        "Sabão líquido",
        "Amaciante",
        "Detergente",
        "Desinfetante",
        "Água sanitária",
        "Multiuso",
        "Limpa-vidros",
        "Esponja",
        "Saco para lixo",
        "Papel toalha",
        "Vassoura",
        "Rodo",
        "Pano de chão",
        "Balde",
        "Lustra-móveis"

    ],

    higiene: [

        "Sabonete",
        "Shampoo",
        "Condicionador",
        "Creme dental",
        "Escova de dentes",
        "Fio dental",
        "Desodorante",
        "Papel higiênico",
        "Absorvente",
        "Algodão",
        "Cotonete",
        "Barbeador",
        "Creme para cabelo",
        "Sabonete líquido",
        "Hidratante"

    ],

    pet: [

        "Ração para cachorro",
        "Ração para gato",
        "Petiscos",
        "Areia para gato",
        "Tapete higiênico",
        "Shampoo para animais",
        "Brinquedo para animais",
        "Osso para cachorro"

    ],

    padaria: [

        "Pão francês",
        "Pão de forma",
        "Pão de forma integral",
        "Pão integral",
        "Pão doce",
        "Pão de queijo",
        "Rosca",
        "Bolo",
        "Bolo de pacotinho",
        "Bolinho pequeno",
        "Torta",
        "Salgado",
        "Croissant",
        "Presunto",
        "Mussarela",
        "Queijo"

    ],

    outros: [

        "Carvão",
        "Fósforo",
        "Isqueiro",
        "Pilhas",
        "Guardanapo",
        "Papel alumínio",
        "Filme plástico",
        "Sacos para freezer",
        "Velas",
        "Papel filme",
        "Papel manteiga"

    ]

};


/* =====================================================
   SETORES VENDIDOS POR KG
===================================================== */

const setoresKg = [
    "acougue",
    "hortifruti",
    "padaria"
];


/* =====================================================
   SETORES COM MARCA
===================================================== */

const setoresComMarca = [
    "laticinios",
    "bebidas",
    "biscoitos",
    "padaria"
];


/* =====================================================
   MENU
===================================================== */

function alternarMenu() {

    const menu =
        document.getElementById("menuPrincipal");

    if (!menu) return;

    menu.classList.toggle("menu-aberto");

}


/* =====================================================
   ABRIR SEÇÃO
===================================================== */

function abrirSecao(id) {

    document
        .querySelectorAll(".secao")
        .forEach(secao => {

            secao.classList.remove("ativa");

        });

    const secao =
        document.getElementById(id);

    if (!secao) return;

    secao.classList.add("ativa");

    const menu =
        document.getElementById("menuPrincipal");

    if (menu) {
        menu.classList.remove("menu-aberto");
    }

    if (id === "carrinho") {
        atualizarCarrinho();
    }

    if (id === "historico") {
        carregarHistorico();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   ABRIR SETOR
===================================================== */

function abrirSetor(setor) {

    setorAtual = setor;

    document
        .getElementById("listaSetores")
        .style.display = "none";

    document
        .getElementById("areaSetor")
        .classList.add("ativo");

    document
        .getElementById("tituloSetor")
        .textContent = setores[setor];

    preencherProdutos(setor);

    configurarQuantidade(setor);

    configurarMarca(setor);

    configurarCorte(setor);

    limparCampos();

}


/* =====================================================
   PREENCHER PRODUTOS
===================================================== */

function preencherProdutos(setor) {

    const select =
        document.getElementById(
            "produtoSelecionado"
        );

    if (!select) return;

    select.innerHTML =
        `<option value="">Selecione o produto</option>`;

    produtos[setor].forEach(produto => {

        const option =
            document.createElement("option");

        option.value = produto;

        option.textContent = produto;

        select.appendChild(option);

    });

}


/* =====================================================
   QUANTIDADE
===================================================== */

function configurarQuantidade(setor) {

    const label =
        document.getElementById(
            "labelQuantidade"
        );

    const campo =
        document.getElementById(
            "quantidadeProduto"
        );

    if (!label || !campo) return;

    if (setoresKg.includes(setor)) {

        label.textContent =
            "Quantidade (kg)";

        campo.min = "0.1";

        campo.step = "0.1";

        campo.value = "1";

    } else {

        label.textContent =
            "Quantidade";

        campo.min = "1";

        campo.step = "1";

        campo.value = "1";

    }

}


/* =====================================================
   MARCA
===================================================== */

function configurarMarca(setor) {

    const campo =
        document.getElementById(
            "campoMarca"
        );

    if (!campo) return;

    if (setoresComMarca.includes(setor)) {

        campo.style.display = "block";

    } else {

        campo.style.display = "none";

    }

}


/* =====================================================
   CORTE
===================================================== */

function configurarCorte(setor) {

    const campo =
        document.getElementById(
            "campoCorte"
        );

    if (!campo) return;

    if (setor === "acougue") {

        campo.style.display = "block";

    } else {

        campo.style.display = "none";

    }

}


/* =====================================================
   LIMPAR CAMPOS
===================================================== */

function limparCampos() {

    const produto =
        document.getElementById(
            "produtoSelecionado"
        );

    const quantidade =
        document.getElementById(
            "quantidadeProduto"
        );

    const marca =
        document.getElementById(
            "marcaProduto"
        );

    const corte =
        document.getElementById(
            "corteProduto"
        );

    const observacao =
        document.getElementById(
            "observacaoProduto"
        );

    if (produto) produto.value = "";

    if (quantidade) quantidade.value = "1";

    if (marca) marca.value = "";

    if (corte) corte.value = "";

    if (observacao) observacao.value = "";

}


/* =====================================================
   VOLTAR PARA SETORES
===================================================== */

function voltarSetores() {

    document
        .getElementById("listaSetores")
        .style.display = "grid";

    document
        .getElementById("areaSetor")
        .classList.remove("ativo");

}


/* =====================================================
   ADICIONAR PRODUTO
===================================================== */

function adicionarProduto() {

    const produto =
        document
            .getElementById(
                "produtoSelecionado"
            )
            .value;

    const quantidade =
        Number(
            document
                .getElementById(
                    "quantidadeProduto"
                )
                .value
        );

    const marca =
        document
            .getElementById(
                "marcaProduto"
            )
            .value
            .trim();

    const corte =
        document
            .getElementById(
                "corteProduto"
            )
            .value
            .trim();

    const observacao =
        document
            .getElementById(
                "observacaoProduto"
            )
            .value
            .trim();

    if (!produto) {

        alert(
            "Selecione um produto."
        );

        return;
    }

    if (!quantidade || quantidade <= 0) {

        alert(
            "Digite uma quantidade válida."
        );

        return;
    }

    carrinho.push({

        id: Date.now(),

        produto,

        quantidade,

        unidade:
            setoresKg.includes(setorAtual)
                ? "kg"
                : "unidade",

        setor:
            setores[setorAtual],

        marca,

        corte,

        observacao

    });

    salvarCarrinho();

    atualizarContador();

    alert(
        "Produto adicionado ao carrinho!"
    );

    limparCampos();

}


/* =====================================================
   SALVAR CARRINHO
===================================================== */

function salvarCarrinho() {

    localStorage.setItem(
        "mercadoMM_carrinho",
        JSON.stringify(carrinho)
    );

}


/* =====================================================
   CONTADOR
===================================================== */

function atualizarContador() {

    const contador =
        document.getElementById(
            "contadorCarrinho"
        );

    if (!contador) return;

    contador.textContent =
        carrinho.length;

}


/* =====================================================
   ATUALIZAR CARRINHO
===================================================== */

function atualizarCarrinho() {

    const lista =
        document.getElementById(
            "listaCarrinho"
        );

    const botao =
        document.getElementById(
            "btnFinalizar"
        );

    if (!lista || !botao) return;

    lista.innerHTML = "";

    if (carrinho.length === 0) {

        lista.innerHTML =
            `<p class="vazio">
                Seu carrinho está vazio.
            </p>`;

        botao.style.display = "none";

        return;
    }

    botao.style.display = "block";

    carrinho.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "item-carrinho";

        const quantidade =
            Number(item.quantidade);

        const quantidadeTexto =
            item.unidade === "kg"
                ? `${quantidade} kg`
                : `${quantidade} unidade(s)`;

        let detalhes = "";

        if (item.marca) {

            detalhes +=
                `<br><small>
                    🏷️ Marca:
                    ${escaparHTML(item.marca)}
                </small>`;

        }

        if (item.corte) {

            detalhes +=
                `<br><small>
                    🔪 Como deseja:
                    ${escaparHTML(item.corte)}
                </small>`;

        }

        if (item.observacao) {

            detalhes +=
                `<br><small>
                    📝 Observação:
                    ${escaparHTML(item.observacao)}
                </small>`;

        }

        div.innerHTML = `

            <div>

                <strong>
                    ${escaparHTML(item.produto)}
                </strong>

                <br>

                <small>
                    ${escaparHTML(item.setor)}
                </small>

                <br>

                Quantidade:
                ${quantidadeTexto}

                ${detalhes}

            </div>

            <button
                onclick="removerProduto(${item.id})">

                🗑️

            </button>

        `;

        lista.appendChild(div);

    });

}


/* =====================================================
   REMOVER PRODUTO
===================================================== */

function removerProduto(id) {

    carrinho =
        carrinho.filter(
            item => item.id !== id
        );

    salvarCarrinho();

    atualizarCarrinho();

    atualizarContador();

}


/* =====================================================
   FINALIZAR CARRINHO
===================================================== */

function finalizarCarrinho() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }

    abrirSecao("finalizar");

}


/* =====================================================
   TIPO DE RECEBIMENTO
===================================================== */

function alterarTipoRecebimento() {

    const selecionado =
        document.querySelector(
            'input[name="tipoRecebimento"]:checked'
        );

    if (!selecionado) return;

    const tipo =
        selecionado.value;

    const dadosEntrega =
        document.getElementById(
            "dadosEntrega"
        );

    const rua =
        document.getElementById(
            "ruaCliente"
        );

    const numero =
        document.getElementById(
            "numeroCliente"
        );

    const bairro =
        document.getElementById(
            "bairroCliente"
        );

    if (
        !dadosEntrega ||
        !rua ||
        !numero ||
        !bairro
    ) {
        return;
    }

    if (tipo === "Entrega") {

        dadosEntrega.style.display =
            "block";

        rua.required = true;

        numero.required = true;

        bairro.required = true;

    } else {

        dadosEntrega.style.display =
            "none";

        rua.required = false;

        numero.required = false;

        bairro.required = false;

        rua.value = "";

        numero.value = "";

        bairro.value = "";

        const referencia =
            document.getElementById(
                "referenciaCliente"
            );

        if (referencia) {
            referencia.value = "";
        }

    }

}


/* =====================================================
   ENVIAR PEDIDO PELO WHATSAPP
===================================================== */

function enviarPedido(event) {

    event.preventDefault();

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }

    const nome =
        document
            .getElementById(
                "nomeCliente"
            )
            .value
            .trim();

    const selecionado =
        document.querySelector(
            'input[name="tipoRecebimento"]:checked'
        );

    if (!selecionado) {

        alert(
            "Selecione a forma de recebimento."
        );

        return;
    }

    const tipo =
        selecionado.value;

    const pagamento =
        document
            .getElementById(
                "formaPagamento"
            )
            .value;

    const observacao =
        document
            .getElementById(
                "observacaoCliente"
            )
            .value
            .trim();

    let mensagem =
        "🛒 *NOVO PEDIDO - SUPERMERCADO MM*%0A%0A";

    mensagem +=
        "*CLIENTE*%0A";

    mensagem +=
        `Nome: ${encodeURIComponent(nome)}%0A`;

    mensagem +=
        `Forma de recebimento: ${encodeURIComponent(tipo)}%0A`;

    if (tipo === "Entrega") {

        const rua =
            document
                .getElementById(
                    "ruaCliente"
                )
                .value
                .trim();

        const numero =
            document
                .getElementById(
                    "numeroCliente"
                )
                .value
                .trim();

        const bairro =
            document
                .getElementById(
                    "bairroCliente"
                )
                .value
                .trim();

        const referencia =
            document
                .getElementById(
                    "referenciaCliente"
                )
                .value
                .trim();

        mensagem +=
            `Rua: ${encodeURIComponent(rua)}%0A`;

        mensagem +=
            `Número: ${encodeURIComponent(numero)}%0A`;

        mensagem +=
            `Bairro: ${encodeURIComponent(bairro)}%0A`;

        if (referencia) {

            mensagem +=
                `Referência: ${encodeURIComponent(referencia)}%0A`;

        }

    }

    mensagem += "%0A";

    mensagem +=
        `Pagamento: ${encodeURIComponent(pagamento)}%0A%0A`;

    mensagem +=
        "*PRODUTOS DO PEDIDO*%0A";

    carrinho.forEach(
        (item, index) => {

            const quantidade =
                Number(item.quantidade);

            const quantidadeTexto =
                item.unidade === "kg"
                    ? `${quantidade} kg`
                    : `${quantidade} unidade(s)`;

            mensagem +=
                `${index + 1}. ${encodeURIComponent(item.produto)}%0A`;

            mensagem +=
                `Quantidade: ${encodeURIComponent(quantidadeTexto)}%0A`;

            mensagem +=
                `Setor: ${encodeURIComponent(item.setor)}%0A`;

            if (item.marca) {

                mensagem +=
                    `Marca: ${encodeURIComponent(item.marca)}%0A`;

            }

            if (item.corte) {

                mensagem +=
                    `Como deseja: ${encodeURIComponent(item.corte)}%0A`;

            }

            if (item.observacao) {

                mensagem +=
                    `Observação: ${encodeURIComponent(item.observacao)}%0A`;

            }

            mensagem += "%0A";

        }
    );

    if (observacao) {

        mensagem +=
            "*OBSERVAÇÃO GERAL*%0A";

        mensagem +=
            `${encodeURIComponent(observacao)}%0A%0A`;

    }

    mensagem +=
        "💰 *O valor da compra será informado por um funcionário do Supermercado MM pelo WhatsApp.*";

    /* =================================================
       SALVAR HISTÓRICO ANTES DE LIMPAR O CARRINHO
    ================================================= */

    salvarHistorico(
        nome,
        tipo
    );

    const url =
        `https://wa.me/${WHATSAPP}?text=${mensagem}`;

    window.open(
        url,
        "_blank"
    );

    carrinho = [];

    salvarCarrinho();

    atualizarContador();

    const form =
        document.getElementById(
            "formPedido"
        );

    if (form) {
        form.reset();
    }

    alterarTipoRecebimento();

    alert(
        "Pedido enviado! Um funcionário do Supermercado MM responderá pelo WhatsApp com o valor da sua compra."
    );

    abrirSecao("inicio");

}


/* =====================================================
   SALVAR HISTÓRICO
===================================================== */

function salvarHistorico(
    nome,
    tipo
) {

    let historico =
        JSON.parse(
            localStorage.getItem(
                "mercadoMM_historico"
            )
        ) || [];

    historico.unshift({

        nome: nome,

        tipo: tipo,

        data:
            new Date()
                .toLocaleString(
                    "pt-BR"
                ),

        produtos:
            carrinho.map(
                item => ({

                    produto:
                        item.produto,

                    quantidade:
                        item.quantidade,

                    unidade:
                        item.unidade,

                    setor:
                        item.setor,

                    marca:
                        item.marca || "",

                    corte:
                        item.corte || "",

                    observacao:
                        item.observacao || ""

                })
            )

    });

    localStorage.setItem(

        "mercadoMM_historico",

        JSON.stringify(historico)

    );

}


/* =====================================================
   MAPA
===================================================== */

function abrirMapa() {

    const endereco =
        encodeURIComponent(
            "Rua Guanabara, 26, Divinolândia, SP"
        );

    window.open(

        `https://www.google.com/maps/search/?api=1&query=${endereco}`,

        "_blank"

    );

}


/* =====================================================
   MOSTRAR HISTÓRICO
===================================================== */

function carregarHistorico() {

    const lista =
        document.getElementById(
            "listaHistorico"
        );

    if (!lista) return;

    const historico =
        JSON.parse(
            localStorage.getItem(
                "mercadoMM_historico"
            )
        ) || [];

    if (historico.length === 0) {

        lista.innerHTML =
            `<p class="vazio">
                Nenhum pedido realizado ainda.
            </p>`;

        return;

    }

    lista.innerHTML = "";

    historico.forEach(
        (pedido, index) => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "item-carrinho";

            let produtosHTML = "";

            if (
                Array.isArray(
                    pedido.produtos
                )
            ) {

                pedido.produtos.forEach(
                    item => {

                        const quantidade =
                            Number(
                                item.quantidade
                            );

                        const quantidadeTexto =
                            item.unidade === "kg"
                                ? `${quantidade} kg`
                                : `${quantidade} unidade(s)`;

                        let detalhes = "";

                        if (item.marca) {

                            detalhes += `
                                <br>
                                <small>
                                    🏷️ Marca:
                                    ${escaparHTML(item.marca)}
                                </small>
                            `;

                        }

                        if (item.corte) {

                            detalhes += `
                                <br>
                                <small>
                                    🔪 Como deseja:
                                    ${escaparHTML(item.corte)}
                                </small>
                            `;

                        }

                        if (item.observacao) {

                            detalhes += `
                                <br>
                                <small>
                                    📝 Observação:
                                    ${escaparHTML(item.observacao)}
                                </small>
                            `;

                        }

                        produtosHTML += `

                            <div
                                style="
                                    margin-top:10px;
                                    padding:10px;
                                    border-left:4px solid #168b38;
                                    background:#f5fff7;
                                "
                            >

                                <strong>
                                    🛒
                                    ${escaparHTML(item.produto)}
                                </strong>

                                <br>

                                <small>
                                    Quantidade:
                                    ${quantidadeTexto}
                                </small>

                                ${detalhes}

                            </div>

                        `;

                    }
                );

            }

            div.innerHTML = `

                <div>

                    <strong>
                        📋 Pedido
                        ${historico.length - index}
                    </strong>

                    <p>
                        Cliente:
                        ${escaparHTML(pedido.nome)}
                    </p>

                    <p>
                        Recebimento:
                        ${escaparHTML(pedido.tipo)}
                    </p>

                    <small>
                        ${escaparHTML(pedido.data)}
                    </small>

                    <br><br>

                    <strong>
                        🛒 Produtos comprados:
                    </strong>

                    ${produtosHTML}

                </div>

            `;

            lista.appendChild(div);

        }
    );

}


/* =====================================================
   SEGURANÇA HTML
===================================================== */

function escaparHTML(texto) {

    return String(texto ?? "")

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarContador();

        abrirSecao("inicio");

        alterarTipoRecebimento();

    }
);