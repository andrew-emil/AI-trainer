import { resetPassword } from '@/services/auth';
import { ActionFunctionArgs } from 'react-router';

export async function resetPasswordAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const token = String(formData.get('token'));
  const password = String(formData.get('password'));

  const { data, error } = await resetPassword({ token, password });

  if (error) return error;
  return data;
}
