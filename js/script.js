
let figurinhaSelecionada = null;
let pacoteAtual = null;
let indiceFigurinhaAtual = 0;

let figurinhasObtidas = [];
let figurinhasColadas = [];



function mostrarPacote(pacote){

    pacoteAtual = pacote;

    indiceFigurinhaAtual = 0;

    document.getElementById(
        "modalPacote"
    ).style.display = "flex";

    mostrarFigurinhaAtual();

}
function mostrarFigurinhaAtual(){

    const id =
    pacoteAtual.figurinhas[
        indiceFigurinhaAtual
    ];

    const figurinha =
    figurinhas.find(
        f => f.id === id
    );

    document.getElementById(
        "figurinhaAberta"
    ).src = figurinha.imagem;

    document.getElementById(
        "numeroFigurinha"
    ).textContent =
    figurinha.nome;

    document.getElementById(
    "descricaoFigurinha"
    ).textContent =
    figurinha.descricao;
}
document
.getElementById("proximaFigurinha")
.addEventListener(
    "click",
    () => {

        indiceFigurinhaAtual++;

        if(
            indiceFigurinhaAtual <
            pacoteAtual.figurinhas.length
        ){

            mostrarFigurinhaAtual();

            return;

        }

        pacoteAtual.figurinhas.forEach(
            id => {

                if(
                    !figurinhasObtidas.includes(id)
                ){

                    figurinhasObtidas.push(id);

                }

            }
        );

        pacoteAtual.aberto = true;

        salvar();

        criarPacotes();

        atualizarInventario();

        document.getElementById(
            "modalPacote"
        ).style.display = "none";

    }
);




// salvar e carregar os dados
function salvar() {

    localStorage.setItem(
        "figurinhasObtidas",
        JSON.stringify(figurinhasObtidas)
    );

    localStorage.setItem(
        "figurinhasColadas",
        JSON.stringify(figurinhasColadas)
    );

    localStorage.setItem(
        "pacotes",
        JSON.stringify(
            pacotes.map(p => ({
            desbloqueado: p.desbloqueado,
            aberto: p.aberto
            }))
        )   
    );
}
function carregar() {

    const obtidas =
    localStorage.getItem(
        "figurinhasObtidas"
    );

    const coladas =
    localStorage.getItem(
        "figurinhasColadas"
    );

    const pacotesSalvos =
    localStorage.getItem("pacotes");

    if(obtidas){

        figurinhasObtidas =
        JSON.parse(obtidas);

    }

    if(coladas){

        figurinhasColadas =
        JSON.parse(coladas);

    }

    if(pacotesSalvos){

        const estados =
        JSON.parse(pacotesSalvos);

        pacotes.forEach((pacote, index) => {

            if(estados[index]){

                pacote.desbloqueado =
                estados[index].desbloqueado;

                pacote.aberto =
                estados[index].aberto;

            }

        });

    }
    
}



const pacotes = [
{
    id: 1,
    desbloqueado: true,
    aberto: false,
    figurinhas: [3,2,5,4,1]
},
{
    id: 2,
    desbloqueado: false,
    aberto: false,
    pergunta: "Qual apelido eu mais uso para você?",
    resposta: "Amor",
    figurinhas: [9,11,8,6,7]
},
{
    id: 3,
    desbloqueado: false,
    aberto: false,
    pergunta: "Quem foi o primeiro a mandar mensagem no instagram? 'Você' (Paulo) ou 'Eu' (Sabrina)?",
    resposta: "Você",
    figurinhas: [41,16,13,21,12]
},
{
    id: 4,
    desbloqueado: false,
    aberto: false,
    pergunta: "Que dia foi que começamos a conversar no instagram? A primeira troca de mensagens no caso. 'DD/MM'",
    resposta: "10/01",
    figurinhas: [10,17,15,14,18]
},
{
    id: 5,
    desbloqueado: false,
    aberto: false,
    pergunta: "Qual foi a primeira forma que eu chamei você? 'Rainha' ou 'Madame'?",
    resposta: "Madame",
    figurinhas: [19,20,24,23,22]
},
{
    id: 6,
    desbloqueado: false,
    aberto: false,
    pergunta: "Quem manda mais reels pro outro no instagram? 'Você' (Paulo) ou 'Eu' (Sabrina)?",
    resposta: "Eu",
    figurinhas: [42,27,32,40,25]
},
{
    id: 7,
    desbloqueado: false,
    aberto: false,
    pergunta: "Qual a diferença de altura entre a gente? Somente número, em média",
    resposta: "30",
    figurinhas: [30,31,29,26,28]
},
{
    id: 8,
    desbloqueado: false,
    aberto: false,
    pergunta: "Dia da primeira prova do Enem. DD/MM",
    resposta: "08/11",
    figurinhas: [35,37,33,36,34]
},
{
    id: 9,
    desbloqueado: false,
    aberto: false,
    pergunta: "Onde o Paulo nasceu?",
    resposta: "Palmas",
    figurinhas: [50,39,44,38,43]
},
{
    id: 10,
    desbloqueado: false,
    aberto: false,
    pergunta: "Qual é o nome completo do Paulo?",
    resposta: "Marcos Paulo Brito da Silva",
    figurinhas: [48,47,45,49,46]
}
];

