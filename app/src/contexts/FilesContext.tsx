import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { getSharedFiles } from "../utils/firebase";
import { SharedFile } from "../data/type";

type FilesContextType = {
    files: SharedFile[];
    refreshFiles: () => void;
    loading: boolean;
};

const FilesContext = createContext<FilesContextType | undefined>(undefined);

export const FilesProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [files, setFiles] = useState<SharedFile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Function to refresh the files list
    const refreshFiles = async () => {
        setLoading(true); // Start the loading state
        try {
            const fetchedFiles = await getSharedFiles();
            setFiles(fetchedFiles);
        } catch (error) {
            console.error("Fetching files failed:", error);
            // Handle error appropriately
        } finally {
            setLoading(false); // End the loading state
        }
    };

    useEffect(() => {
        refreshFiles(); // Fetch files when the component mounts
    }, []); // The empty dependency array ensures this effect runs only once

    return (
        <FilesContext.Provider value={{ files, refreshFiles, loading }}>
            {children}
        </FilesContext.Provider>
    );
};

export const useFiles = () => {
    const context = useContext(FilesContext);
    if (!context) {
        throw new Error("useFiles must be used within a FilesProvider");
    }
    return context;
};
