import { render } from 'react-dom'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import 'virtual:windi.css'
import App from './App'

// const queryClient = new QueryClient()

render(
  // <ReactAlias.StrictMode>
  // <QueryClientProvider client={queryClient}>
  <App />,
  // </QueryClientProvider>,
  // </ReactAlias.StrictMode>,
  document.getElementById('root')
)
