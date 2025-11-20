"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { loginUserSchema } from "@/model/user.model";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth.actions";

const formSchema = loginUserSchema;

type IFormBody = z.infer<typeof formSchema>;

const defaultValues: IFormBody = { email: "", password: "" };

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<IFormBody>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<IFormBody> = async (data) => {
    await loginAction(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>LOGIN</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@example.com"
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
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    {...field}
                  />
                </Field>
              )}
            />

            <Button type="submit">LOGIN</Button>
            <Link href="/signup" className="text-sm text-muted-foreground">Sign Up</Link>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
