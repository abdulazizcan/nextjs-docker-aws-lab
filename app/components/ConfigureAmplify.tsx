// app/components/ConfigureAmplify.tsx
"use client";

import { Amplify } from "aws-amplify";

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: "eu-north-1_2mIMhznWO",
        userPoolClientId: "6s2lme45v45u43286bh49ut4oi",
      },
    },
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
