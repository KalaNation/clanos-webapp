import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Controller, useForm } from 'react-hook-form';
import { expect, fn, userEvent } from 'storybook/test';
import * as z from 'zod';

import { Button } from './button';
import { Checkbox } from './checkbox';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from './field';
import { Input } from './input';
import { Switch } from './switch';

const signInSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Use at least 8 characters'),
  remember: z.boolean(),
});

function SignInForm({ onSubmit }: { onSubmit: (values: z.output<typeof signInSchema>) => void }) {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  return (
    <form
      noValidate
      onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
      className="w-full max-w-sm"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="field-story-email">Email</FieldLabel>
              <Input
                {...field}
                id="field-story-email"
                type="email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="field-story-password">Password</FieldLabel>
              <Input
                {...field}
                id="field-story-password"
                type="password"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="remember"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                id="field-story-remember"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel htmlFor="field-story-remember">Keep me signed in</FieldLabel>
            </Field>
          )}
        />
        <Button type="submit" size="lg" className="w-full">
          Sign in
        </Button>
      </FieldGroup>
    </form>
  );
}

const meta = {
  title: 'UI/Field',
  component: Field,
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHint: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="field-story-tag">Clan tag</FieldLabel>
      <Input id="field-story-tag" placeholder="EMBR" />
      <FieldDescription>2–5 letters, shown as [EMBR] next to your name.</FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field className="max-w-sm" data-invalid>
      <FieldLabel htmlFor="field-story-uid">Player UID</FieldLabel>
      <Input id="field-story-uid" defaultValue="5281 9047 331" aria-invalid />
      <FieldError>UID must be 12 digits.</FieldError>
    </Field>
  ),
};

export const Preferences: Story = {
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend>Notifications</FieldLegend>
      <Field orientation="horizontal" className="justify-between">
        <FieldLabel htmlFor="field-story-applications">New applications</FieldLabel>
        <Switch id="field-story-applications" defaultChecked />
      </Field>
      <Field orientation="horizontal" className="justify-between">
        <FieldLabel htmlFor="field-story-announcements">Announcements</FieldLabel>
        <Switch id="field-story-announcements" />
      </Field>
      <FieldSeparator>or</FieldSeparator>
    </FieldSet>
  ),
};

const submitSignIn = fn();

/** Sign in (D01/M01) with React Hook Form + Zod: errors appear after the first submit. */
export const SignIn: Story = {
  render: () => <SignInForm onSubmit={submitSignIn} />,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));
    await expect(await canvas.findByText('Enter a valid email address')).toBeVisible();
    await expect(canvas.getByLabelText('Email')).toBeInvalid();
    await expect(submitSignIn).not.toHaveBeenCalled();
  },
};