function criarPacotes() {

    const container =
    document.getElementById("pacotes");

    container.innerHTML = "";

    pacotes.forEach(pacote => {

        const div =
        document.createElement("div");

        div.classList.add("pacote");

        if(pacote.aberto){

        div.innerHTML =
        `📭 Pacote ${pacote.id}`;

        }else if(pacote.desbloqueado){

        div.innerHTML =
        `📦 Pacote ${pacote.id}`;

        }else{

        div.innerHTML =
        `🔒 Pacote ${pacote.id}`;

        }

        div.addEventListener("click", () => {

            if(pacote.aberto){

            alert(
                "Você já abriu este pacote ❤️"
            );

            return;

            }

            if (!pacote.desbloqueado) {

                const resposta =
                prompt(pacote.pergunta);

                if (
                    resposta?.toLowerCase() !==
                    pacote.resposta.toLowerCase()
                ) {
                    alert("Resposta errada ❤️");
                    return;
                }

                pacote.desbloqueado = true;

                salvar();

                criarPacotes();

                return;
            }

            abrirPacote(pacote);

        });

        container.appendChild(div);

    });

}

function abrirPacote(pacote){

    mostrarPacote(pacote);

}

function criarAlbum() {

    const album =
    document.getElementById("album");

    album.innerHTML = "";

    for(let i = 1; i <= 51; i++) {

        const espaco =
        document.createElement("div");

        espaco.classList.add("espaco");

        espaco.dataset.id = i;

        if(figurinhasColadas.includes(i)){

            const figurinha =
            figurinhas.find(f => f.id === i);

            espaco.innerHTML = `
                <img
                    src="${figurinha.imagem}"
                    alt=""
                >
            `;
            espaco.style.cursor =
            "pointer";

            espaco.addEventListener(
                "click",
                () => abrirMemoria(i)
            );

        }else{

            if(i === 51){

                if(
                    figurinhasColadas.length >= 50 &&
                    !figurinhasObtidas.includes(51)
                ){

                    espaco.innerHTML = `
                        💌
                        <br>
                        Carta Final
                    `;

                    espaco.style.cursor =
                    "pointer";

                    espaco.addEventListener(
                        "click",
                        abrirCartaFinal
                    );

                }else{

                    espaco.innerHTML = `
                        ⭐
                        <br>
                        051
                    `;

                }

            }else{

                espaco.innerHTML = `
                    ?
                    <br>
                    ${String(i).padStart(3,"0")}
                `;

            }

        }

        espaco.addEventListener(
        "dragover",
        (e) => {
            e.preventDefault();
        }
        );

        espaco.addEventListener(
        "drop",
        (e) => {

        e.preventDefault();

        const figurinhaId =
        Number(
            e.dataTransfer.getData(
                "text/plain"
            )
        );

        const espacoId =
        Number(
            espaco.dataset.id
        );

        if(
            figurinhaId === espacoId
        ){

            if(
                !figurinhasColadas.includes(figurinhaId)
            ){
                figurinhasColadas.push(figurinhaId);
            }
            if(figurinhaId === 51){

            abrirCartaFinal();

        }
            //verificarFigurinhaDourada();

            salvar();
            atualizarInventario();
            criarAlbum();
        }else{

            alert(
                "Essa figurinha não pertence aqui ❤️"
            );

        }

    }
        );

        espaco.addEventListener(
            "click",
            () => {
                
                if(
                    figurinhaSelecionada === null
                ){
                    return;
                }

                const espacoId =
                Number(
                    espaco.dataset.id
                );

                if(
                    figurinhaSelecionada === espacoId
                ){

                    if(
                        !figurinhasColadas.includes(
                            figurinhaSelecionada
                        )
                    ){

                        figurinhasColadas.push(
                            figurinhaSelecionada
                        );

                        if(figurinhaSelecionada === 51){

                            abrirCartaFinal();

                        }

                    }

                    //verificarFigurinhaDourada();

                    

                    figurinhaSelecionada = null;

                    document
                    .querySelectorAll(".espaco")
                    .forEach(e => {

                        e.classList.remove(
                            "espaco-piscando"
                        );

                    });

                    document
                    .querySelectorAll(".figurinha")
                    .forEach(f => {

                        f.classList.remove(
                            "selecionada"
                        );

                    });

                    //verificarFigurinhaDourada();

                    salvar();
                    atualizarInventario();
                    criarAlbum();

                }else{

                    alert(
                        "Essa figurinha não pertence aqui ❤️"
                    );

                }

            }
        );

        album.appendChild(espaco);

    }

}

