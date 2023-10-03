import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

type FormData = {
    username: string;
    password: string;
};

const Form = styled.form`
    background-color: var(--c-white);
    max-width: 40rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.6rem;
    font-size: 1.4rem;
    border-radius: 0.6rem;
    & > h4 {
        margin-bottom: 1rem;
    }
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

const VerifyForm = () => {
    const { verify } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        console.log(data);
        verify(data.username, data.password);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h4>Log In With TU Account</h4>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    placeholder="65xxxxxxx"
                    {...register("username", {
                        required: "Username is required",
                    })}
                />
                {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <Button type="submit">Verify</Button>
        </Form>
    );
};
export default VerifyForm;
