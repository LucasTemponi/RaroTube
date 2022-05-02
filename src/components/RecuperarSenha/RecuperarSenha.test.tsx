import { render, screen } from "@testing-library/react";
import { RecuperarSenha } from "./RecuperarSenha";
import { MemoryRouter as Router } from 'react-router-dom';
import { setValorInput } from "../../helpers/testes/setValorInput";
import apiClient from "../../services/api-client";


const makeSut = () => {
    return render(
        <Router>
            <RecuperarSenha />
        </Router>
    );
}
describe('Página - Alterar Senha', () => {
    beforeEach(jest.clearAllMocks);
    beforeEach(makeSut);

    let input: HTMLElement;
    beforeEach(() => {
        input = screen.getByPlaceholderText('Nova Senha');
    });

    describe('Valida a rotina de alteração de senha', () => {
        let input: HTMLElement;
        let inputSecundario: HTMLElement;
        beforeEach(() => {
            input = screen.getByPlaceholderText('Nova Senha');
            inputSecundario = screen.getByPlaceholderText('Confirmar Senha');
        });

        it('deve garantir que a Nova Senha e a sua confirmação sejam iguais', async () => {
            // setup
            const codigo = screen.getByPlaceholderText('Código de Recuperação');
            const novaSenha = "12345";
            const senhaConfirmacao = "12345458";
            const mensagemDeValidacao = 'Senhas não conferem';
            const botao = screen.getByText('Alterar');

            // construcao
            setValorInput(codigo, 'abcd');
            setValorInput(input, novaSenha);
            setValorInput(inputSecundario, senhaConfirmacao);
            botao.click();

            expect(await screen.findByText(mensagemDeValidacao)).toBeInTheDocument()
        });

        it('deve notificar ao usuário que a senha foi alterada', async () => {
            // setup
            jest.spyOn(apiClient, 'patch').mockResolvedValue({
                data: {
                    statusCode: 200
                }
            });
            const codigo = screen.getByPlaceholderText('Código de Recuperação');
            const novaSenha = screen.getByPlaceholderText('Nova Senha');
            const senhaConfirmacao = screen.getByPlaceholderText('Confirmar Senha');
            const botao = screen.getByText('Alterar');
            const dados = {
                codigo: 'abcd',
                novaSenha: '12345',
            };

            // construcao
            setValorInput(codigo, dados.codigo);
            setValorInput(novaSenha, dados.novaSenha);
            setValorInput(senhaConfirmacao, dados.novaSenha);
            botao.click();

            // asserts
            expect(apiClient.patch).toHaveBeenCalledWith(
                expect.stringContaining('/auth/recuperar-senha'),
                dados
            );
            expect(await screen.findByText('Senha Alterada com sucesso!')).toBeInTheDocument()
        });


    })

})


