import Button from '@mui/joy/Button';
import axios from 'axios';
import config from '../config.json';

function NavBar(){
  return (
    <div>
      {/* NavBar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Button variant="outlined" color="success" onClick={() => {
            const url = axios.get(config.apiBaseUrl + '/authUrlGen');
            url.then(res => {
              window.location.href = res.data;
            });
          }}>Login With Twitter</Button>
      </nav>
    </div>
  )
}

export default NavBar;