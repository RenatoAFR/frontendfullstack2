import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap"
import React from "react";
import { urlBase } from "../assets/definicoes1";
import BarraBusca from "../componentes/busca/BarraBusca";

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
    height: '475px'
}

export default function FormTurma(props) {
    const [validado, setValidado] = useState(false);
    const [turma, setTurma] = useState(props.turma);


    function manipulaMudanca(e) {
        const elementForm = e.currentTarget;
        const id = elementForm.id;
        const valor = elementForm.value;
        setTurma({ ...turma, [id]: valor });
    }

    function manipulaSbmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            const nome = {
                cpf: professorSelecionado.cpf,
                nome: professorSelecionado.nome,
            };

            if (props.modoEdicao) {
                fetch(urlBase + "https://129.146.68.51/aluno38-pfsii/turmas", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(turma)
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
                        let turmas = props.listaTurmas;
                        turmas.push(turma);
                        props.exibirTabela(true);
                        window.location.reload();
                    }
                    window.alert(dados.mensagem);
                }).catch((erro) => {
                    window.alert("Erro ao executar a requisição: " + erro.message);
                })
            }
            else {

                fetch(urlBase + "https://129.146.68.51/aluno38-pfsii/turmas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(turma)
                }).then(() => {
                    props.setModoEdicao(false);
                    alert("Turma Gravada com Sucesso!");
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

    const [professorSelecionado, setProfessorSelecionado] = useState({});
    const [listaProfessores, setListaProfessores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(urlBase + "https://129.146.68.51/aluno38-pfsii/professor", { method: "GET" });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Data from API:", data);
                setListaProfessores(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);



    return (
        <div style={boxcadall_style}>
            <Container className="text-center" style={boxcad_style}>
                <h3>CADASTRO DE TURMAS</h3>
            </Container>
            <Form noValidate validated={validado} onSubmit={manipulaSbmissao}>

                <Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Professor:</Form.Label>
                        {}
                        <BarraBusca
                            placeHolder={"Informe um Professor"}
                            dados={listaProfessores}
                            campoChave={"cpf"}
                            campoBusca={"nome"}
                            funcaoSelecao={(professorSelecionado) => {
                                setProfessorSelecionado(professorSelecionado);
                                setTurma({ ...turma, nome: professorSelecionado });
                            }}
                            valor={""}
                        />
                        { console.log(listaProfessores) }
                        <Form.Control.Feedback type="invalid">
                            Por favor, insira o nome do Professor!
                        </Form.Control.Feedback>

                        <Form.Control
                            type="text"
                            placeholder="Nome do Professor"
                            value={professorSelecionado?.nome || ""}
                            onChange={(e) => {

                            }}
                        />

                    </Form.Group>

                </Row>

                <Row>                    

                    
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Data</strong></Form.Label>
                            <Form.Control type="date" placeholder="" required value={turma.Data} id="Data" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid"> Por Favor Informe a Data!</Form.Control.Feedback>
                    </Col>

                    <Col>

                        <Form.Group className="mb-3">
                            <Form.Label><strong>Hora</strong></Form.Label>
                            <Form.Select required aria-label="Default select example" value={turma.Hora} id="Hora" onChange={manipulaMudanca}>
                                <option value={''} selected>Selecione</option>
                                <option value="1">07:30</option>
                                <option value="2">09:50</option>
                                <option value="3">13:30</option>
                                <option value="4">15:50</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid"> Por Favor Informe a Hora!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Quantidade de Alunos</strong></Form.Label>
                            <Form.Select required aria-label="Default select example" value={turma.QtdAlunos} id="QtdAlunos" onChange={manipulaMudanca}>
                                <option value={''} selected>Selecione</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Tipo de Aula</strong></Form.Label>
                            <Form.Select required aria-label="Default select example" value={turma.TipoDeAula} id="TipoDeAula" onChange={manipulaMudanca}>
                                <option value={''} selected>Selecione</option>
                                <option value="Prática">Prática</option>
                                <option value="Estágio">Estágio</option>
                            </Form.Select>
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