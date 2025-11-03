// Importamos normalize
import './../node_modules/normalize.css/normalize.css'
import App from 'next/app';
import { AuthMiddleware } from '@/middlewares/auth';
import { AuthProvider } from '@/hooks/useAuth';


function NextApp({ Component, pageProps }) {
    const ParentContainer = Component?.Parent ?? AuthMiddleware;
    // Renderizamos la aplicación
    return (
        <AuthProvider>
            <ParentContainer>
                <Component {...pageProps} />
            </ParentContainer>
        </AuthProvider>
        )
}

NextApp.getInitialProps = async (appContext) => {
    const props = await App.getInitialProps(appContext);
    const { req, res } = appContext.ctx;

    // Estamos ejecutando una acción en el servidor
    if (req) {
        // Si no tenemos permisos, no podemos hacer nada
        if(req.cookies[process.env.NEXT_PUBLIC_COOKIE] == undefined) {
            res.statusCode = 401;
        }
    }

    return { ...props }
}


export default NextApp;