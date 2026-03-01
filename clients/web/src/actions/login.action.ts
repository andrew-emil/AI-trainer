import { login } from '@/services/auth';
import { tokenStore } from '@/store/tokenStore';
import { ActionFunctionArgs } from 'react-router';

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const rememberMe = Boolean(formData.get('rememberMe'));

  const { data, error } = await login({ email, password });

  if (error) return error;

  if (data?.token) {
    if (rememberMe) tokenStore.set(data.token);
    return data.token;
  }

  return null;
}
