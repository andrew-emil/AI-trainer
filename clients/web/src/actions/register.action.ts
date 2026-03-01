import { tokenStore } from '@/store/tokenStore';
import { RegisterAsTraineeDto, RegisterAsTrainerDto } from '@/types/auth';
import { Gender, TraineeGoal, UserRole } from '@/types/entities';
import { ActionFunctionArgs } from 'react-router';
import { registerAsTrainee, registerAsTrainer } from '../services/auth';

type RawForm = Record<string, FormDataEntryValue>;

const str = (v: FormDataEntryValue | undefined): string =>
  typeof v === 'string' ? v : '';

const trimmed = (v: FormDataEntryValue | undefined): string => str(v).trim();

const asOptionalHttpUrl = (
  v: FormDataEntryValue | undefined,
): string | undefined => {
  const s = trimmed(v);
  if (!s || s === 'undefined' || s === 'null') return undefined;
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:' ? s : undefined;
  } catch {
    return undefined;
  }
};

const asOptionalString = (
  v: FormDataEntryValue | undefined,
): string | undefined => {
  const s = trimmed(v);
  if (!s || s === 'undefined' || s === 'null') return undefined;
  return s;
};

const asOptionalNumber = (
  v: FormDataEntryValue | undefined,
): number | undefined => {
  const s = trimmed(v);
  if (!s) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
};

const parseJsonArray = <T>(v: FormDataEntryValue | undefined): T[] => {
  const s = trimmed(v);
  if (!s) return [];
  try {
    const parsed = JSON.parse(s);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
};

const normalizeRole = (v: FormDataEntryValue | undefined): UserRole | null => {
  const s = trimmed(v).toLowerCase();
  if (s === UserRole.trainer) return UserRole.trainer;
  if (s === UserRole.trainee) return UserRole.trainee;
  return null;
};

const pickBaseUser = (raw: RawForm) => ({
  firstName: trimmed(raw.firstName) || '',
  lastName: trimmed(raw.lastName) || '',
  username: trimmed(raw.username) || '',
  email: trimmed(raw.email) || '',
  password: trimmed(raw.password) || '',
  avatar: asOptionalHttpUrl(raw.avatar), // omit if invalid/empty
  avatarPublicId: asOptionalString(raw.avatarPublicId),
  gender: (asOptionalString(raw.gender) as Gender | undefined) ?? undefined,
});

const toTrainee = (
  raw: RawForm,
  role: UserRole,
): RegisterAsTraineeDto => ({
  ...pickBaseUser(raw),
  goal: (asOptionalString(raw.goal) as TraineeGoal) ?? TraineeGoal.maintenance,
  // If your backend expects null, change `undefined` -> `null` here and update types accordingly.
  heightCm: (asOptionalNumber(raw.heightCm) ?? 0) as number,
  role
});

const toTrainer = (
  raw: RawForm,
  role: UserRole,
): RegisterAsTrainerDto => ({
  ...pickBaseUser(raw),
  bio: trimmed(raw.bio) || '',
  experienceYears: (asOptionalNumber(raw.experienceYears) ?? 0) as number,
  certifications: parseJsonArray<
    NonNullable<RegisterAsTrainerDto['certifications']>[number]
  >(raw.certifications),
  transformations: parseJsonArray<
    NonNullable<RegisterAsTrainerDto['transformations']>[number]
  >(raw.transformations),
  role
});

export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData) as RawForm;

  const role = normalizeRole(raw.role);
  if (!role) {
    return {
      statusCode: 400,
      message: 'role must be one of the following values: trainer, trainee',
    };
  }

  if (role === UserRole.trainee) {
    const payload = toTrainee(raw, role);
    const { data, error } = await registerAsTrainee(payload);

    if (error) return error;

    if (data?.token) {
      tokenStore.set(data.token);
      return data.token;
    }
    return null;
  }

  if (role === UserRole.trainer) {
    const payload = toTrainer(raw, role);
    console.log(payload);
    const { data, error } = await registerAsTrainer(payload);
    console.log(error)

    if (error) return error;
    return data?.message || 'Success';
  }
}
