import { Alert } from "react-bootstrap";
import Pagina from "../templates/Pagina";

export default function Tela404(props){
    return (
        <Pagina>
            <Alert clasName="text-center" variant="warning">O recurso solicitado não existe</Alert>
        </Pagina>
    );
}