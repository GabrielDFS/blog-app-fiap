import Post from "../components/Post";
import LayoutDefault from "../layout/LayoutDefault";

function PageHome() {
    return (
        <LayoutDefault>
            <div className="container">
                <div className="row">
                    <main className="col-md-8">
                        <h2 className="my-3">Área dos posts</h2>

                        <Post 
                            title={'Primeiro Post'} 
                            description={'Descrição'} 
                            slug={'primeiro-post'} 
                        />

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