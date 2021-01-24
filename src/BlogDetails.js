import { useHistory, useParams, Link } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
    const {id} = useParams();
    const { data: blog, isPending, error} = useFetch('http://localhost/api-for-react/Blogs/'+id);
    const history = useHistory();

    const handleDelete = () => {

        let ini_id;
        blog && (                    
            blog.map((detail) => (
                ini_id = detail.id
            ))
        )
        fetch('http://localhost/api-for-react/Blogs/'+ini_id, {
            method : 'DELETE'
        })
        .then(() => {
            console.log('successfully Delete')
            history.push('/');
        })
    }
    return ( 
        <div className="blog-details">
            {isPending && <div>Load Data...</div>}
            {error && <div>{error}</div>}
            {
                blog && (                    
                    blog.map((detail) => (
                        <article key={detail.id}>
                            <h2>{ detail.title }</h2>
                            <span>Written by { detail.author }</span>
                            <p>{ detail.body }</p>
                            <Link to="/">Back</Link>
                            <Link to={`/Edit/${detail.id}`}  >Edit</Link>
                            <button onClick={handleDelete}>Delete Blog</button>
                        </article> 
                    ))
                )
            }
        </div>
     );
}
 
export default BlogDetails;