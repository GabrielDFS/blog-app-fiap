import  { useEffect, useState } from 'react';
import Post from '../components/Post';
import LayoutDefault from '../layout/LayoutDefault';
import { client } from '../util/createClient';
import { Link } from "react-router-dom";

const PageList = () => {
  const [posts, setPosts] = useState([]);
  const [feedbackPosts, setFeedbackPosts] = useState('Carregando posts...');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getPageList = async () => {
    try {
      const response = await client.getEntries({
        content_type: 'fiapBlogPost',
        order: "-sys.createdAt",
        skip: (currentPage - 1) * 5,
        limit: 5
      });

      setPosts(response.items);
      setTotalPages(Math.ceil(response.total / 5));
    } catch (error) {
      setFeedbackPosts('Erro ao carregar os posts');
    }
  };

  useEffect(() => {
    getPageList();
  }, [currentPage]); // Atualiza os posts quando a página atual muda

  return (
    <LayoutDefault>
      <div className="container">
        <div className="row">
          <main className="col-md-8">
            <h2 className="my-3">Todos os posts</h2>

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

            <div className="pagination py-3">
              <button className="btn btn-primary " 
                onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className='px-2'>Página {currentPage} de {totalPages}</span>
              <button className="btn btn-primary "
                onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Próxima
              </button> 
            </div>
            
            <Link to="/" className="btn btn-primary">
              Voltar
            </Link>
          </main>
        </div>
      </div>
    </LayoutDefault>
  );
};

export default PageList;
