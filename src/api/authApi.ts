import { IAuthResponse, ILoginInput, ISignUpInput, IUser } from "../types";

/**
 * Fake auth endpoints.
 *
 * These simulate a real backend so the app is fully demo-able without a server.
 * Replace the bodies with real `fetch`/axios calls when an API exists — keep the
 * same signatures so callers don't change.
 */

const FAKE_TOKEN = "fake-jwt-token";
const MOCK_DELAY_MS = 1500;

interface IDatabaseUser extends IUser {
  password: string;
}

// "Persistent" in-memory database. Resets on page reload — that's expected for a mock.
const database: IDatabaseUser[] = [
  {
    id: "1",
    email: "demo@lancemates.app",
    password: "Demo123!",
    name: "Demo User",
    description: "Demo account created for trying out the login flow.",
  },
];

let nextUserId = 2;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function toPublicUser(user: IDatabaseUser): IUser {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}

async function simulateRequest<T>(handler: () => T): Promise<T> {
  await delay(MOCK_DELAY_MS);
  return handler();
}

/** POST /auth/login */
export async function login(input: ILoginInput): Promise<IAuthResponse> {
  return simulateRequest(() => {
    const email = input.email.trim().toLowerCase();
    const user = database.find(
      (u) => u.email.toLowerCase() === email && u.password === input.password,
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    return { user: toPublicUser(user), token: FAKE_TOKEN };
  });
}

/** POST /auth/signup */
export async function signUp(input: ISignUpInput): Promise<IAuthResponse> {
  return simulateRequest(() => {
    const email = input.email.trim().toLowerCase();
    const emailTaken = database.some((u) => u.email.toLowerCase() === email);

    if (emailTaken) {
      throw new Error("An account with this email already exists.");
    }

    const user: IDatabaseUser = {
      id: String(nextUserId++),
      email,
      password: input.password,
      name: input.name.trim(),
      description: input.description?.trim() || undefined,
    };
    database.push(user);

    return { user: toPublicUser(user), token: FAKE_TOKEN };
  });
}