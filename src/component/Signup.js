import React from "react";
import React, { useState } from "react";
import "../../supabase"
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Modal,
} from "antd";
const { Option } = Select;
import state from "../component/utils/states.json";
import { Link, useNavigate } from "react-router-dom";

const residences = state;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function Signup() {

    const navigate = useNavigate();
    const [validateStatus, setValidateStatus] = useState("");
    const [form] = Form.useForm();

    const showSuccessModal = () => {
        Modal.success({
            title: "Registration Successful",
            content: "Thank you for Registration ",
            onOk() {
                navigate("/login"); // Navigate to login page on OK
            },
        });
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="91">+91</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = async (values) => {
        try {
            // Sign up user with Supabase
            const { user, error: signupError } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
            });

            if (signupError) {
                throw signupError;
            }

            // Insert additional user data into the 'users' table
            const { error: insertError } = await supabase
                .from('users')
                .insert([
                    {
                        email: values.email,
                        phone: values.phone,
                        residence: values.residence,
                        pin: values.pin,
                        gender: values.gender,
                    }
                ]);

            if (insertError) {
                throw insertError;
            }

            showSuccessModal();
            console.log("SignUp:", user);
        } catch (error) {
            console.error("SignUp:", error.message);
        }
    };


    return (
        <>
            <Form
                className="w-full p-6 grid justify-center align-center"
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ["Select State"],
                    prefix: "91",
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("The two passwords that you entered do not match!")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="residence"
                    label="State"
                    rules={[
                        {
                            type: "array",
                            required: true,
                            message: "Please select your state!",
                        },
                    ]}
                >
                    <Cascader options={residences} />
                </Form.Item>

                <Form.Item
                    name="pin"
                    label="Pin Code"
                    validateStatus={validateStatus}
                    hasFeedback
                    rules={[
                        {
                            required: false,
                            message: "Please input your pin code!",
                        },
                    ]}
                >
                    <Input
                        type="number"
                        showCount
                        maxLength={6}
                        allowClear
                        status={validateStatus}
                        style={{
                            width: "100%",
                        }}
                        onChange={(e) => {
                            if (e.target.value.length === 6) {
                                const pinCode = e.target.value;
                                fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log(data);
                                        // Handle the API response data
                                        if (data[0].Status === "Success") {
                                            setValidateStatus("success");
                                            const postalData = data[0]?.PostOffice[0]?.District;
                                            const successText = document.getElementById("resNode");
                                            successText.append("Location:", postalData);
                                            console.log(postalData);
                                        } else {
                                            setValidateStatus("error");
                                            // const failedText= document.createElement("p");
                                            // const failedNode = document.createTextNode("Not a valid Pin Code!");
                                            // failedText.append(failedNode)
                                        }
                                    })
                                    .catch((error) => {
                                        setValidateStatus("error");
                                        // const errorText= document.createElement("p");
                                        // const errordNode = document.createTextNode("Please try again!");
                                        // errorText.append(errordNode);
                                    });
                            }
                        }}
                    />
                    <span id="resNode"> </span>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        showCount
                        maxLength={10}
                        addonBefore={prefixSelector}
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required: false,
                            message: "Please select gender!",
                        },
                    ]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error("Should accept agreement")),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <Link to="agreement">agreement</Link>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Signup
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
