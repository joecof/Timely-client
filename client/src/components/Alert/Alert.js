import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { config } = props

  const alert = enqueueSnackbar(config.message, { variant: config.variant, autoHideDuration: 2500 });

  return (
    <React.Fragment>
      {alert}
    </React.Fragment>
  );
}

export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider preventDuplicate={true}>
      <MyApp {...props}/>
    </SnackbarProvider>
  );
}