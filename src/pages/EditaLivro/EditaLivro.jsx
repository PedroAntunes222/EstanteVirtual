// import axios from "axios";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { getLivro } from "../../Service/getData";
import { Link } from "react-router-dom";
import styles from "./EditaLivro.module.scss";
import { useNavigate } from "react-router-dom";

import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

function EditaLivro() {
  const navigate = useNavigate();

  const [livro, setLivro] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [generoPrincipal, setgeneroPrincipal] = useState("");
  const [generoSecundario, setgeneroSecundario] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [paginas, setPaginas] = useState("");
  const [capa, setCapa] = useState("");

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("");

  const atlLivro = (id, e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put("http://localhost:8080/livro/" + id, {
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

    // setLoading(false);
  };

  const fechaModal = () => {
    setLoading(false);
    setModal("");
    navigate(`/lista`);
  };

  useEffect(() => {
    // setLoading(true);
    let IDLivro = window.location.pathname.split("/").pop();
    getLivro(IDLivro)
      .then((response) => {
        console.log(response.data);
        setLivro(response.data);
      })
      .catch((error) => console.log(error));
    // setLoading(false);
  }, []);

  useEffect(() => {
    setTitulo(livro.titulo);
    setSubtitulo(livro.titulo);
    setgeneroPrincipal(livro.generoPrincipal);
    setgeneroSecundario(livro.generoSecundario);
    setSinopse(livro.sinopse);
    setPaginas(livro.paginasTotais);
    setCapa(livro.capa);
  }, [livro]);

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
          <p>Livro atualizado com sucesso</p>
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

      <div className={styles.cardInfo}>
        {/* <div className={styles.coverLivro}>
          <Fab
            component={Link}
            to={`/livro/${livro.id}`}
            className={styles.returnFlutuante}
          >
            <ReplyAllOutlinedIcon />
          </Fab>
          {!livro.capa ? (
            <img
              src="https://i.pinimg.com/564x/2a/ae/b8/2aaeb8b8c0f40e196b926016a04e591d.jpg"
              alt={`${livro.nome} no cover`}
            />
          ) : (
            <img src={livro.capa} alt={`${livro.nome} cover`} />
          )}
        </div> */}

        <h1 className={styles.titulo}>Editar Livro</h1>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.infosLivro}
        >
          <Fab
            component={Link}
            to={`/livro/${livro.id}`}
            className={styles.returnFlutuante}
          >
            <ReplyAllOutlinedIcon />
          </Fab>

          <TextField
            id="tituloLivro"
            label="Titulo"
            variant="outlined"
            value={titulo || ""}
            onChange={(e) => setTitulo(e.target.value)}
            className={styles.input}
          />

          <TextField
            id="Subtitulo-livro"
            label="Subtitulo"
            variant="outlined"
            value={subtitulo || ""}
            onChange={(e) => setSubtitulo(e.target.value)}
            className={styles.input}
          />

          <div className={styles.generoGrid}>
            <FormControl fullWidth className={styles.input}>
              <InputLabel id="select-label">Gênero 1</InputLabel>
              <Select
                id="generoPrincipal-label"
                value={generoPrincipal || ""}
                label="Gênero 1"
                onChange={(e) => setgeneroPrincipal(e.target.value)}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"Fantasia"}>Fantasia</MenuItem>
                <MenuItem value={"Aventura"}>Aventura</MenuItem>
                <MenuItem value={"Drama"}>Drama</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth className={styles.input}>
              <InputLabel id="select-label">Gênero 2</InputLabel>
              <Select
                id="generoSecundario-label"
                value={generoSecundario || ""}
                label="Gênero 2"
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
            id="capa"
            label="Capa"
            variant="outlined"
            value={capa || ""}
            onChange={(e) => setCapa(e.target.value)}
            className={styles.input}
          />

          <TextField
            id="paginas"
            label="N° de Páginas"
            variant="outlined"
            value={paginas || ""}
            onChange={(e) => setPaginas(e.target.value)}
          />

          <TextField
            id="nomeSinopse"
            label="sinopse"
            variant="outlined"
            multiline
            value={sinopse || ""}
            onChange={(e) => setSinopse(e.target.value)}
            className={styles.input}
          />

          <div className={styles.grupoBotoes}>
            <Button
              variant="contained"
              onClick={(e) => atlLivro(livro.id, e)}
              endIcon={<SaveIcon />}
              size="large"
              className={styles.botaoFormulario}
            />
          </div>
        </Box>
      </div>
    </>
  );
}

export default EditaLivro;
