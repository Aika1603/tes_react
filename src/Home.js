import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
    const { data:blogs, isPending, error} = useFetch('http://localhost/api-for-react/Blogs');

    return (  
        <div className="home">
            {isPending && <div>Load Data...</div>}
            {error && <div>{error}</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs" />}
        </div>
    );
}
 
export default Home;