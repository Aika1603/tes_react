import { useState } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import useFetch from './useFetch';


const EditBlogs = () => {
    const history = useHistory();
    const {id} = useParams();
    const { data:blog, isPending, error } = useFetch('http://localhost/api-for-react/Blogs/'+id);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    // const history = useHistory();

    const [isProgress, setIsProgress] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author};

        if(blog.title === ""){
            alert('Make Change for Title');
        }
        else if(blog.body === ""){
            alert('Make Change for Body');
        }
        else if(blog.author === ""){
            alert('Make Change for Author');
        }
        else{
            setIsProgress(true);
    
            fetch('http://localhost/api-for-react/Blogs/'+id, {
                method : 'POST',
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(blog)
            })
            .then(() => {
                setIsProgress(false);            
                console.log('successfully Edit');
                history.push('/');
            }) 

        }       
    }

    return ( 
        <div className="edit">
        {isPending && <div>Load Data..</div>}
        {error && <div>{error}</div>}
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
            {blog && (
            blog.map((detail) => (
                
                <div key={detail.id}>
            
                <label>Blog Title:</label>
                <input 
                    type="text" 
                    required
                    name="title"
                    defaultValue = {detail.title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea 
                    required
                    defaultValue={detail.body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog Author:</label>
                <select 
                    defaultValue={detail.author}
                    required
                    onChange={(e) => setAuthor(e.target.value)}
                >                    
                    <option value="">-Choose-</option>
                    <option value="Fazri">Fazri</option>
                    <option value="Bayu">Bayu</option>
                    <option value="Hiba">Hiba</option>
                    <option value="Yazied">Yazied</option>
                </select>
                <Link to={`/blogs/${id}`}>Batal</Link>
                {!isProgress && <button>Edit Blog</button>}
                {isProgress && <button disabled>Editing Blog...</button>}
                </div>
            )))}

                
            </form>
        </div>
     );
}
 
export default EditBlogs;