import React, {Component} from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';


export default class Alert extends Component {

  constructor(props) {
    super(props);

    this.showAlert = this.showAlert.bind(this);
  }

  showAlert() {
    const { config } = this.props;
    const variant = config.variant;
    const { enqueueSnackbar } = useSnackbar();

    const alertMessage = (message, variant, autoHideDuration) => {
      enqueueSnackbar(message, { variant, autoHideDuration });
    }
    return (
      <React.Fragment>
        {alertMessage(config.message, config.variant, 1000)}
      </React.Fragment>
    )
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
          {alertMessage(config.message, config.variant, 1000)}
        </React.Fragment>
      )
    }

    return(
      <SnackbarProvider preventDuplicate={true}>
        { this.showAlert(...this.props)}
      </SnackbarProvider>
    )
  }
}
