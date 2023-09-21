import { useState } from "react";
import { Button, Form, Row, Col, Container, FormLabel, FormControl } from "react-bootstrap"
import React from "react";
import { urlBase } from "../assets/definicoes1";
import SelectionBox from "../componentes/busca/CaixaSelecao";

const boxcad_style = {
    padding: '2px',
    borderRadius: '10px',
    border: '2px solid black',
    width: '380px'
}

const boxcadall_style = {
    padding: '5px',
    borderRadius: '10px',
    border: '3px solid black',
    height: '315px'
}


export default function FormProfessor(props) {
    const [validado, setValidado] = useState(false);
    const [professor, setProfessor] = useState(props.professor);
    const [cursoSelect, setCursoSelecionado] = useState({});

    function manipulaMudanca(e) {
        const elementForm = e.currentTarget;
        const id = elementForm.id;
        const valor = elementForm.value;
        setProfessor({ ...professor, [id]: valor });
    }

    function manipulaSbmissao(evento) {
        const form = evento.currentTarget;
        console.log(cursoSelect)
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                fetch(urlBase + "https://129.146.68.51/aluno38-pfsii/professor", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cursoSelect)
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
                        let professores = props.listaProfessores;
                        professores.push(professor);
                        props.exibirTabela(true);
                        window.location.reload();
                    }
                    window.alert(dados.mensagem);
                }).catch((erro) => {
                    window.alert("Erro ao executar a requisição: " + erro.message);
                })
            }
            else {

                fetch(urlBase + "https://129.146.68.51/aluno38-pfsii/professor", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cursoSelect)
                }).then(() => {
                    props.setModoEdicao(false);
                    alert("Atualizado com sucesso!");
                    props.exibirTabela(true);
                }).then(() => {
                    window.location.reload();

                });
            }
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }



    return (
        <div style={boxcadall_style}>
            <Container className="text-center" style={boxcad_style}>
                <h3>CADASTRO DE PROFESSOR</h3>
            </Container>
            <Form noValidate validated={validado} onSubmit={manipulaSbmissao}>
                <Row>
                    <Col>
                        <FormLabel>ID</FormLabel>
                        <FormControl
                            disabled
                            value={professor.ID}
                            id="ID"
                        >
                        </FormControl>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>CPF</strong></Form.Label>
                            <Form.Control type="text" placeholder="000.000.000-00" required value={professor.cpf} id="cpf" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid"> Por Favor Informe o CPF</Form.Control.Feedback>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Nome do Professor</strong></Form.Label>
                            <Form.Control type="text" placeholder="Nome do Professor" required value={professor.nome} id="nome" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid"> Por Favor Informe o Nome Completo</Form.Control.Feedback>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Telefone</strong></Form.Label>
                            <Form.Control type="text" placeholder="(00) 00000-0000" required value={professor.tel} id="tel" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid"> Por Favor Informe o Telefone</Form.Control.Feedback>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>E-Mail</strong></Form.Label>
                            <Form.Control type="text" placeholder="unoeste@gmail.com" required value={professor.email} id="email" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid"> Por Favor Informe o E-Mail</Form.Control.Feedback>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Curso</strong></Form.Label>
                            <SelectionBox
                                source={"https://129.146.68.51/aluno38-pfsii/curso/"}
                                dataKey={"ID"}
                                exhibitionField={"curso"}
                                selectFunction={setCursoSelecionado}
                                professor={professor}
                                cursoSelect={cursoSelect}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <center><Col>
                        <Button type="submit" variant="primary">{props.modoEdicao ? 'Atualizar' : 'Cadastrar'}</Button>
                    </Col>
                        <Col>
                            <Button type="submit" variant="primary" onClick={() => {
                                props.exibirTabela(true);
                            }}>Voltar</Button>
                        </Col></center>
                </Row>
            </Form>
        </div>
    );
}