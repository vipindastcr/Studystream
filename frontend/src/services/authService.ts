
import { api } from "./api";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: "user" | "tutor";
}

interface VerifyOtpPayload {
  pendingId: string;
  otp: string;
}

export const registerUser = async (data: RegisterData) => {
  const payload = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone_number: data.phone,
    password: data.password,
    role: data.role,
  };

  const response = await api.post("/users/register", payload);
  return response.data;
};

export const verifyOtp = async ({ pendingId, otp }: VerifyOtpPayload) => {
  const response = await api.post("/users/verify-otp", { pendingId, otp });
  return response.data;
};
