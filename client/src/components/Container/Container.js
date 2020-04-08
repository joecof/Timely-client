import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

/**
 * Material UI styling JSON object.
 * @param {JSON} theme
 */
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 10,
    // padding: theme.spacing(5),
  },
  innerContainer: {
    padding: "35px 0 0 0"
  },
  toolbar: theme.mixins.toolbar,
});

/**
 * Author: Joe
 * Version: 1.0
 * Description: Container component. Stylistically this component is for containing all components besides sidemenu/navbar inside the dashboard.
 */
class Container extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.innerContainer}>
          <div className={classes.toolbar} />
          {this.props.routes}
        </div>
      </main>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Container);
