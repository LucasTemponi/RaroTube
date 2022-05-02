import { render, screen } from "@testing-library/react";
import { setValorInput } from "../../helpers/testes/setValorInput";
import { Cadastro } from "./Cadastro";
import { MemoryRouter as Router } from 'react-router-dom';
import apiClient from "../../services/api-client";


const makeSut = () => {
    return render(
        <Router>
            <Cadastro />
        </Router>
    );
  }
  describe('Cadastro Page', () => {
    beforeEach(jest.clearAllMocks);
    beforeEach(makeSut);

    let input: HTMLElement;
    beforeEach(() => {
      input = screen.getByPlaceholderText('Senha');
    });

    describe('deve validar a rotina de cadastro', () => {
    
        let input: HTMLElement;
        let inputSecundario: HTMLElement;
        beforeEach(() => {
          input = screen.getByPlaceholderText('Senha');
          inputSecundario = screen.getByPlaceholderText('Confirme sua senha');
        });
    
        it('deve garantir que a senha digitada e a confirmação sejam iguais', async () => {
          // setup
          
          const nome = screen.getByPlaceholderText('Nome');
          const email = screen.getByPlaceholderText('email');
          const senha = "Teste01@1234";
          const senhaConfirmacao = "Teste01@";
          const mensagemDeValidacao = 'As senhas não são iguais.';
          const botao = screen.getByText('Cadastrar');
          const codigoAcesso = screen.getByPlaceholderText('Código de Acesso');
        
          // construcao
          setValorInput(nome, 'teste');
          setValorInput(email, 'teste@raro.com');
          setValorInput(input, senha);
          setValorInput(inputSecundario, senhaConfirmacao);
          setValorInput(codigoAcesso, '1234');
          botao.click();
        //   const validacao = screen.queryByText(mensagemDeValidacao);
          expect(await screen.findByText(mensagemDeValidacao)).toBeInTheDocument()
        });
        
        it('deve notificar ao usuário que o cadastro foi efetuado com sucesso', async () => {
            // setup
            jest.spyOn(apiClient, 'post').mockResolvedValue({
                data: {
                    statusCode: 200
                }
            });
            const nome = screen.getByPlaceholderText('Nome');
            const email = screen.getByPlaceholderText('email');
            const senha = screen.getByPlaceholderText('Senha');
            const confirmacaoSenha = screen.getByPlaceholderText('Confirme sua senha');
            const codigoAcesso = screen.getByPlaceholderText('Código de Acesso');
            const botao = screen.getByText('Cadastrar');
            const dados = {
              nome:'testeNome',
              email: 'email@teste.com',
              senha: 'S3nh@!123',
              codigoAcesso: '123456',
            };
        
            // construcao
            setValorInput(nome, dados.nome);
            setValorInput(email, dados.email);
            setValorInput(senha, dados.senha);
            setValorInput(confirmacaoSenha, dados.senha);
            setValorInput(codigoAcesso, dados.codigoAcesso);
            botao.click();
        
            // asserts
            expect(apiClient.post).toHaveBeenCalledWith(
              expect.stringContaining('/auth/cadastrar'),
              dados
            );
            expect(await screen.findByText('Cadastro realizado com sucesso!')).toBeInTheDocument()
          });

          it('deve notificar ao usuário que houve um erro na tentativa de cadastro', async () => {
            // setup
            jest.spyOn(apiClient, 'post').mockResolvedValue({
                data: {
                    statusCode: 400
                }
            });
            const nome = screen.getByPlaceholderText('Nome');
            const email = screen.getByPlaceholderText('email');
            const senha = screen.getByPlaceholderText('Senha');
            const confirmacaoSenha = screen.getByPlaceholderText('Confirme sua senha');
            const codigoAcesso = screen.getByPlaceholderText('Código de Acesso');
            const botao = screen.getByText('Cadastrar');
            const dados = {
              nome:'testeNome',
              email: 'email@teste.com',
              senha: 'S3nh@!123',
              codigoAcesso: '123456',
            };
        
            // construcao
            setValorInput(nome, dados.nome);
            setValorInput(email, dados.email);
            setValorInput(senha, dados.senha);
            setValorInput(confirmacaoSenha, dados.senha);
            setValorInput(codigoAcesso, dados.codigoAcesso);
            botao.click();
        
            // asserts
            expect(apiClient.post).toHaveBeenCalledWith(
              expect.stringContaining('/auth/cadastrar'),
              dados
            );
          });

    
      });
  });    