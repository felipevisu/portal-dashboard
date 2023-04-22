import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { formatDate } from "@portal/utils/date";

interface FormatedConsultProps {
  consult: Record<string, any>;
}

interface FormatedItemProps {
  title: string;
  children?: React.ReactNode;
}

const FormatedItem = ({ title, children }: FormatedItemProps) => {
  return (
    <Box
      sx={{
        padding: 1,
        border: 1,
        borderColor: "#aaa",
        height: "100%",
        minHeight: "61.5px",
      }}
    >
      <Typography fontSize="small">{title}</Typography>
      <Box>{children}</Box>
    </Box>
  );
};

export const FormatedConsult = ({ consult }: FormatedConsultProps) => {
  return (
    <Box>
      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={6}>
          <FormatedItem title="Número de inscrição">
            {consult.estabelecimento?.cnpj}
          </FormatedItem>
        </Grid>
        <Grid item xs={6}>
          <FormatedItem title="Data de abertura">
            {consult.estabelecimento?.data_inicio_atividade &&
              formatDate(consult.estabelecimento?.data_inicio_atividade)}
          </FormatedItem>
        </Grid>
        <Grid item xs={12}>
          <FormatedItem title="Nome empresarial">
            {consult.razao_social}
          </FormatedItem>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormatedItem title="Nome fantasia">
            {consult.estabelecimento?.nome_fantasia}
          </FormatedItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormatedItem title="Porte">{consult.porte?.descricao}</FormatedItem>
        </Grid>
        <Grid item xs={12}>
          <FormatedItem title="Atividade principal">
            {consult.estabelecimento?.atividade_principal?.id} -{" "}
            {consult.estabelecimento?.atividade_principal?.descricao}
          </FormatedItem>
        </Grid>
        <Grid item xs={12}>
          <FormatedItem title="Atividades secundárias">
            {consult.estabelecimento?.atividades_secundarias?.map(
              (item, index) => (
                <Box key={index}>
                  {item.id} - {item.descricao}
                </Box>
              )
            )}
          </FormatedItem>
        </Grid>
        <Grid item xs={12}>
          <FormatedItem title="Natureza jurídica">
            {consult.natureza_juridica?.id} -{" "}
            {consult.natureza_juridica?.descricao}
          </FormatedItem>
        </Grid>
        <Grid item xs={12}>
          <FormatedItem title="Quadro de sócios e administradores">
            {consult.socios?.map((socio, index) => (
              <Box key={index}>
                <Typography fontSize="small">
                  {socio.qualificacao_socio?.id} -{" "}
                  {socio.qualificacao_socio?.descricao}
                </Typography>
                {socio.nome}
              </Box>
            ))}
          </FormatedItem>
        </Grid>
        <Grid item xs={12}>
          <FormatedItem title="Capital social">
            {consult.capital_social}
          </FormatedItem>
        </Grid>
        <Grid item xs={6}>
          <FormatedItem title="Logradouro">
            {consult.estabelecimento?.logradouro}
          </FormatedItem>
        </Grid>
        <Grid item xs={2}>
          <FormatedItem title="Número">
            {consult.estabelecimento?.numero}
          </FormatedItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormatedItem title="Complemento">
            {consult.estabelecimento?.complemento}
          </FormatedItem>
        </Grid>
        <Grid item xs={3}>
          <FormatedItem title="Cep">
            {consult.estabelecimento?.cep}
          </FormatedItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormatedItem title="Bairro/Distrito">
            {consult.estabelecimento?.bairro}
          </FormatedItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormatedItem title="Município">
            {consult.estabelecimento?.cidade?.nome}
          </FormatedItem>
        </Grid>
        <Grid item xs={1}>
          <FormatedItem title="UF">
            {consult.estabelecimento?.estado?.sigla}
          </FormatedItem>
        </Grid>
        <Grid item xs={6}>
          <FormatedItem title="Endereço eletrônico">
            {consult.estabelecimento?.email}
          </FormatedItem>
        </Grid>
        <Grid item xs={6}>
          <FormatedItem title="Telefone">
            ({consult.estabelecimento?.ddd1}){consult.estabelecimento.telefone1}
          </FormatedItem>
        </Grid>
        <Grid item xs={12}>
          <FormatedItem title="Ente federativo responsável">
            {consult.responsavel_federativo}
          </FormatedItem>
        </Grid>
        <Grid item xs={6}>
          <FormatedItem title="Situação cadastral">
            {consult.estabelecimento?.situacao_cadastral}
          </FormatedItem>
        </Grid>
        <Grid item xs={6}>
          <FormatedItem title="Data da situação cadastral">
            {consult.estabelecimento?.data_situacao_cadastral &&
              formatDate(consult.estabelecimento?.data_situacao_cadastral)}
          </FormatedItem>
        </Grid>
        <Grid item xs={12}>
          <FormatedItem title="Motivo de situação cadastral">
            {consult.estabelecimento?.motivo_situacao_cadastral}
          </FormatedItem>
        </Grid>
        <Grid item xs={6}>
          <FormatedItem title="Situação especial">
            {consult.estabelecimento?.situacao_especial}
          </FormatedItem>
        </Grid>
        <Grid item xs={6}>
          <FormatedItem title="Data da situação especial">
            {consult.estabelecimento?.data_situacao_especial &&
              formatDate(consult.estabelecimento?.data_situacao_especial)}
          </FormatedItem>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormatedConsult;
