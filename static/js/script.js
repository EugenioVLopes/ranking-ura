// var url_base = "http://127.0.0.1:3000"
var url_base = "https://uranaggcon23.onrender.com/"

const names = document.querySelectorAll("[data-name]");
const value = document.querySelectorAll("[data-time]");
const namePodium = document.querySelectorAll("[data-name-podium]");
const valuePodium = document.querySelectorAll("[data-time-podium]");

let competidor_clicado_id = '';

async function get_ranking() {
  try {
    const response = await fetch(url_base + "/api/competidores");
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }

    const competidores = await response.json();

    console.log(competidores);

    const iterations = competidores.length > names.length ? names.length : competidores.length;

    for (let i = 0; i < iterations; i++) {
      names[i].innerHTML = competidores[i].nome;
      value[i].innerHTML = competidores[i].tempo  + " s";

      if (i < namePodium.length && i < valuePodium.length) {
        namePodium[i].innerHTML = competidores[i].nome;
        valuePodium[i].innerHTML = competidores[i].tempo + " s";
      }
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

get_ranking();

async function get_ranking_tabela() {
  try {
    const response = await fetch(url_base + "/api/competidores");
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }

    const competidores = await response.json();

    console.log(competidores);

    // Pegando tabela com jquery e adicionando
    const table = $('#tabela-competidores').DataTable();

    competidores.forEach(competidor => {

      detalhar_competidor = `
                                <a 
                                    class = "btn btn-outline-success" 
                                    onclick = "alterarModalCompetidor('${competidor._id}')" 
                                    data-bs-toggle = "modal" 
                                    data-bs-target = "#exampleModalCenter">
                                    <i class = "fa-solid fa-magnifying-glass fa-2xs"></i>
                                </a>
                                `;

      competidor_nome = `<h6 class="mt-2">${competidor.nome}</h6>`;
      competidor_email = `<h6 class="mt-2">${competidor.email}</h6>`;
      competidor_tempo = `<h6 class="mt-2">${competidor.tempo}</h6>`;


      table.row.add([detalhar_competidor, competidor_nome, competidor_email, competidor_tempo]).draw();
      
    });
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

async function adicionarCompetidor() {
  let nome = document.getElementById('nome').value;
  let email = document.getElementById('email').value;
  let telefone = document.getElementById('telefone').value;
  let tempo = Number(document.getElementById('tempo').value);

  if (nome == "" || email == "" || telefone == "" || tempo == "") {
    return "Campos obrigatórios em branco";
  }

  const validado_competidor = {
    "nome": nome,
    "email": email,
    "telefone": telefone,
    "tempo": tempo
  };

  // Transformando o objeto em JSON
  const competidorJSON = JSON.stringify(validado_competidor);

  try {
    const response_competidor = await fetch(url_base + '/api/competidor/add', {
      method: "POST",
      body: competidorJSON,
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response_competidor.ok) {
      const competidor_adicionado = await response_competidor.json();
      console.log(competidor_adicionado);
      alert("Competidor adicionado com sucesso!")
      window.location.href = "cadastro.html";
    } else {
      console.error("Erro ao adicionar o competidor à API.");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao enviar a solicitação:", error);
  }
}

async function alterarModalCompetidor(competidor_id){
  //Competidor
  let nome = document.getElementById('nome_modal');
  let email = document.getElementById('email_modal');
  let telefone = document.getElementById('tel_modal');
  let tempo = document.getElementById('tempo_modal');

  competidor_clicado_id = competidor_id

  fetch(url_base + "/api/competidores/" + competidor_id.toString())
      .then(response => response.json())
      .then(competidor => { 

        console.log(competidor)

        nome.innerHTML = competidor.nome;
        email.innerHTML = competidor.email; 
        telefone.innerHTML = competidor.telefone; 
        tempo.innerHTML = `<i class="fa-solid fa-clock"></i> ${competidor.tempo}s`;
        
    })
      .catch(error => {
          console.error('Erro na requisição:', error);
      });
  
}

async function deletar_competidor(){
  
  let deletar_competidor = {
    "_id" : competidor_clicado_id,
  }

  deletar_competidor = JSON.stringify(deletar_competidor);

  try {
    await fetch(url_base + '/api/competidor', {
      method: "DELETE",
      body: deletar_competidor,
      headers: {
        "Content-type": "application/json",
      },
    });

    location.reload()

  } catch (error) {
    console.error("Ocorreu um erro ao enviar a solicitação:", error);
  }
}

async function alterar_tempo(){

  let novo_tempo = document.getElementById('novo_tempo').value.trim();

  let erro = document.getElementById('erro')

  if(novo_tempo == '' ){
    return erro.innerHTML = ` <div class="alert alert-danger" role="alert">
                                Insira um valor!
                              </div>`
  }

  let put_tempo = {
    "_id" : competidor_clicado_id,
    "tempo": parseInt(novo_tempo)
  }

  put_tempo = JSON.stringify(put_tempo);

  try {
    await fetch(url_base + '/api/competidor', {
      method: "PUT",
      body: put_tempo,
      headers: {
        "Content-type": "application/json",
      },
    });

    location.reload()

  } catch (error) {
    console.error("Ocorreu um erro ao enviar a solicitação:", error);
  }
}

function view_novo_tempo(){
  
  let div_alterar = document.getElementById('alterar_input');
  div_alterar.classList.remove('hide');

  let div_botoes = document.getElementById('botoes');
  div_botoes.innerHTML = `
              <button class="btn btn-outline-primary col-6" disabled>
                <i class="fa-solid fa-sliders mr-3"></i>
                Alterar tempo
              </button>
              <button class="btn btn-outline-danger col-6" id="deletar" style="margin-left: 5px;" onclick="deletar_competidor()">
                <i class="fa-solid fa-user-minus mr-3"></i>
                Excluir competidor
              </button>`

}