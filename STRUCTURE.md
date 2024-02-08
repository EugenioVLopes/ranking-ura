# Entendendo decisões arquiteturais e a estrutura do projeto

## Requisitos para rodar o projeto

### Setup do ambiente para uma aplicação Flask:

- [Python](https://www.python.org/downloads/)
  - Certifique-se de ter o Python instalado em sua máquina.
- [Flask](https://flask.palletsprojects.com/en/2.0.x/installation/)
  - Instale o Flask usando o gerenciador de pacotes do Python, como o pip.
- [Virtualenv](https://virtualenv.pypa.io/en/latest/installation.html)
  - Crie um ambiente virtual para isolar as dependências do projeto.

### Como rodar na minha máquina?

- Clone o projeto `git clone "link"`
- Navegue até o diretório do projeto `cd ranking-ura`
- Crie um ambiente virtual `python -m venv venv`
- Ative o ambiente virtual:
  - No Windows: `venv\Scripts\activate`
  - No macOS/Linux: `source venv/bin/activate`
- Instale as dependências `pip install -r requirements.txt`
- Execute o projeto `python app.py`
- Pronto 🎉

### Estrutura do projeto

- `./app.py`: É o arquivo principal da aplicação Flask, responsável por configurar as rotas e iniciar o servidor.
- `./templates`: Contém os templates HTML usados para renderizar as páginas da aplicação.
- `./static`: Diretório para arquivos estáticos, como imagens, CSS e JavaScript.
- `./routes`: Define as rotas da aplicação Flask, especificando as funções que serão executadas para cada rota.

## API em Flask

> A API em Flask é responsável por fornecer os endpoints para interação com o sistema.
> É recomendado utilizar a API apenas em ambientes de desenvolvimento e não em produção.

### Como usar uma API em Flask?

- Para utilizar uma API em Flask, siga os seguintes passos:
  1. Após clonar o projeto, navegue até o diretório do projeto usando o comando `cd ranking-ura`.
  2. Crie um ambiente virtual para isolar as dependências do projeto usando o comando `python -m venv venv`.
  3. Ative o ambiente virtual:
     - No Windows: `venv\Scripts\activate`
     - No macOS/Linux: `source venv/bin/activate`
  4. Instale as dependências do projeto usando o comando `pip install -r requirements.txt`.
  5. Execute o projeto usando o comando `python app.py`.
  6. Agora você pode fazer chamadas para os endpoints da API e interagir com o sistema.
- Lembre-se de utilizar a API apenas em ambientes de desenvolvimento e não em produção.