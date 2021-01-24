import { useState } from 'react';
import { useHistory } from 'react-router-dom';
const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const history = useHistory();

    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch('http://localhost/api-for-react/Blogs', {
            method : 'POST',
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(blog)
        })
        .then(() => {
            setIsPending(false);            
            console.log('successfully Added');
            history.push('/');
        })
    }

    return ( 
        <div className="create">
            <h2>Add New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input 
                    type="text" 
                    required 
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea 
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog Author:</label>
                <select 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >                    
                    <option value="">-Choose-</option>
                    <option value="Fazri">Fazri</option>
                    <option value="Bayu">Bayu</option>
                    <option value="Hiba">Hiba</option>
                    <option value="Yazied">Yazied</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
                
            </form>
        </div>
     );
}
 
export default Create;