import styled from "styled-components";
import LinkCard from "../components/LinkCard";
import { useFiles } from "../contexts/FilesContext";
import { getStatusByDate } from "../utils/transform";
import { Timestamp } from "firebase/firestore";

const Container = styled.div`
    margin: 8rem auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
    gap: 2rem;
    justify-items: center;
    max-width: 80rem;
    font-family: var(--f-th);
`;

const Headline = styled.div`
    font-family: var(--f-th);
    padding: 4rem 10vw;
    & > h4 {
        color: #2b2b2b;
        margin: 1rem;
    }
`;

const HomeRoute = () => {
    const { files, loading } = useFiles();

    return (
        <>
            <Headline>
                <p>
                    ต้องการพรีเซ้นงาน แต่ต้อง login canva ยุ่งยากจัง
                    ให้เราช่วยดีกว่า
                </p>
                <h4> h4.web.app เปิดแป็ป เจอปุ๊ป!</h4>
            </Headline>
            {loading && <p>loading...</p>}
            <Container>
                {files && (
                    <>
                        {files
                            ?.filter(
                                (file) =>
                                    getStatusByDate(
                                        file.share_date instanceof Timestamp
                                            ? file.share_date.toDate()
                                            : file.share_date
                                    ) === "live"
                            )
                            .map((file, i) => (
                                <LinkCard key={i} file={file} />
                            ))}
                    </>
                )}
                {!loading &&
                    files?.filter(
                        (file) =>
                            getStatusByDate(
                                file.share_date instanceof Timestamp
                                    ? file.share_date.toDate()
                                    : file.share_date
                            ) === "live"
                    ).length === 0 && <p>ไม่มีไฟล์สำหรับนำเสนอในวันนี้</p>}
            </Container>
        </>
    );
};

export default HomeRoute;