// Figurinhas cada uma com seu id, nome, descrição e imagem.
const figurinhas = [
{
    id: 1,
    nome: "Montanha-russa com meu amor🎢",
    descricao: "Montanha-russa com minha princesa",
    memoria: `
    Eu lembro de ter pedido pra minha princesa colocar em primeira visão pq na parte do túnel era mais legal assim ksksksk.
    `,
    imagem: "images/figurinhas/1.png"
},
{
    id: 2,
    nome: "Amor?",
    descricao: "Não entendi naum 😏😏😏",
    memoria: `
    Até hoje eu n entendi oq aconteceu, mas consigo compreender kkkkkkkkkk 😏😏😏😏
    `,
    imagem: "images/figurinhas/2.png"
},
{
    id: 3,
    nome: "Barco Pirata 🏴‍☠️",
    descricao: "A gente rindo do Thyago",
    memoria: `
    eu falei que o thyago tava com vontade de cagar qnd tava nesse kkkkkkkkkkkkkk
    `,
    imagem: "images/figurinhas/3.png"
},
{
    id: 4,
    nome: "Roda Gigante 🎡",
    descricao: "Roda gigante com minha rainha",
    memoria: `
    A gente tava decidindo em quais vamos na vida real ou não kkkkkkk esse minha princesa quer
    `,
    imagem: "images/figurinhas/4.png"
},
{
    id: 5,
    nome: "Nos molhamos 🌊",
    descricao: "Pq minha princesa tava pulando nos lagos em?",
    memoria: `
    Amor, eu realmente queru saber, me diz o pq minha princesa tava pulando nos laguinhos e ficando parada neles ksksksksksksks
    `,
    imagem: "images/figurinhas/5.png"
},
{
    id: 6,
    nome: "FOFINHA 🥰",
    descricao: "Skin da minha princesa é muito fofaaaaa",
    memoria: `
    a gente já tinha terminado de ver o park aí já
    `,
    imagem: "images/figurinhas/6.png"
},
{
    id: 7,
    nome: "Abraçu",
    descricao: "Abraçandu minha princesa",
    memoria: `
    eu subi sem querer e achei legal a forma que o boneco ficou kkakakaka
    `,
    imagem: "images/figurinhas/7.png"
},
{
    id: 8,
    nome: "Print da genti",
    descricao: "marrrtz e say",
    memoria: `
    aiii como é fofa até no robloquixi
    `,
    imagem: "images/figurinhas/8.png"
},
{
    id: 9,
    nome: "Adimirando minha rainha 😍",
    descricao: "😍 fofinhaaaa",
    memoria: `
    foi uma dificuldade ficar olhando pra minha princesa, só fui descobrir dps que ele olha pra onde o cursor tá apontado kkkkkkk
    `,
    imagem: "images/figurinhas/9.png"
},
{
    id: 10,
    nome: "Joguin de se vestir 👗",
    descricao: "Como sempre, minha rainha em primeiro lugar",
    memoria: `
    Foi a primeira vez que jogamos esse jogo, ai a gente ia jogar só um pouco e dps jgr outro jogo
    `,
    imagem: "images/figurinhas/10.png"
},
{
    id: 11,
    nome: "Joguinhos que minha princesa achou",
    descricao: "Foi no mesmo dia do joguinho de se vestir",
    memoria: `
    Não lembro como funcionava esse joguinho, pq dps a gente ficou parado olhando pro mar, figurinha 12 e 13 vai dar pra ver melhor ksksksks
    `,
    imagem: "images/figurinhas/11.png"
},
{
    id: 12,
    nome: "Mar lindo 🌊",
    descricao: "Minha rainha olhando o mar",
    memoria: `
    O que será que passa nessa cabecinha fofinha da minha princesinha
    `,
    imagem: "images/figurinhas/12.png"
},
{
    id: 13,
    nome: "😍😏",
    descricao: "Minha rainha olhando o mar e eu tendo outros tipos de pensamentos kkkkkkkkkkk",
    memoria: `
    Minha princesa quis parar de jogar pra n descarregar muitu o celular
    `,
    imagem: "images/figurinhas/13.png"
},
{
    id: 14,
    nome: "Sempre no pódio 🏆",
    descricao: "Arrasa dms nas roupas meu amor",
    memoria: `
    sempre fico muito feliz quando minha princesa ganha
    `,
    imagem: "images/figurinhas/14.png"
},
{
    id: 15,
    nome: "Mais um pódio 🏆",
    descricao: "essa skin que eu fiz nada ver kkkkkkkkk",
    memoria: `
    Só faz skins bonitas amooooorrr
    `,
    imagem: "images/figurinhas/15.png"
},
{
    id: 16,
    nome: "Jogando o jogo de empurrar",
    descricao: "Minha princesa tava me perseguindo pra me bater com a panela kkkkkkkkk",
    memoria: `
    Eu tirei essa print pra mostrar pra minha rainha com a bubu com a panela na mão kkkkk igualzinha
    `,
    imagem: "images/figurinhas/16.png"
},
{
    id: 17,
    nome: "Aiiii que fofuraaaa 🥰",
    descricao: "minha princesinha sempre fofaaaaaa",
    memoria: `
    Essa foi uma das melhores skins que fizemos
    `,
    imagem: "images/figurinhas/17.png"
},
{
    id: 18,
    nome: "Lindona 😍",
    descricao: "toda empoderada",
    memoria: `
    Não sei onde que encontra tantos detalhes assim kkkkkkkkkkkkkk
    `,
    imagem: "images/figurinhas/18.png"
},
{
    id: 19,
    nome: "Malvadas",
    descricao: "Esse tema eu gostei bastante kkkkkkkkkkkk",
    memoria: `
    Tema bom dms, minha princesa ficou linda de malvada 😈
    `,
    imagem: "images/figurinhas/19.png"
},
{
    id: 20,
    nome: "Skin de canadenses kkkkkkkkkkkkkk",
    descricao: "Me lembra muito n sei pq",
    memoria: `
    minha rainha toda lindaaaaa
    `,
    imagem: "images/figurinhas/20.png"
},
{
    id: 21,
    nome: "Fofaaaaaaaa dmsss 🥰",
    descricao: "rostinho fofoooooo",
    memoria: `
    Essa print me lembra os dias que a gente jogava natural disasters e eu ficava muito feliz quando minha princesa entrava pra jgr cmg, n sei se foram dias, mas para mim foi algo tão bom que parece que durou dias, fico triste pq eu não tirei print dessas coisas, mas ficará vivo em memórias e no meu coração pra sempre, meu amor ❤️
    `,
    imagem: "images/figurinhas/21.png"
},
{
    id: 22,
    nome: "Eu, minha princesa e Sofi no pódio 🏆",
    descricao: "Era pra minha princesa estar em primeiro lugar, mas ok, sofi perdeu várias outras kkkkkkkkkkk",
    memoria: `
    Sofi claramente fugiu do tema kkkkkkk
    `,
    imagem: "images/figurinhas/22.png"
},
{
    id: 23,
    nome: "Compara nossas skins, olha que injustiça kkkkkkkk",
    descricao: "Minha princesa sempre fznd skins fofas ",
    memoria: `
    sofi já tava perdendo nessa hora ai kkkkkkkkkkkkk
    `,
    imagem: "images/figurinhas/23.png"
},
{
    id: 24,
    nome: "No pódio dnv nós três 🏆",
    descricao: "Minha rainha arrasou com o tema de Viking",
    memoria: `
    Ficou muito linda essa skin de viking, minha princesa divou dms (tô gostando de usar essas palavras kkkkkkkkkkk)
    `,
    imagem: "images/figurinhas/24.png"
},
{
    id: 25,
    nome: "Como não ficou no pódio?",
    descricao: "Era pra ter ficado em primeiro lugar, mas ok",
    memoria: `
    Ficou igualzinha a skin
    `,
    imagem: "images/figurinhas/25.png"
},
{
    id: 26,
    nome: "Nosso quarto da primeira casa que minha rainha fez",
    descricao: "Fez sozinha essa casa ela",
    memoria: `
    Construtora minha rainha
    `,
    imagem: "images/figurinhas/26.jpeg"
},
{
    id: 27,
    nome: "Desenho que meu amor fez",
    descricao: "Um desenho lindo que minha princesa fez",
    memoria: `
    30 estrelas, minha rainha é a mais importante e brilhante delas
    `,
    imagem: "images/figurinhas/27.jpeg"
},
{
    id: 28,
    nome: "Colocando o sofá",
    descricao: "Minha princesa é muitu construtora, fez tudu sozinha",
    memoria: `
    Eu fiquei só olhandu kskskskssksk
    `,
    imagem: "images/figurinhas/28.jpeg"
},
{
    id: 29,
    nome: "Climinha baum",
    descricao: "Minha princesa tava triste nesse dia",
    memoria: `
    muitu triste ela, tava taum triste que tava brava
    `,
    imagem: "images/figurinhas/29.jpeg"
},
{
    id: 30,
    nome: "Planejando a sala",
    descricao: "Tava brava que só nesse dia kskksksksks",
    memoria: `
    Skins bonitas dms, sabe quem escolheu? Minha princesaaaaaa
    `,
    imagem: "images/figurinhas/30.jpeg"
},
{
    id: 31,
    nome: "Fazendo a cozinha",
    descricao: "Incrível como meu amor tem criatividade pra fzr cada cômodo da casa",
    memoria: `
    FOFINHAAAAAAAAAAAAA
    `,
    imagem: "images/figurinhas/31.jpeg"
},
{
    id: 32,
    nome: "EU TE AMOOOOO",
    descricao: "Ta escondidu ai em algum mapa nosso ksksksks",
    memoria: `
    Eu te amo muito meu amoooooooooooorrrrrr
    `,
    imagem: "images/figurinhas/32.jpeg"
},
{
    id: 33,
    nome: "Sempre tirandu print da minha princesa",
    descricao: "Tão fofa construindu",
    memoria: `
    Será que minha rainha vai ficar brava quandu eu ficar tirandu fotu da minha fofinha fzndu as coisinhas dela? hm, esperu que naum ksksksksks
    `,
    imagem: "images/figurinhas/33.jpeg"
},
{
    id: 34,
    nome: "Mais uma print do climinha baum",
    descricao: "Tava até trovejando",
    memoria: `
    Deu um trovão no mine eu eu achei que tinha sido aq em ks kkkkkkkkkkkkkkkkk
    `,
    imagem: "images/figurinhas/34.jpeg"
},
{
    id: 35,
    nome: "Aproveitandu",
    descricao: "gosta muitu de chuva",
    memoria: `
    Essa print ficou cinema ksksksksksksks
    `,
    imagem: "images/figurinhas/35.jpeg"
},
{
    id: 36,
    nome: "S escrito com tochas",
    descricao: "S de Sabrinaaaaa",
    memoria: `
    minha rainha destruiu dps ;) na figurinha 038
    `,
    imagem: "images/figurinhas/36.jpeg"
},
{
    id: 37,
    nome: "Quarto finalizado",
    descricao: "Ficou muito bonitu amoooorrrr",
    memoria: `
    A primeira casa que fizemus ❤️❤️
    `,
    imagem: "images/figurinhas/37.jpeg"
},
{
    id: 38,
    nome: "Destruiu o S ;)",
    descricao: "fiquei tisti, nem percebeu",
    memoria: `
    eu lembru que fiquei esperandu bem alegre que minha rainha visse, mas ai meu amor destruiu e ai eu fiquei muitu tisti, mas eu entendi que foi pq minha princesa tava brava, ai naum tv com paciencia pra ficar procurandu significadu nas coisas ksk
    `,
    imagem: "images/figurinhas/38.jpeg"
},
{
    id: 39,
    nome: "Eu te amo meu amoooorr",
    descricao: "minha rainha tava pensandu em que será?",
    memoria: `
    AAAAAAA queru te abraçar muitoooooooooo
    `,
    imagem: "images/figurinhas/39.jpeg"
},
{
    id: 40,
    nome: "Ligações da minha vida 😍😍😍",
    descricao: "'Eita como dorme'",
    memoria: `
    kksksksksks eu gostu muitu quando minha rainha me liga axim ❤️❤️❤️❤️❤️❤️
    `,
    imagem: "images/figurinhas/40.jpeg"
},
{
    id: 41,
    nome: "Rostinho novo",
    descricao: "O olhinho é mais rosa",
    memoria: `
    Fofinha dmssssss
    `,
    imagem: "images/figurinhas/41.jpeg"
},
{
    id: 42,
    nome: "KKKKKKKKKKKKKKKKKKKKKK",
    descricao: "KKKKKKKKKKKKKKKKKKKKKKK",
    memoria: `
    KKKKKKKKKKKKKKKKKKKKKKKKKK muito booommm
    `,
    imagem: "images/figurinhas/42.jpeg"
},
{
    id: 43,
    nome: "Paulo tentandu desenhar",
    descricao: "Desenho que eu tentei fazer da minha princesa lindaaaa",
    memoria: `
    Eu fiquei mais desenhenhista dps desse dia tah hehehehe
    `,
    imagem: "images/figurinhas/43.jpeg"
},
{
    id: 44,
    nome: "Que decoração linda que minha rainha feeezzz",
    descricao: "Decorou sozinha",
    memoria: `
    Eu naum estava no dia ;(
    `,
    imagem: "images/figurinhas/44.jpeg"
},
{
    id: 45,
    nome: "Paulo e Sabrina",
    descricao: "Beijinhu na minha princesinhaaaa",
    memoria: `
    Minha palmeirenseeeee só minhaaaa. Vamos assistir vários jgs dos nossos times amor, vai ser legal dmssss
    `,
    imagem: "images/figurinhas/45.jpeg"
},
{
    id: 46,
    nome: "Minha rainha",
    descricao: "Achei essa fotu no google e parece muito com minha princesinhaaa",
    memoria: `
    Parece minha vida, igualzinha, toda anjinha envergonhada
    `,
    imagem: "images/figurinhas/46.jpeg"
},
{
    id: 47,
    nome: "Meu amor",
    descricao: "Fica brava todu dia quase kkkkkkkkkkkkkkk",
    memoria: `
    Atualmente minha rainha naum ta ficandu brava, issu é muitu baaaauuummm, fico muitu feliz mexmu amooorrr
    `,
    imagem: "images/figurinhas/47.jpeg"
},
{
    id: 48,
    nome: "Eita como se irrita",
    descricao: "usa que só essa figurinha, mas nunca grita assim comigu ksksksksk",
    memoria: `
    minha rainha tem que brigar comigu quandu eu tiver erradu amooooorrr
    `,
    imagem: "images/figurinhas/48.jpeg"
},
{
    id: 49,
    nome: "issu acontece bastante kkskskskss",
    descricao: "mas eu achu que naum vai acontecer muito mais kksksks ❤️❤️❤️❤️",
    memoria: `
    Minha rainha fica muitu diferente quandu ta brava ksksksksksksks, eu te amo meu amooooorrrr
    `,
    imagem: "images/figurinhas/49.jpeg"
},
{
    id: 50,
    nome: "Tela do meu celular",
    descricao: "Eu gosto de ficar olhando essa tela durante o meu dia, é muitu baum ficar vendu minha princesa, eu amu muitu",
    memoria: `
    EU TE AMOOOOOOOOOOO MUITOOOOOOOOOOO MEUUUU AMOOOOOOOORRRRR
    `,
    imagem: "images/figurinhas/50.jpeg"
},
{
    id: 51,
    nome: "A diferença é muitu grandeeee",
    descricao: "189 pra 158 nuuhhhh, Minha rainha baixinhaaaaaaaa, fofinha dmssssss, eu te amo minha bebezinhaaaaaaaaaaa",
    memoria: `
    é a unica figurinha que naum representa uma lembrança, representa todas as que ainda vamos criar
    `,
    imagem: "images/figurinhas/dourada.jpeg"
}
];


