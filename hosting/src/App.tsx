import React, { useEffect, useState } from "react";
import { User, onAuthStateChanged, GithubAuthProvider, signInWithRedirect, getAuth, signOut } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

function App() {
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user ?? undefined);
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        const provider = new GithubAuthProvider();

        provider.addScope("read:user");
        provider.addScope("public_repo");

        await signInWithRedirect(auth, provider);
    };

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <main>
            <h1>
                CodeSupport Code Review Tool
            </h1>
            {user && (
                <div>
                    <p>Hello {user.displayName}</p>
                    <pre>{JSON.stringify(user)}</pre>
                    <button onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            )}
            {!user && (
                <button onClick={handleLogin}>
                    Login
                </button>
            )}
        </main>
    );
}

export default App;
