import { useState, useEffect } from 'react';
import {
  Box,
  Link,
  Typography,
  useTheme,

} from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import { Layout, PageContainer, Card, Content } from '@/common/components/layout/noAuth/Layout';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useFonosterClient } from '@/common/sdk/hooks/useFonosterClient';
import { Button } from '@stories/button/Button';
import { OAuthState } from '@/types/oauth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InputContext } from '@/common/hooksForm/InputContext';
import { AuthProvider } from '@/common/sdk/auth/AuthClient';
import { OAUTH_CONFIG } from '@/config/oauth';

interface LoginForm {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const GITHUB_CONFIG = OAUTH_CONFIG.signin;

const LoginPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { authentication } = useFonosterClient();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const methods = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = methods;

  const handleGitHubSignIn = () => {
    const stateData: OAuthState = {
      provider: AuthProvider.GITHUB,
      nonce: Math.random().toString(36).substring(2),
      action: 'signin'
    };
    const stateEncoded = encodeURIComponent(JSON.stringify(stateData));
    const authUrl = `${GITHUB_CONFIG.authUrl}?client_id=${GITHUB_CONFIG.clientId}&redirect_uri=${encodeURIComponent(GITHUB_CONFIG.redirectUriCallback)}&scope=${GITHUB_CONFIG.scope}&state=${stateEncoded}`;
    window.location.href = authUrl;
  };

  const onSubmit = async (data: LoginForm) => {
    if (isRedirecting) return;
    try {
      setIsRedirecting(true);
      await authentication.signIn({
        credentials: { username: data.email, password: data.password },
        provider: AuthProvider.CREDENTIALS,
        oauthCode: ''
      });
      await router.replace('/workspace/');
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Authentication failed'
      });
    } finally {
      setIsRedirecting(false);
    }
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  return (
    <Layout methods={methods}>
      <PageContainer>
        <Card>
          <Content title="Sign In">
            <InputContext
              name="email"
              label="Email Address"
              type="email"
              id="email"
              helperText="Please enter your email address"
            />

            <InputContext
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText="Please enter your password"
            />
            <Box sx={{ textAlign: 'right', mb: 2 }}>
              <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  color="secondary.700"
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'primary.main'
                    }
                  }}
                >
                  Forgot password?
                </Typography>
              </Link>
            </Box>
            {errors.root && (
              <Typography color="error" variant="body2" align="center">
                {errors.root.message}
              </Typography>
            )}
            <Button
              onClick={handleSubmit(onSubmit)}
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting || isRedirecting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
            <Box sx={{
              position: 'relative',
              textAlign: 'center',
              my: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.12)'
                  : 'rgba(255, 255, 255, 0.12)',
              }
            }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  px: 2,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                Or
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              onClick={handleGitHubSignIn}
              disabled={isRedirecting}
            >
              Sign in with GitHub
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                color="text.secondary"
                display="inline"
              >
                Don't have an account?{' '}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                color="primary"
                onClick={handleSignUpClick}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Sign up here
              </Typography>
            </Box>
          </Content>
        </Card>
      </PageContainer>
    </Layout >
  );
};

export default LoginPage;
