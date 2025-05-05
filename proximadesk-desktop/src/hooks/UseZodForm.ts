// import { UseMutateFunction } from "@tanstack/react-query";
import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

export const UseZodForm = <
  T extends ZodType<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >
>(
  schema: T,
  defaultValues?: Partial<z.infer<T>> // ✅ Correctly infer default values
) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<z.infer<T>>, // ✅ Explicitly cast to DefaultValues
  });


  return {control, register, watch, errors, handleSubmit, reset };
};