function albumCompleto(){

    return figurinhasColadas.length >= 50;

}



function atualizarInventario(){

    const inventario =
    document.getElementById("inventario");

    inventario.innerHTML = "";

    figurinhasObtidas.filter(
        id => !figurinhasColadas.includes(id)
    )
    .forEach(id => {

        const dados =
        figurinhas.find(f => f.id === id);

        const div =
        document.createElement("div");

        div.classList.add("figurinha");

        div.draggable = true;

        div.dataset.id = id;

        div.addEventListener("dragstart", (e) => {

        e.dataTransfer.setData(
            "text/plain",
            id
        );

        });

        div.addEventListener("click", () => {

    // se clicar na mesma figurinha
if(figurinhaSelecionada === id){

    figurinhaSelecionada = null;

    div.classList.remove(
        "selecionada"
    );

    document
    .querySelectorAll(".espaco")
    .forEach(e => {

        e.classList.remove(
            "espaco-piscando"
        );

    });

    return;
}

        document
        .querySelectorAll(".figurinha")
        .forEach(f => {

            f.classList.remove(
                "selecionada"
            );

            });

            div.classList.add(
                "selecionada"
            );

            figurinhaSelecionada = id;

            document
            .querySelectorAll(".espaco")
            .forEach(e => {

                e.classList.add(
                    "espaco-piscando"
                );

            });

        

        });

        div.innerHTML = `
        <span class="numero-figurinha">
            #${String(id).padStart(3,"0")}
        </span>

        <img src="${dados.imagem}">
        `;

        inventario.appendChild(div);

    });
    atualizarProgresso();
    salvar();
}

