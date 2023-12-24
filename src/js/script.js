const chaveDaApi = "208c9404b8344a32a5c63805232412";
const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;

    if (!cidade) return;

    try {
        const dados = await buscarDadosDaCidade(cidade);

        if (dados) {
            preencherDadosNaTela(dados, cidade);
        }
    } catch (error) {
        console.error("Erro ao buscar dados da cidade:", error);
    }
});

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

    const resposta = await fetch(apiUrl);

    if (!resposta.ok) {
        throw new Error(`Erro na requisição: ${resposta.status}`);
    }

    const dados = await resposta.json();
    return dados;
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const humidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    const iconeCondicaoElement = document.getElementById("icone-condicao");
    if (iconeCondicaoElement) {
        iconeCondicaoElement.setAttribute("src", `https:${iconeCondicao}`);
    }

    document.getElementById("cidade").textContent = cidade;
    document.getElementById("temperatura").textContent = `${temperatura} °C`;
    document.getElementById("condicao").textContent = condicao;
    document.getElementById("humidade").textContent = `${humidade}%`;
    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento}km/h`;
}