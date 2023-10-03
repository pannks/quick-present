import { Timestamp } from "firebase/firestore";

export type SharedFile = {
    id: string;
    name: string;
    link: string;
    publisher: string;
    share_time: Timestamp;
    share_date: Date | Timestamp;
    subj: string;
    status: string;
};

export type StudentInfo = {
    status: boolean;
    message: string;
    type: string;
    username: string;
    tu_status: string;
    statusid: string;
    displayname_th: string;
    displayname_en: string;
    email: string;
    department: string;
    faculty: string;
};
