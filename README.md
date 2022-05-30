# ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)


#  Raro Tube

Projeto final do curso de React da Raro Academy.

O Raro Tube é um portal de vídeos exclusivo da Raro Academy, que tem como principal objetivo facilitar o acesso dos alunos aos materiais em vídeo que são produzidos ao longo dos cursos da Academy. O desenvolvimento dessa plataforma trás diversas vantagens como a possibilidade de organizar o conteúdo de forma mais eficiente, permitir aos alunos criarem uma lista com seus vídeos favoritos, bem como promover uma maior interação entre os alunos através das curtidas e comentários nos vídeos.
&nbsp;

##  **Funcionalidades**

### Layout
O layout base do app é subdividido em:
- Header ;
- Menu (autenticado e não autenticado);
- Lista de vídeos.

### Home (não autenticada)
Nessa sessão é possível:
- Acessar a Lista de videos públicos e visualiza-los;
- Visualizar comentários feitos por usuários autenticados;
- Fazer login utilizando o botão 'Login' localizado no canto superior direito no header;
- Fazer um cadastro utilizando o botão 'Cadastre-se' localizado ao lado do botão de login;
- Acessar o menu através do botão no canto superior esquerdo e obter mais informações sobre as próximas turmas disponíveis da Raro Academy. 

### Página de Cadastro
Realiza a inscrição do aluno da plataforma através dos dados:
- Nome;
- Senha;
- Código de Acesso.

### Página de login
- Realiza a autenticação do usuário através do seu email e senha;
- Possibilita alterar a senha através do link 'Esqueci minha senha';

### Home autenticada
Contém:
- Lista de vídeos favoritos do usuário;
- Lista de vídeos recentes;
- Lista de vídeos recomendados;
- Botão dropdown de ações com o usuário (alterar senha, sair);
- Menu com os vídeos das aulas separados por semanas. 

### Exibição do conteúdo
- Player de Visulização do vídeo;
- Timestamp;
- Reprodução do próximo vídeo automática;
- Lista de vídeos sugeridos;
- Botão para favoritar vídeo;
- Adicionar, Curtir ou descurtir um comentário;
- Responder, editar ou excluir um comentário já existente.

### Navegação 
- Sistema de rotas para as páginas específicas;
- Página de rota não identificada (404 -  Not Found)

&nbsp;
 
##  **Instalando e executando o projeto**

Clonar o projeto

```bash
git clone https://github.com/rarolabs/raro-academy-react-grupo-3 
 ```

Acesse a pasta do projeto no terminal/cmd
 ```bash
cd raro-academy-react-grupo-3
  ```


Instalar dependências 

```bash
npm install
 ```

Execute a aplicação em modo de desenvolvimento

 ```bash
npm start
 ```
&nbsp;

 ##  **Tecnologias**

- [TypeScript](https://www.npmjs.com/package/typescript)
- [React](https://www.npmjs.com/package/react)
- [Tailwind](https://tailwindcss.com)
- [Axios](https://www.npmjs.com/package/axios)
- [Zustand](https://www.npmjs.com/package/zustand)

## **Desenvolvimento**

- [Cássia Luísa](https://github.com/cassialuisa)
- [Laysa Viana](https://github.com/LaysaViana)
- [Lucas Temponi](https://github.com/LucasTemponi)
- [MaurÍcio Silva](https://github.com/msb07)


