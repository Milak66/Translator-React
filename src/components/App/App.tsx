import React, { useState } from "react";
import "./App.css";

const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "uk", name: "Ukrainian" },
    { code: "pl", name: "Polish" },
    { code: "no", name: "Norwegian" },
    { code: "sv", name: "Swedish" },
    { code: "da", name: "Danish" },
    { code: "fi", name: "Finnish" },
    { code: "nl", name: "Dutch" },
];

const App: React.FC = () => {
    const [text, setText] = useState("");
    const [translation, setTranslation] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("ru");
    const [loading, setLoading] = useState(false);

    const translate = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setTranslation("");

        try {
            const response = await fetch("http://localhost:8777/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text,
                    targetLanguage,
                }),
            });

            if (!response.ok) {
                throw new Error("Translation failed");
            }

            const data = await response.json();
            setTranslation(data.translatedText);
        } catch {
            setTranslation("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const clearText = () => {
        setText("");
        setTranslation("");
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            translate();
        }
    };

    return (
        <div className="app">
            <main className="main">
                <section className="hero">
                    <div className="heroTag">
                        <span>✦</span>
                        TRANSLATE WITHOUT LIMITS
                    </div>

                    <h1>
                        Your words,
                        <br />
                        <span>any language.</span>
                    </h1>

                    <p>
                        Fast and simple translations powered by
                        <br />
                        a clean, modern experience.
                    </p>
                </section>

                <section className="translator">
                    <div className="languageBar">
                        <div className="languageSide">
                            <span className="languageLabel">FROM</span>
                            <span className="languageValue">Auto Detect</span>
                        </div>

                        <div className="swapButton">⇄</div>

                        <div className="languageSide targetLanguage">
                            <span className="languageLabel">
                                TRANSLATE TO
                            </span>

                            <select
                                value={targetLanguage}
                                onChange={(event) =>
                                    setTargetLanguage(event.target.value)
                                }
                            >
                                {languages.map((language) => (
                                    <option
                                        key={language.code}
                                        value={language.code}
                                    >
                                        {language.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="translationGrid">
                        <div className="textPanel">
                            <div className="panelHeader">
                                <span>Your text</span>

                                {text && (
                                    <button
                                        className="clearButton"
                                        onClick={clearText}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            <textarea
                                value={text}
                                onChange={(event) =>
                                    setText(event.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Type something to translate..."
                                maxLength={5000}
                            />

                            <div className="panelFooter">
                                <span>{text.length} / 5000</span>

                                <span className="shortcut">
                                    Press <b>⌘ Enter</b> to translate
                                </span>
                            </div>
                        </div>

                        <div className="textPanel resultPanel">
                            <div className="panelHeader">
                                <span>Translation</span>

                                {translation && (
                                    <button
                                        className="copyButton"
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                translation
                                            )
                                        }
                                    >
                                        Copy
                                    </button>
                                )}
                            </div>

                            <div className="translationResult">
                                {loading ? (
                                    <div className="loading">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                ) : translation ? (
                                    translation
                                ) : (
                                    <span className="placeholder">
                                        Your translation will appear here...
                                    </span>
                                )}
                            </div>

                            <div className="panelFooter">
                                <span>
                                    {
                                        languages.find(
                                            (language) =>
                                                language.code ===
                                                targetLanguage
                                        )?.name
                                    }
                                </span>

                                <span className="secureText">
                                    <span className="lock">⌁</span>
                                    Ready
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="translateButton"
                        onClick={translate}
                        disabled={!text.trim() || loading}
                    >
                        <span>
                            {loading ? "Translating..." : "Translate"}
                        </span>

                        {!loading && <span className="arrow">→</span>}
                    </button>
                </section>

                <div className="features">
                    <div className="feature">
                        <div className="featureIcon">⚡</div>

                        <div>
                            <strong>Fast</strong>
                            <span>Quick translations</span>
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureIcon">◎</div>

                        <div>
                            <strong>Auto Detect</strong>
                            <span>No source language needed</span>
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureIcon">✦</div>

                        <div>
                            <strong>14 Languages</strong>
                            <span>More coming soon</span>
                        </div>
                    </div>
                </div>

                <footer>
                    <span>LINGUA</span>
                    <span>Built with React & Spring Boot</span>
                </footer>
            </main>
        </div>
    );
};

export default App;