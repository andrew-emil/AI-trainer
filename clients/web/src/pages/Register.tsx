import FormWrapper from '@/components/forms/FormWrapper';
import TraineeForm from '@/components/forms/TraineeForm';
import TrainerForm from '@/components/forms/TrainerForm';
import EgyptianDivider from '@/components/ui/EgyptianDivider';
import { Dumbbell, Users } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router';

const Register = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState<'trainer' | 'trainee'>(
    (searchParams.get('role') as 'trainer' | 'trainee') || 'trainee',
  );

  return (
    <FormWrapper
      title={t('auth.register.title')}
      subtitle={t('auth.register.subtitle')}
    >
      {/* Role selector */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setRole('trainee')}
          className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-300 ${
            role === 'trainee'
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border/50 text-muted-foreground hover:border-primary/50'
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          <span className="font-heading font-semibold text-sm">
            {t('auth.register.trainee')}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setRole('trainer')}
          className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-300 ${
            role === 'trainer'
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border/50 text-muted-foreground hover:border-primary/50'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-heading font-semibold text-sm">
            {t('auth.register.trainer')}
          </span>
        </button>
      </div>

      {/* Form */}
      {role === 'trainee' ? <TraineeForm /> : <TrainerForm />}

      <EgyptianDivider className="my-6" />

      {/* Login link */}
      <p className="text-center font-body text-muted-foreground">
        {t('auth.register.hasAccount')}{' '}
        <Link
          to="/login"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          {t('auth.register.signIn')}
        </Link>
      </p>
    </FormWrapper>
  );
};

export default Register;
