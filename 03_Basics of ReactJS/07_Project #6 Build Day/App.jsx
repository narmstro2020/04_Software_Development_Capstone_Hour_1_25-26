// App.jsx
import {useEffect, useState} from 'react';

export default function App() {
    // TODO: create using the appropriate React Hook the following
    // imgUrl and setImgUrl: default ''
    // loading and setLoading: default of false
    // error and setError: default of null
    // tick and setTick:  default of 0

    const url = 'https://dog.ceo/api/breeds/image/random';


    const fetchDog = async (controller) => {
        try {
            // TODO: call setLoading passing in true
            // TODO: call setError passing in null
            const res = await fetch(url, {
                signal: controller.signal,
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            // TODO: call setImgUrl passing in data.message
        } catch (err) {
            // TODO: if err.name is not equal to 'AbortError' then call setError passing in 'Could not load a dog image.'
        } finally {
            // TODO: call setLoading passing in false
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        void fetchDog(controller);
        return () => controller.abort();
    }, [tick]);

    const reload = () => setTick((t) => t + 1);

    return (
        <main style={{maxWidth: 640, margin: '2rem auto', padding: '1rem', fontFamily: 'system-ui'}}>
            <h1>Dog Image Viewer</h1>
            {loading && <p>Loading…</p>}
            {error && <p role="alert" style={{color: 'crimson'}}>{error}</p>}
            {!loading && !error && imgUrl && (
                <img
                    src={imgUrl}
                    alt="Random dog"
                    style={{maxWidth: '100%', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,.15)'}}
                />
            )}
            <button onClick={reload} disabled={loading} style={{marginTop: '1rem'}}>
                {loading ? 'Fetching…' : 'New Image'}
            </button>
        </main>
    );
}
