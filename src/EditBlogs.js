
//cara pemanggilan
import { useState } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import useFetch from './useFetch';


const EditBlogs = () => {
    const history = useHistory();
    const { id } = useParams();
    const { forms, setForms } = useState(
            {
                title: '',
                body: '',
                author: '',
            }
        )    
    //kalo asep get data dari server pake axios sh. cm pake fetch jga gpp tp asep ge blm biasa wkwk
    const { data: blog, isPending, error } = useFetch('http://localhost/api-for-react/Blogs/' + id);

    // 1. penulisan init state
        // const [title, setTitle] = useState('');
        // const [body, setBody] = useState('');
        // const [author, setAuthor] = useState('');

        // bisa diubah jd :
        

    const [isProgress, setIsProgress] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        //yang ini dihapus aja
        // const blog = { title, body, author };

        //langsung ambil ke state yg forms bos
        if (forms.title === "") {
            alert('Make Change for Title');
        }
        else if (forms.body === "") {
            alert('Make Change for Body');
        }
        else if (forms.author === "") {
            alert('Make Change for Author');
        }
        else {
            setIsProgress(true);

            fetch('http://localhost/api-for-react/Blogs/' + id, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(forms)
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
                {forms && (
                    forms.map((detail) => (

                        <div key={detail.id}>

                            <label>Blog Title:</label>
                            <input
                                type="text"
                                required
                                name="title"
                                defaultValue={detail.title}
                                onChange={(e) => setForms('title', e.target.value)} //isi ke forms
                            />
                            <label>Blog Body:</label>
                            <textarea
                                required
                                defaultValue={detail.body}
                                onChange={(e) => setForms('body', e.target.value)} //isi ke forms
                            ></textarea>
                            <label>Blog Author:</label>
                            <select
                                defaultValue={detail.author}
                                required
                                onChange={(e) => setForms('author', e.target.value)} //isi ke forms
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
