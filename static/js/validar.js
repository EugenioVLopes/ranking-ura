const usuarios = [
  {
    login: "ura",
    pass: "uravoluntario",
  },
  {
    login: "eugenio",
    pass: "eugenio",
  },
  {
    login: "admin",
    pass: "admin123456",
  },
];

let botao = document.getElementById("btn-login");

botao.addEventListener("click", function logar() {
  let reqUsuario = document.getElementById("usuario").value;
  let reqSenha = document.getElementById("senha").value;
  let validaLogin = false;

  for (let i in usuarios) {
    if (reqUsuario === usuarios[i].login && reqSenha === usuarios[i].pass) {
      validaLogin = true;
      break;
    }
  }
  if (validaLogin == true) {
    location.href="cadastrovalidado";
  } else {
    alert("Usuário ou senha inválido");
  }
});
