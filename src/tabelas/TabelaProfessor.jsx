import { Table, Button, Form, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definiçoes";


export default function TabelaProfessor(props) {

    function filtrarProfessor(e) {
        const termoBusca = e.currentTarget.value.toLowerCase();

        fetch(urlBase, { method: "GET" })
            .then((resposta) => resposta.json())
            .then((listaProfessores) => {
                if (Array.isArray(listaProfessores)) {
                    const resultado = listaProfessores.filter((professor) => {
                        const nomeCompleto = `${professor.nome}`.toLowerCase();
                        return nomeCompleto.includes(termoBusca);
                    });
                    props.setProfessor(resultado);
                }
            });
    }


    return (
        <Container className="mt-5 mb-5">
            <h3 className="d-flex justify-content-center align-items-center">Professores Cadastrados</h3>
            <Container className="d-flex mt-4 mb-3">
                <Form.Control type="text"
                    id="termoBusca"
                    onChange={filtrarProfessor}>
                </Form.Control>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Curso</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaProfessores?.map((professor) => {

                            return <tr key={professor.codigo}>
                                <td>{professor.codigo}</td>
                                <td>{professor.nome}</td>
                                <td>{professor.cpf}</td>
                                <td>{professor.telefone}</td>
                                <td>{professor.codCurso.cursos}</td>
                                <td>
                                    <div className="d-flex">
                                        <Button variant="info" onClick={() => { props.editarProfessor(professor) }}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg> </Button>
                                        <Button variant="danger" onClick={() => { props.excluir(professor) }} className="ms-2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg> </Button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </Table>
            <Container className="d-flex justify-content-end align-items-center mt-5">
                <Button onClick={() => {
                    props.exibirTabela(false);
                }} variant="primary">Cadastrar</Button>
            </Container>

        </Container>
    );
}