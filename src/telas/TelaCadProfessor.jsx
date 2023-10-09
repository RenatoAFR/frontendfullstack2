import Pagina from "../templates/Pagina";
import FormProfessor from "../formularios/FormProfessor";
import TabelaProfessores from "../tabelas/TabelaProfessor";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBase } from "../assets/definicoes1";

export default function TelaCadProfessor(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [professores, setProfessores] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [professorEmEdicao, setProfessorEdicao] = useState({
        ID: '',
        cpf: '',
        nome: '',
        tel: '',
        email: '',
        curso: '',
    })

    function edicaoProfessor(professor) {
        setAtualizando(true);
        setProfessorEdicao(professor);
        setExibirTabela(false);
        setModoEdicao(true);
    }

    function apagarProfessor(professor) {
        fetch(urlBase +"http://129.146.68.51/aluno38-pfsii/professor", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(professor)
        }).then((resposta) => {
            return resposta.json();
        }).then((retorno) => {
            if (retorno.mensagem) {
                alert("Professor excluído");
                setExibirTabela(true);
                window.location.reload();
            }
            else {
                alert("Não foi possível excluir")
                
            }
        })
    }

    useEffect(() => {
        fetch(urlBase + "https://129.146.68.51/aluno38-pfsii/professor", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setProfessores(dados);
            }
            else {

            }
        });
    }, []);

    return(
        <Pagina>
            <Container className="border m-6">
                <Alert variant={"secondary"} className="text-center m-3">
                    <font size="6"><strong>Cadastro de Professor</strong></font></Alert>
                {
                    exibirTabela ?
                        <TabelaProfessores 
                            listaProfessores={professores}
                            setProfessores={setProfessores}
                            exibirTabela={setExibirTabela}
                            editarProfessor={edicaoProfessor}
                            excluirProfessor={apagarProfessor}
                            setModoEdicao={setModoEdicao}
                            edicaoProfessor={setProfessorEdicao} />
                        :
                        <FormProfessor 
                            listaProfessores={professores}
                            setProfessores={setProfessores}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            atualizando={atualizando}
                            professor={professorEmEdicao}
                            edicaoProfessor={setModoEdicao} />
                }
            </Container>
        </Pagina>
    );
}