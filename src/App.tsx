import {useState, useCallback, useEffect} from 'react';

type RemoteThemeConfig = {
    name: string;
    parentTheme: string;
    assets: Record<string, string>;
    colors: Record<string, string>;
    config: Record<string, string>;
};

function App() {
    const getRemoteThemes = useCallback(async () => {
        const result = await fetch(
            'https://crossorigin.me/https://api.github.com/gists/4babfc04af795c2c195a004e72c66233',
            {
                headers: {
                    Authorization: 'Bearer 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',
                },
            },
        );
        const gist = await result.json();
        return JSON.parse(gist.files['themes.json'].content).themes as RemoteThemeConfig[];
    }, []);

    const [remoteThemes, setRemoteThemes] = useState<RemoteThemeConfig[]>([]);

    useEffect(() => {
        (async () => {
            const _remoteThemes = await getRemoteThemes();
            setRemoteThemes(_remoteThemes);
        })();
    }, [setRemoteThemes, getRemoteThemes]);

    return (
        <>
            <div>
                {JSON.stringify(remoteThemes, undefined, 2)}
                <input></input>
            </div>
        </>
    );
}

export default App;
