import { Link } from 'react-router-dom';

const Notfound = () => {

    return ( 
        <div className="not-found">
            <h2>Sorry</h2>
            <br></br>
            <p>The page cannot be found</p>
            <br></br>
            <Link to="/">Back To Home...</Link>
        </div>
     );
}
 
export default Notfound;