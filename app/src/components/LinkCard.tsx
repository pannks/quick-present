import React from "react";
import styled from "styled-components";
import { HiDocumentChartBar } from "react-icons/hi2";
import { SharedFile } from "../data/type";
import { transformName } from "../utils/transform";

type LinkCardProps = {
    file: SharedFile;
};

const Card = styled.div`
    position: relative;
    display: block;
    background-color: var(--c-white);
    padding: 20px;
    font-size: 14px;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width: 100%;
    min-width: 22rem;
    min-height: 11rem;
    cursor: pointer;
    transition: all 0.1s ease;
    &:hover {
        box-shadow: var(--c-primary) 4px 4px 0;
        transform: scale(1.02);
        outline: 1px solid var(--c-primary);
    }
`;

const SubjTag = styled.span`
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: var(--c-primary-light);
    padding: 0.2rem 1.2rem;
    border-radius: 0.9rem;
    font-size: 1.2rem;
`;
const Publisher = styled.p`
    padding: 0.2rem 0;
    border-radius: 0.9rem;
    font-size: 1rem;
    text-align: start;
`;

const LinkCard: React.FC<LinkCardProps> = ({ file }) => {
    return (
        <>
            <Card key={file?.name} onClick={() => window.open(file.link)}>
                <HiDocumentChartBar size={28} />
                {file.name && <h4>{file.name}</h4>}
                <div className="link">{file.link}</div>
                <Publisher>
                    published by {transformName(file.publisher)}
                </Publisher>
                <SubjTag>{file.subj}</SubjTag>
            </Card>
        </>
    );
};

export default LinkCard;
