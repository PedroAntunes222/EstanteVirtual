// import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ListaLivros.module.scss";
import { getUser } from "../../Service/getData";
import React, { useState, useEffect, useContext } from "react";
import CardLivro from "../../components/CardLivro/CardLivro";
import Loading from "../../components/Loading/Loading";
import AuthContext from "../../Service/auth";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function ListaLivros() {
  const { authenticated } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");

  const [livros, setLivros] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterGenero, setFilterGenero] = useState("");
  const [filterCompleto, setFilterCompleto] = useState("");
  const [info, setInfo] = useState("titulo");
  const [ordenacao, setOrdenacao] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUser(authenticated)
      .then((response) => {
        setLivros(response.data.livros);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [refresh, authenticated]);

  const refreshList = () => {
    //muda o estado para dar reload no useeffect
    setRefresh(refresh + 1);
  };

  const fechaModal = (e) => {
    e.preventDefault();
    setModal(false);
  };

  useEffect(() => {
    let livrosFilter = livros;

    if (filterGenero) {
      livrosFilter = livrosFilter.filter(
        (item) => item.generoPrincipal === filterGenero
      );
    }

    if (filterCompleto !== "") {
      livrosFilter = livrosFilter.filter(
        (item) => item.completo === filterCompleto
      );
    }

    if (ordenacao) {
      livrosFilter = [...livrosFilter].sort((a, b) =>
        a[info] > b[info] ? 1 : -1
      );
    } else {
      livrosFilter = [...livrosFilter].sort((a, b) =>
        a[info] < b[info] ? 1 : -1
      );
    }

    setFiltered(livrosFilter);
  }, [filterGenero, filterCompleto, info, ordenacao, livros]);

  return (
    <>
      {modal && (
        <div className={styles.modal}>
          <div>
            <p>{message}</p>
            <Button onClick={(e) => fechaModal(e)}>OK</Button>
          </div>
        </div>
      )}
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.filtroLista}>
          <TextField
            id="outlined-select-currency"
            select
            label="Genero"
            value={filterGenero || ""}
            onChange={(e) => setFilterGenero(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Filosofia">Filosofia</MenuItem>
            <MenuItem value="Fantasia">Fantasia</MenuItem>
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Completo"
            value={String(filterCompleto) || ""}
            onChange={(e) => setFilterCompleto(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value={true}>Completos</MenuItem>
            <MenuItem value={false}>Incompletos</MenuItem>
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Info"
            value={String(info) || ""}
            onChange={(e) => setInfo(e.target.value)}
          >
            <MenuItem value="titulo"> Nome </MenuItem>
            <MenuItem value="id"> Data </MenuItem>
            <MenuItem value="rating"> Avaliação </MenuItem>
            <MenuItem value="paginasTotais"> Páginas </MenuItem>
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Ordenação"
            value={String(ordenacao) || ""}
            onChange={(e) => setOrdenacao(e.target.value)}
          >
            <MenuItem value={true}> Crescente </MenuItem>
            <MenuItem value={false}> Decrescente </MenuItem>
          </TextField>

          <div className={styles.grupoCards}>
            <Card component={Link} to="/adicionar" className={styles.livrosAdd}>
              <Fab>
                <AddIcon />
              </Fab>
            </Card>

            {filtered.map((livro) => (
              <CardLivro
                livro={livro}
                modal={setModal}
                loading={setLoading}
                message={setMessage}
                refresh={refreshList}
                key={livro.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ListaLivros;