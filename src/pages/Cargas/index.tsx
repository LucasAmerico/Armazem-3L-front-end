/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import clsx from 'clsx';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import InputBase from '@material-ui/core/InputBase/InputBase';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CargaService from '../../services/CargaService';
import Lista from '../../components/List/list';
import useWindowDimensions from '../../utils/windowsDimension';
import useStyles from './styles';
import sideBarState from '../../recoil/atom';

const CargasPage = () => {
  const [pageState, setPageState] = useState({
    cargasList: [],
  });

  useEffect(() => {
    CargaService.getCarga()
      .then((data) => {
        setPageState({
          ...pageState,
          cargasList: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const classes = useStyles();
  const { height, width } = useWindowDimensions();
  const [open, setOpen] = useRecoilState(sideBarState);

  return (
    <div
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={5}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={8}>
              <Typography variant="h4"> Listagem de cargas </Typography>
            </Grid>
            <Grid container item xs={4} className={classes.actionContainer}>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
              >
                <AddIcon fontSize="large" />
              </Button>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Buscar…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Lista
              titulo="Listagem de cargas"
              conteudo={pageState.cargasList}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CargasPage;
