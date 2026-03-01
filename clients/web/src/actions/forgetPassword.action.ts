import { forgetPassword } from '@/services/auth';
import { ActionFunctionArgs } from 'react-router';

export async function forgetPasswordAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email'));

  const { data, error } = await forgetPassword({ email });

  if (error) return error;
  return data;
}
