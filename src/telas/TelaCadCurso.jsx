import Pagina from "../templates/Pagina";
import FormCursos from "../formularios/FormCursos";
import TabelaCursos from "../tabelas/TabelaCurso";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";

export default function TelaCadCurso(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [cursos, setCursos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [cursoEmEdicao, setCursoEdicao] = useState({
        ID: '',
        curso: '',
    })

    function edicaoCurso(curso) {
        setAtualizando(true);
        setCursoEdicao(curso);
        setExibirTabela(false);
        setModoEdicao(true);
    }

    function apagarCurso(curso) {
        fetch("https://129.146.68.51/aluno38-pfsii/curso", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(curso)
        }).then((resposta) => {
            return resposta.json();
        }).then((retorno) => {
            if (retorno.mensagem) {
                alert("Curso excluído");
                setExibirTabela(true);
                window.location.reload();
            }
            else {
                alert("Não foi possível excluir")

            }
        })
    }

    useEffect(() => {
        fetch("https://129.146.68.51/aluno38-pfsii/curso", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setCursos(dados);
            } 
            else {

            }
        });
    }, []);

    return (
        <Pagina>
            <Container className="border m-6">
                <Alert variant={"secondary"} className="text-center m-3">
                    <font size="6"><strong>Cadastro de Cursos</strong></font></Alert>
                {
                    exibirTabela ?
                        <TabelaCursos
                            listaCursos={cursos}
                            setCursos={setCursos}
                            exibirTabela={setExibirTabela}
                            editarCurso={edicaoCurso}
                            excluirCurso={apagarCurso}
                            setModoEdicao={setModoEdicao}
                            edicaoCurso={setCursoEdicao} />
                        :
                        <FormCursos
                            listaCursos={cursos}
                            setCursos={setCursos}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            atualizando={atualizando}
                            curso={cursoEmEdicao}
                            edicaoCurso={setModoEdicao} />
                }
            </Container>
        </Pagina>
    );
}