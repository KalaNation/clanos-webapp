import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Controller, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import * as z from 'zod';

import { Field, FieldDescription, FieldError, FieldLabel } from './field';
import { Input } from './input';

const PASSWORD_RULES = 'Use 8+ characters with a number and a symbol';
const schema = z.object({
  email: z.email('Enter a valid email address'),
  password: z
    .string()
    .min(8, PASSWORD_RULES)
    .regex(/\d/, PASSWORD_RULES)
    .regex(/[^A-Za-z0-9]/, PASSWORD_RULES),
});
type Values = z.output<typeof schema>;

function CreateAccountForm({ onSubmit }: { onSubmit: (values: Values) => void }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });
  return (
    <form noValidate onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}>
      {(['email', 'password'] as const).map((name) => (
        <Controller
          key={name}
          name={name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={name}>{name}</FieldLabel>
              <Input {...field} id={name} aria-invalid={fieldState.invalid} />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      ))}
      <button type="submit">Create account</button>
    </form>
  );
}

describe('Field', () => {
  it('labels its control and shows a hint', () => {
    render(
      <Field>
        <FieldLabel htmlFor="tag">Clan tag</FieldLabel>
        <Input id="tag" />
        <FieldDescription>2–5 letters</FieldDescription>
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Clan tag' })).toBeInTheDocument();
    expect(screen.getByText('2–5 letters')).toBeInTheDocument();
  });

  it('shows each distinct error once, and nothing when there are none', () => {
    const { rerender } = render(
      <FieldError errors={[{ message: 'Too short' }, { message: 'Too short' }]} />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent(/^Too short$/);

    rerender(<FieldError errors={[undefined]} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  describe('with React Hook Form and Zod', () => {
    it('blocks an invalid submit and explains what to fix', async () => {
      const onSubmit = vi.fn();
      render(<CreateAccountForm onSubmit={onSubmit} />);

      await userEvent.type(screen.getByRole('textbox', { name: 'password' }), 'short');
      await userEvent.click(screen.getByRole('button', { name: 'Create account' }));

      expect(await screen.findByText('Enter a valid email address')).toBeInTheDocument();
      expect(screen.getByText(PASSWORD_RULES)).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'email' })).toBeInvalid();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('submits the parsed values once they are valid', async () => {
      const onSubmit = vi.fn();
      render(<CreateAccountForm onSubmit={onSubmit} />);

      await userEvent.type(screen.getByRole('textbox', { name: 'email' }), 'kaze@example.com');
      await userEvent.type(screen.getByRole('textbox', { name: 'password' }), 'nightfall-1');
      await userEvent.click(screen.getByRole('button', { name: 'Create account' }));

      expect(onSubmit).toHaveBeenCalledWith(
        { email: 'kaze@example.com', password: 'nightfall-1' },
        expect.anything(),
      );
    });
  });
});
