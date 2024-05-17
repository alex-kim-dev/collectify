import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

const App = () => {
  const [data, setData] = useState<object>({});

  useEffect(() => {
    const controller = new AbortController();

    fetch(import.meta.env.VITE_API_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      })
      .catch((err) => {
        setData(err);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

root.render(
  <StrictMode>
    <h1>Hello Collectify!</h1>
    <p>Backend response:</p>
    <App />
  </StrictMode>,
);
