import { z } from 'zod';

export const USER_DTO_SCHEMA = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string(),
    email: z.string(),
}).required();

export type UserDtoSchema = z.infer<typeof USER_DTO_SCHEMA>