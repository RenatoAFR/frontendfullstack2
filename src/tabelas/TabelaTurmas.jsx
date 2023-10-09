import { Button, Container, Table, Form, Row } from "react-bootstrap";

export default function TabelaTurmas(props) {

    function formatDate(date) {
        var newDate = new Date(date);
        var day = newDate.getUTCDate();
        var month = newDate.getUTCMonth() + 1;
        var year = newDate.getFullYear();

        var formatedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year.toString()}`;
        return formatedDate
    }

    function filtrarTurmas(e) {
        const termoBusca = e.currentTarget.value;

        fetch("https://129.146.68.51/aluno38-pfsii/turmas", { method: "GET" })
            .then((resposta) => { return resposta.json() })
            .then((listaTurmas) => {
                if (Array.isArray(listaTurmas)) {
                    const resultado = listaTurmas.filter((turmas) => turmas.Professor.toLowerCase().includes(termoBusca.toLowerCase()));
                    props.setTurmas(resultado);
                }
            });
    }

    return (
        <Container>
            <Button onClick={() => {
                props.exibirTabela(false);
            }} variant="primary">
                Cadastrar
            </Button>
            <Container>
                <Row className="m-3">
                    <Form.Control type="text" placeholder="Busque a Turma" id="termoBusca" onChange={filtrarTurmas} />
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Professor</th>
                        <th>Curso</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Quantidade de Alunos</th>
                        <th>Tipo de Aula</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaTurmas?.map((turma) => {
                            return <tr key={turma.Professor}>
                                <td>{turma.Professor}</td>
                                <td>{turma.Curso}</td>
                                <td>{formatDate(turma.Data)}</td>
                                <td>{turma.Hora}</td>
                                <td>{turma.QtdAlunos}</td>
                                <td>{turma.TipoDeAula}</td>
                                <td>
                                    <Button onClick={() => { props.editarTurma(turma) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </Button>{' '}

                                    <Button variant="danger" onClick={() => {
                                        if (window.confirm('Confirma a Exclusão da Turma?')) {
                                            props.excluirTurma(turma);
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}