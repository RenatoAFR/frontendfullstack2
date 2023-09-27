import Pagina from "../templates/Pagina";
import FormTurma from "../formularios/FormTurma";
import TabelaTurmas from "../tabelas/TabelaTurmas";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBase } from "../assets/definicoes1";

export default function TelaCadTurma(props) {
    const [turma, setTurmas] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [turmaEmEdicao, setTurmaEdicao] = useState({
        Professor: '',
        Curso: '',
        Data: '',
        Hora: '',
        QtdAlunos: '',
        TipoDeAula: '',
    })

    function edicaoTurma(turma) {
        setAtualizando(true);
        setTurmaEdicao(turma);
        setExibirTabela(false);
        setModoEdicao(true);
    }
    
    function apagarTurma(turma) {
        fetch(urlBase + "https://129.146.68.51/aluno38-pfsii/turmas", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(turma)
        }).then((resposta) => {
            return resposta.json();
        }).then((retorno) => {
            if (retorno.mensagem) {
                alert("Turma excluída");
                setExibirTabela(true);
                window.location.reload();
            }
            else {
                alert("Não foi possível excluir")

            }
        })
    }

    useEffect(() => {
        fetch(urlBase + "https://129.146.68.51/aluno38-pfsii/turmas", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setTurmas(dados);
            } 
            else {

            }
        });
    }, []);

    return (
        <Pagina>
            <Container className="border m-6">
                <Alert variant={"secondary"} className="text-center m-3">
                    <font size="6"><strong>Cadastro de Turmas</strong></font></Alert>
                {
                    exibirTabela ?
                        <TabelaTurmas
                            listaTurmas={turma}
                            setTurmas={setTurmas}
                            exibirTabela={setExibirTabela}
                            editarTurma={edicaoTurma}
                            excluirTurma={apagarTurma}
                            setModoEdicao={setModoEdicao}
                            edicaoTurma={setTurmaEdicao} />
                        :
                        <FormTurma
                            listaTurmas={turma}
                            setTurmas={setTurmas}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            atualizando={atualizando}
                            turma={turmaEmEdicao}
                            edicaoTurma={setModoEdicao} />
                }
            </Container>
        </Pagina>
    );
}