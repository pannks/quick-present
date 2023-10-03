import styled from "styled-components";
import VerifyForm from "../components/VerifyForm";
import { useAuth } from "../contexts/AuthContext";
import AddSharedFileForm from "../components/AddSharedFileForm";
import { useFiles } from "../contexts/FilesContext";
import FileRow from "../components/FileRow";
import { useState } from "react";
import { transformName } from "../utils/transform";

type FormSectionProps = {
    isVisible: boolean;
};

const PageLayout = styled.div`
    height: 100%;
    text-align: initial;
    background-color: #fafafa;
`;

const FileSection = styled.div`
    padding: 2rem;
    height: 100%;
    text-align: center;
`;
const FormSection = styled.div<FormSectionProps>`
    background-color: #ffffff;
    height: min-content;
    position: fixed;
    bottom: 14%;
    right: 2rem;
    width: 0;
    overflow: hidden;
    border-radius: 0.9rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    ${(props) =>
        props.isVisible &&
        `
            padding: 2rem;
            width: 40rem;
        `}
`;
const Htxt = styled.h4`
    font-size: 1.6rem;
    margin: 2rem 0;
    font-family: var(--f-th);
`;

const HdRow = styled.div`
    background-color: var(--c-primary-light);
    display: grid;
    grid-template-columns: 6rem 4fr 5fr 2fr 2fr;
    gap: 0.6rem;
    padding: 0.7rem 2rem;
    transition: all 0.1s ease;
    font-size: 12px;
    align-items: center;
    justify-content: start;
    max-width: 80rem;
    margin: 0 auto;
    position: relative;
    font-family: var(--f-th);
`;

const FloatingButton = styled.button`
    position: fixed;
    right: 1rem;
    bottom: 30%;
    background-color: var(--c-primary-2);
    font-family: var(--f-th);
    color: #fff;
    border: none;
    border-radius: 0.6rem;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    font-size: 1.4rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const HeaderSection = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    font-family: var(--f-th);
    font-size: 1.4rem;
    padding: 1.2rem 2rem;
    background-color: #e0f5ff;
`;

const MessageBox = styled.div`
    background-color: #fff8e0;
    font-family: var(--f-th);
    font-size: 1.2rem;
    padding: 2rem 2rem;
`;

const ManageRoute = () => {
    const [isFormPaneVisible, setIsFormPaneVisible] = useState(false);
    const { userInfo } = useAuth();
    const { files, loading } = useFiles();

    return (
        <PageLayout>
            <MessageBox>
                <h4>โปรดทราบ</h4>
                - การฝากไฟล์เพื่อนำเสนอในคลาสเรียน
                ผู้อื่นจะไม่ทราบลิ้งค์งานของคุณ
                เพียงแต่จะทราบว่ามีไฟล์ใดบ้างที่จะถูกแสดงขึ้นบนหน้าหลัก <br />-
                ไฟล์ที่เลยกำหนดวันนำเสนอจะถูกลบออกอัตโนมัติ
            </MessageBox>

            <FileSection>
                <Htxt>ไฟล์ทั้งหมด</Htxt>
                <HdRow>
                    <p>วิชา</p>
                    <p>ชื่อไฟล์</p>
                    <p>ลิ้งค์</p>
                    <p>วันที่พรีเซ้นต์</p>
                    <p>ผู้แชร์</p>
                </HdRow>

                {files && (
                    <>
                        {files?.map((file, i) => (
                            <FileRow
                                key={i}
                                file={file}
                                guestMode={userInfo == null}
                            />
                        ))}
                    </>
                )}
                {!loading && files.length === 0 && <p>ไม่มีไฟล์ฝากเอาไว้</p>}
            </FileSection>

            <FormSection isVisible={isFormPaneVisible}>
                <Htxt>ฝากไฟล์ของคุณ</Htxt>
                {userInfo ? (
                    <>
                        <HeaderSection>
                            <p>สวัสดีคุณ {userInfo?.displayname_th}</p>
                            <p>
                                จะแสดงชื่อคุณ:{"  "}
                                {transformName(userInfo?.displayname_en)}
                            </p>
                        </HeaderSection>
                        <AddSharedFileForm />
                    </>
                ) : (
                    <>
                        <HeaderSection>
                            <p>ล็อกอินด้วยเลขทะเบียนมหาลัยเพื่อยืนยันตัวตน</p>
                        </HeaderSection>
                        <VerifyForm />
                    </>
                )}
            </FormSection>
            <FloatingButton
                onClick={() => setIsFormPaneVisible(!isFormPaneVisible)}
            >
                {isFormPaneVisible ? ">" : "+ ฝากไฟล์ของคุณ"}
            </FloatingButton>
        </PageLayout>
    );
};

export default ManageRoute;
