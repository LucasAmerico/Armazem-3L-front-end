import React, { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import GlobalStates from '../../recoil/atom';
import useStyles from './styles';
import MotoristaService from '../../services/MotoristaService';
import MESSAGES from '../../constants/MESSAGES';
import { Motorista } from '../../utils/interfaces';
import encryptMD5 from '../../utils/security';
import FormCadastroMotorista from '../form-cadastro';

const Registro = () => {
  const classes = useStyles();
  const open = useRecoilValue(GlobalStates.sideBarState);
  const [motorista, setMotorista] = useState({
    nome: '',
    login: '',
    email: '',
    senha: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMotorista({ ...motorista, [name]: value });
  };

  const handleSave = () => {
    const { nome, login, email, senha } = motorista;
    const newMotorista: Motorista = { nome, login, email };
    let senhaCrypto = '';
    if (senha !== '') {
      senhaCrypto = encryptMD5(senha);
    }
    newMotorista.senha = senhaCrypto;

    MotoristaService.postMotorista(newMotorista)
      .then((res) => {
        toast.success(MESSAGES.cadastrar_Produto_Sucesso);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div>
        <FormCadastroMotorista
          email={motorista.email}
          nome={motorista.nome}
          senha={motorista.senha}
          onChangeValue={handleInputChange}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default Registro;
