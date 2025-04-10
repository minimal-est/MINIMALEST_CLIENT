import {createContext, useContext, useState} from "react";

interface StyleContextType {
    archiveStyle: Record<string, string>;
    postStyle: Record<string, string>;
    setArchiveStyle: (styles: Record<string, string>) => void;
    setPostStyle: (styles: Record<string, string>) => void;
}


const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const StyleProvider = ({ children }: { children: React.ReactNode }) => {
    const [archiveStyle, setArchiveStyle] = useState<Record<string, string>>({});
    const [postStyle, setPostStyle] = useState<Record<string, string>>({});

    return (
        <StyleContext.Provider value={{
            archiveStyle,
            postStyle,
            setArchiveStyle,
            setPostStyle
        }}>
            {children}
        </StyleContext.Provider>
    );
};

export const useStyle = () => {
    const context = useContext(StyleContext);
    if (!context) {
        throw new Error("useStyle은 StyleProvider내에서 이루어져야 합니다!");
    }
    return context;
};