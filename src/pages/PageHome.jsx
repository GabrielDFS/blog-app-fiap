import { useEffect, useState } from "react";
import Post from "../components/Post";
import LayoutDefault from "../layout/LayoutDefault";
import { client } from "../util/createClient";

function PageHome() {
    const [posts, setPosts] = useState([]);
    const [feedbackPosts, setFeedbackPosts] = useState('Carregando posts...');

    const getPosts = async () => {
        try {
            const response = await client.getEntries({
                content_type: 'fiapBlogPost',
                limit: 5,
                order: "-sys.createdAt"
            });
    
            setPosts(response.items);
        } catch (error) {
            setFeedbackPosts('Erro ao carregar os posts, run to the hills!');
        }
    };

    useEffect(() => {
        getPosts();
    }, []); // ciclo de vida - no onLoad do componente
    
    return (
        <LayoutDefault>
            <div className="container">
                <div className="row">
                    <main className="col-md-8">
                        <h2 className="my-3">Área dos posts</h2>

                        {posts.length === 0 && (
                            <p>{feedbackPosts}</p>
                        )}

                        {posts.map((post) => (
                            <Post
                                key={post.sys.id}
                                title={post.fields.postTitle}
                                description={post.fields.postDescription}
                                slug={post.fields.postSlug}
                            />
                        ))}

                        <a href="#" className="btn btn-primary">
                            Ver todos os posts
                        </a>
                    </main>
                    <aside className="col-md-4">
                        <h2 className="my-3">Categorias</h2>

                        <ul>
                            <li>Nome da categoria</li>
                            <li>Nome da categoria</li>
                            <li>Nome da categoria</li>
                        </ul>
                    </aside>
                </div>
            </div>
        </LayoutDefault>
    )
}

export default PageHome;