import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdicionaLivros.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import InputLabel from "@mui/material/InputLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControl from "@mui/material/FormControl";
import Fab from "@mui/material/Fab";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CircularProgress from "@mui/material/CircularProgress";

function ListagemLivros() {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [generoPrincipal, setgeneroPrincipal] = useState("");
  const [generoSecundario, setgeneroSecundario] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [paginas, setPaginas] = useState("");
  const [capa, setCapa] = useState("");

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("");

  const adicionaLivro = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:8080/livro/add", {
        capa: capa,
        titulo: titulo,
        subTitulo: subtitulo,
        generoPrincipal: generoPrincipal,
        generoSecundario: generoSecundario,
        sinopse: sinopse,
        paginasLidas: 0,
        paginasTotais: paginas,
        completo: false,
        usuario: { id: 1 },
      })
      .then(function (response) {
        console.log(response);
        setModal(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setTitulo("");
    setSubtitulo("");
    setgeneroPrincipal("");
    setgeneroSecundario("");
    setSinopse("");
    setCapa("");
  };

  const limpaForm = () => {
    setTitulo("");
    setSubtitulo("");
    setgeneroPrincipal("");
    setgeneroSecundario("");
    setSinopse("");
    setCapa("");
  };

  const fechaModal = () => {
    setLoading(false);
    setModal("");
  };

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <></>
      )}

      {modal ? (
        <div className={styles.loading}>
          <p>Livro adicionado com sucesso</p>
          <Button
            variant="outlined"
            onClick={fechaModal}
            endIcon={<CheckCircleOutlineRoundedIcon />}
            size="large"
            className={styles.botaoFormulario}
          />
        </div>
      ) : (
        <></>
      )}
      <div className={styles.formPage}>
        <h1 className={styles.titulo}> Adicione um livro </h1>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.formularioLivro}
        >
          <Fab component={Link} to="/lista" className={styles.flutuanteLista}>
            <InventoryIcon />
          </Fab>

          <TextField
            id="Titulo-livro"
            label="Titulo"
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <TextField
            id="Subtitulo-livro"
            label="Subtitulo"
            variant="outlined"
            value={subtitulo}
            onChange={(e) => setSubtitulo(e.target.value)}
          />
          <div className={styles.generoGrid}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Gênero 1</InputLabel>
              <Select
                id="generoPrincipal-label"
                className={styles.selectLabel}
                value={generoPrincipal}
                label="generoPrincipal"
                onChange={(e) => setgeneroPrincipal(e.target.value)}
              >
                <MenuItem value={"Fantasia"}>Fantasia</MenuItem>
                <MenuItem value={"Aventura"}>Aventura</MenuItem>
                <MenuItem value={"Drama"}>Drama</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="select-label">Gênero 2</InputLabel>
              <Select
                id="generoSecundario-label"
                className={styles.selectLabel}
                value={generoSecundario}
                label="generoSecundario"
                onChange={(e) => setgeneroSecundario(e.target.value)}
              >
                <MenuItem value={""}>Nenhum</MenuItem>
                <MenuItem value={"Fantasia"}>Fantasia</MenuItem>
                <MenuItem value={"Aventura"}>Aventura</MenuItem>
                <MenuItem value={"Drama"}>Drama</MenuItem>
              </Select>
            </FormControl>
          </div>

          <TextField
            id="endereco-capa"
            label="Image Adress"
            variant="outlined"
            value={capa}
            onChange={(e) => setCapa(e.target.value)}
          />

          <TextField
            id="paginas"
            label="N° de Páginas"
            variant="outlined"
            value={paginas}
            onChange={(e) => setPaginas(e.target.value)}
          />

          <TextField
            id="sinopse-livro"
            label="Sinopse"
            variant="outlined"
            multiline
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
          />

          <div className={styles.grupoBotoes}>
            <Button
              variant="contained"
              onClick={limpaForm}
              endIcon={<DeleteIcon />}
              color="error"
              size="large"
              className={styles.botaoFormulario}
            />

            <Button
              variant="contained"
              onClick={adicionaLivro}
              endIcon={<SendIcon />}
              color="success"
              size="large"
              className={styles.botaoFormulario}
            />
          </div>
        </Box>
      </div>
    </>
  );
}

export default ListagemLivros;
