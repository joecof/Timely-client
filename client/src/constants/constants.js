/**
 * Author: Joe Fong
 * Version: 1.0 
 * Description: All constants should be described here in order to avoid magic numbers and to  
 * produce a cleaner codebase. 
 */
export const NAVBAR_PARAMETERS = ({
  NAVBAR_EXPANDED_WIDTH: 230, 
  NAVBAR_SHRINKED_WIDTH: 100,
  DRAWER_EXPANDED_WIDTH: 230, 
  DRAWER_SHRINKED_WIDTH: 100
})

export const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  BAD_REQUEST: 400
}

export default {
  NAVBAR_PARAMETERS,
  HTTP_STATUS
};