function atualizarProgresso(){

    const total = 51;

    const atual =
    figurinhasColadas.length;

    const porcentagem =
    (atual / total) * 100;

    document.getElementById(
        "barraProgresso"
    ).style.width =
    porcentagem + "%";

    document.getElementById(
        "textoProgresso"
    ).textContent =
    `${atual}/${total} figurinhas`;
}


function abrirMemoria(id){

    const figurinha =
    figurinhas.find(
        f => f.id === id
    );

    document.getElementById(
        "fotoMemoria"
    ).src =
    figurinha.imagem;

    document.getElementById(
        "tituloMemoria"
    ).textContent =
    figurinha.nome;

    document.getElementById(
        "textoMemoria"
    ).textContent =
    figurinha.memoria;

    document.getElementById(
        "modalMemoria"
    ).style.display =
    "flex";

}

// fechar a memória
document
.getElementById(
    "fecharMemoria"
)
.addEventListener(
    "click",
    () => {

        document.getElementById(
            "modalMemoria"
        ).style.display =
        "none";

    }
);

function abrirCartaFinal(){

    document.getElementById(
        "modalCarta"
    ).style.display =
    "flex";

}
// receber dourada
document
.getElementById("receberDourada")
.addEventListener(
    "click",
    () => {

        if(
            !figurinhasObtidas.includes(51)
        ){

            figurinhasObtidas.push(51);

            salvar();
            atualizarInventario();

        }

        document.getElementById(
            "modalCarta"
        ).style.display =
        "none";

        criarAlbum();

    }
);
// fechar carta final
document
.getElementById(
    "fecharCarta"
)
.addEventListener(
    "click",
    () => {

        document.getElementById(
            "modalCarta"
        ).style.display =
        "none";

    }
);

/*function verificarFigurinhaDourada(){

    console.log(
        "Executando verificarFigurinhaDourada"
    );

    console.log(
        "Coladas:",
        figurinhasColadas.length
    );

    console.log(
        "Obtidas:",
        figurinhasObtidas
    );

    if(
        figurinhasColadas.length >= 50 &&
        !figurinhasObtidas.includes(51)
    ){

        console.log(
            "LIBERANDO DOURADA"
        );

        figurinhasObtidas.push(51);

        alert(
            "⭐ Você desbloqueou a Figurinha Dourada! ⭐"
        );

        salvar();

        atualizarInventario();

    }

}*/




// resetar o álbum, adicionar button com o id resetar no HTML
/*document
.getElementById("resetar")
.addEventListener("click", () => {

    if(confirm("Tem certeza?")){

        localStorage.clear();
        location.reload();

    }

});*/


carregar();
criarPacotes();
criarAlbum();
atualizarInventario();