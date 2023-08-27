import { Container, Form } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

import BarraBusca from "../componentes/busca/BarraBusca";
import { useState, useEffect } from "react";




export default function Pagina(props) {

    const [professorSelecionado, setProfessorSelecionado] = useState({});
    const [formValido, setFormValido] = useState(false);
    const [listaProfessores, setListaProfessores] = useState([]);

    useEffect(() => {
        fetch("http://129.146.68.51/aluno38-pfsii/professor", { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaProfessores(dados);
            });
    })



    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            setFormValido(true);
        }
        else {
            setFormValido(false);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <>
            
            <Cabecalho texto="Central de Gerenciamento" />
            <Menu />
            <BarraBusca placeHolder={'Informe o nome do Professor'}
                dados={listaProfessores}
                campoChave={"cpf"}
                campoBusca={"nome"}
                funcaoSelecao={setProfessorSelecionado}
                valor={""} />
                <Form noValidate validated={formValido} onSubmit={manipularSubmissao}></Form>
            <Container>{props.children}</Container>
        </>
    );

}