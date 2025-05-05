import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "../ui/textarea";
type FormgProps = {
  type?: "text" | "email" | "password" | "number";
  inputType?: "input" | "textarea" | "select";
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  name: string;
  lable?: string;
  placeholder?: string;
  options?: { value: string; label: string; id: string }[];
  lines?: number;
};

const FormGenerator = ({
  type,
  inputType,
  register,
  errors,
  name,
  lable,
  placeholder,
  options,
  lines
}: FormgProps) => {
  switch (inputType) {
    case "input":
      return (
        <Label
          className=" flex flex-col gap-4  items-start   w-full  text-neutral-300 "
          htmlFor={`input-${lable}`}
        >
          {lable && lable}
          <Input
            id={`input-${lable}`}
            type={type}
            placeholder={placeholder}
            className=" bg-transparent border-gray-600 text-gray-300 "
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className=" text-red-500 mt-2 ">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
      break;
    case "select":
      return (
        <Label
          className=" flex flex-col items-start gap-2 text-neutral-300 "
          htmlFor={`input-${lable}`}
        >
          {lable && lable}
          <select
            id={`input-${lable}`}
            className=" bg-transparent w-full border-[1px] p-3 rounded-lg "
            {...register(name)}
          >
            {options?.length &&
              options?.map((option) => (
                <option
                  key={option.id}
                  value={option.value}
                  className="dark:bg-muted]"
                >
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className=" text-red-500 mt-2 ">
                {" "}
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
      break;
    case "textarea":
      return (
        <Label
          className=" flex flex-col gap-2 items-start  text-neutral-300 "
          htmlFor={`input-${lable}`}
        >
          {lable && lable}
          <Textarea
            id={`input-${lable}`}
            className=" bg-transparent border-gray-500 text-gray-300 "
            {...register(name)}
            rows={lines}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className=" text-red-500 mt-2 ">
                {" "}
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
      break;
    default:
      break;
  }
};

export default FormGenerator;
