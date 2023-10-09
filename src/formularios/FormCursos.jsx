import { useState } from "react";
import { Button, Form, Row, Col, Container, FormLabel, FormControl } from "react-bootstrap"
import React from "react";

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
    height: '325px'
}


export default function FormCursos(props) {
    const [validado, setValidado] = useState(false);
    const [curso, setCurso] = useState(props.curso);

    function manipulaMudanca(e) {
        const elementForm = e.currentTarget;
        const id = elementForm.id;
        const valor = elementForm.value;
        setCurso({ ...curso, [id]: valor });
    }

    function manipulaSbmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                fetch("https://129.146.68.51/aluno38-pfsii/curso", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(curso)
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
                        let cursos = props.listaCursos;
                        cursos.push(curso);
                        props.exibirTabela(true);
                        window.location.reload();
                    }
                    window.alert(dados.mensagem);
                }).catch((erro) => {
                    window.alert("Erro ao executar a requisição: " + erro.message);
                })
            }
            else {

                fetch("https://129.146.68.51/aluno38-pfsii/curso", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(curso)
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
                <h3>CADASTRO DE CURSOS</h3>
            </Container>
            <Form noValidate validated={validado} onSubmit={manipulaSbmissao}>
                <Row>
                    <Col>
                        <FormLabel>ID</FormLabel>
                        <FormControl
                            disabled
                            value={curso.ID}
                            id="ID"
                        >
                        </FormControl>
                    </Col>

                </Row>

                <Row>

                <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Curso</strong></Form.Label>
                            <Form.Control type="text" placeholder="Digite o Nome do Curso" required value={curso.curso} id="curso" onChange={manipulaMudanca} />
                            <Form.Control.Feedback type="invalid"> Por Favor Informe o Curso</Form.Control.Feedback>
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