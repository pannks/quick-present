import React from "react";
import styled from "styled-components";
import { SharedFile } from "../data/type";
import {
    formatDateToStr,
    getColorDay,
    getStatusByDate,
    shortenLink,
    transformName,
} from "../utils/transform";
import { Timestamp } from "firebase/firestore";
import { deleteSharedFile } from "../utils/firebase";
import { useFiles } from "../contexts/FilesContext";

type FileRowProps = {
    file: SharedFile;
    guestMode: boolean;
};

const DeleteButton = styled.button`
    opacity: 0;
    visibility: hidden; // Initially hide the button
    background-color: var(--c-red); // Adjust color as per your theme
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease; // Smooth transition effect
    position: absolute; // To position the button relative to the Row
    background-color: var(--c-danger);
    color: #fff;
    right: 5px;
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: 4rem 6rem 4fr 5fr 2fr 2fr;
    gap: 0.6rem;
    background-color: var(--c-white);
    padding: 1.2rem 2rem;
    transition: all 0.1s ease;
    font-size: 12px;
    align-items: center;
    justify-content: start;
    max-width: 80rem;
    margin: 0 auto;
    position: relative;
    &:hover {
        background-color: var(--c-grey-100);
        box-shadow: rgba(72, 76, 80, 0.2) 0px 4px 4px;

        ${DeleteButton} {
            opacity: 1;
            visibility: visible; // Show the button on hover
            transform: translateY(0); // Slide down to its natural position
        }
    }
`;

const FileName = styled.p`
    display: inline-flex;
    justify-self: flex-start;
    font-weight: 500;
    font-family: var(--f-th);
`;
const FileLink = styled.p`
    display: inline-flex;
    justify-self: flex-start;
    font-family: var(--f-en);
    text-wrap: wrap;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
`;
const DayShow = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 0.6rem;
`;

const Dot = styled.span`
    display: inline-flex;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
`;

const Badge = styled.span`
    background-color: #d7ffcf;
    color: #2eb912;
    font-weight: 600;
    border-radius: 0.9rem;
    padding: 0.2rem 1rem;
    font-size: 1.2rem;
`;

const FileRow: React.FC<FileRowProps> = ({ file, guestMode }) => {
    const { refreshFiles } = useFiles();
    const handleDelete = async () => {
        await deleteSharedFile(file.id);
        refreshFiles();
    };

    let dateStr = "";
    let colorDay = "#FFF";

    if (file.share_date !== undefined) {
        if (file.share_date instanceof Timestamp) {
            colorDay = getColorDay(file.share_date.toDate());
            dateStr = formatDateToStr(file.share_date.toDate());
        } else if (file.share_date instanceof Date) {
            dateStr = formatDateToStr(file.share_date);
        }
    }

    return (
        <Row key={file?.name}>
            <span>
                {getStatusByDate(dateStr) === "live" && <Badge>live</Badge>}
            </span>
            <p>{file.subj}</p>
            <FileName>{file.name}</FileName>
            <FileLink>{shortenLink(file.link)}</FileLink>
            <DayShow>
                <Dot style={{ backgroundColor: colorDay }}></Dot>
                {dateStr}
            </DayShow>
            <p>{transformName(file.publisher)}</p>
            {!guestMode && (
                <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            )}
        </Row>
    );
};

export default FileRow;
