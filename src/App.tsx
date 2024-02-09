import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// import Welcome from './pages/welcome/Welcome';
// import EVCalcs from './pages/evCalcs/EVCalcs';
// import ErrorPage from './pages/error/ErrorPage';

const Welcome = lazy(() => import("./pages/welcome/Welcome"));
const EVCalcs = lazy(() => import("./pages/evCalcs/EVCalcs"));
const ErrorPage = lazy(() => import("./pages/error/ErrorPage"));


export interface PageProps {
  updatePage: (path: string) => void
}

function App() {
  return (
    <BrowserRouter>

      <Layout>
        <Routes>
          {/* {page} */}
          <Route path="/" element={<Suspense><Welcome></Welcome></Suspense>}></Route>
          <Route path="/calculator" element={<Suspense><EVCalcs></EVCalcs></Suspense>}></Route>
          <Route path="*" element={<Suspense><ErrorPage updatePage={() => { }}></ErrorPage></Suspense>}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;

