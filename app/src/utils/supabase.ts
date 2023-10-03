import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getSharedFiles = async () => {
    const { data: shared_files, error } = await supabase
        .from("shared_files")
        .select("id, url, password");
    if (error) {
        console.log(error);
    }

    return shared_files;
};
