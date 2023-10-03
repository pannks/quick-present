import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { createSharedFile } from "../utils/firebase";
import { useAuth } from "../contexts/AuthContext";
import { useFiles } from "../contexts/FilesContext";
import ReactDatePicker from "react-datepicker";

type FormData = {
    name: string;
    link: string;
    subj: string;
    status: string;
    share_date: Date;
};

const Form = styled.form`
    background-color: var(--c-white);
    max-width: 40rem;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.6rem;
    font-size: 1.4rem;
    border-radius: 0.6rem;
`;
const Button = styled.button`
    padding: 0.6rem 1.2rem;
    background-color: var(--c-primary-2);
    font-size: 1.4rem;
    border-radius: 0.6rem;
    font-family: var(--f-th);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    &:hover {
        background-color: var(--c-primary-hv);
    }
`;

const AddSharedFileForm = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const { userInfo } = useAuth();
    const { refreshFiles } = useFiles();

    useEffect(() => {
        register("share_date");
    }, [register]);

    const onSubmit = async (data: FormData) => {
        if (userInfo) {
            const fileData = {
                ...data,
                id: "",
                status: "active",
                publisher: userInfo.displayname_en,
                share_time: new Date(),
            };
            await createSharedFile(fileData);
            refreshFiles();
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>ชื่อไฟล์</label>
                <input
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
                <label>ลิ้งค์งาน</label>
                <input
                    {...register("link", { required: "Link is required" })}
                />
                {errors.link && <p>{errors.link.message}</p>}
            </div>

            <div>
                <label>วิชา</label>
                <input
                    {...register("subj", { required: "Subject is required" })}
                />
                {errors.subj && <p>{errors.subj.message}</p>}
            </div>
            <div>
                <label>วันนำเสนองาน</label>
                <Controller
                    name="share_date"
                    control={control}
                    defaultValue={new Date()} // You can set this to whatever you like or omit it
                    render={({ field }) => (
                        <ReactDatePicker
                            selected={field.value}
                            onChange={(date: Date) => field.onChange(date)} // This is where the integration happens
                        />
                    )}
                />
            </div>
            <Button type="submit">Add File</Button>
        </Form>
    );
};

export default AddSharedFileForm;
