import React, {Component} from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';


export default class Alert extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const ShowAlert = () => {

      const { config } = this.props;
      const { enqueueSnackbar } = useSnackbar();
      
      const alertMessage = (message, variant, autoHideDuration) => {
        enqueueSnackbar(message, { variant, autoHideDuration });
      }

      return (
        <React.Fragment>
          {alertMessage(config.message, config.variant, 2000)}
        </React.Fragment>
      )
    }

    return(
      <SnackbarProvider preventDuplicate={true}>
        <ShowAlert { ...this.props }/>
      </SnackbarProvider>
    )
  }
}
