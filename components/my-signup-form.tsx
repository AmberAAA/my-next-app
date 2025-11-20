"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signupAction } from "@/app/actions/auth.actions";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type IFormBody = z.infer<typeof formSchema>;

const defaultValues: IFormBody = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const MySignupForm = () => {
  const { handleSubmit, control } = useForm<IFormBody>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });


  const onSubmit: SubmitHandler<IFormBody> = async (data) => {
    await signupAction(data)
  };

  return (
    <Card>
      <CardHeader>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="name">Login Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    {...field}
                  />
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="text"
                    placeholder="John Doe"
                    required
                    {...field}
                  />
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="email"
                    type="password"
                    placeholder="John Doe"
                    required
                    {...field}
                  />
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="John Doe"
                    required
                    {...field}
                  />
                </Field>
              )}
            />
            <Button type="submit">Signup</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
