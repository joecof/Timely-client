import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link, withRouter} from "react-router-dom";

/**
 * Author: Joe 
 * Version: 1.0 
 * Description: Breadcrumb component. Provides the breadcrumb navigation. 
 */
class BreadCrumb extends Component {

  render() {
    const { location, loadedUser  } = this.props
    const breadcrumbs = location.pathname.split("/");
    const arr = [];
    let str = "";
    breadcrumbs.splice(0, 1)

    breadcrumbs.forEach((item, i) => {
      str += "/" + item 
      arr.push(str);
    });

    return (
      <div>
        <Breadcrumbs>
          {arr.map((item, i) => (
            <div key = {i}>
              {arr.length - 1 === i ?  
                <Link style={{textDecoration:'none'}} key = {i} to = {item}>
                  <Typography color="textPrimary"> {item.split('/')[i + 1]} </Typography>
                </Link> 
                : 
                i === 0 ? <Link key = {i} to = {`${item}/${loadedUser.employee_id}`}> {item.split('/')[i + 1]} </Link> : 
                <Link key = {i} to = {`${item}`}> {item.split('/')[i + 1]} </Link>}
            </div>
          ))}
        </Breadcrumbs>
      </div>
    )
  }
}

export default withRouter(BreadCrumb);
