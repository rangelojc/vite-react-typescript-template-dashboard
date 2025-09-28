import { ListResponse, PaginationRequest } from "@/api/types";
import useCustomQuery from "@/api/useCustomQuery";
import { createPaginationRequest } from "@/functions/factories";
import { User } from "../dto/users";

export const USERS_QUERY_KEY = "users" as const;

const useUsersQuerySample = (payload: PaginationRequest) => {
  const { query } = createPaginationRequest(payload);

  return useCustomQuery<ListResponse<User[]>>(
    [USERS_QUERY_KEY, query],
    async () => {
      // simulate async call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const dummyData: ListResponse<User[]> = {
        data: [
          {
            id: 1,
            uuid: "uuid-1111",
            name: "John Doe",
            email: "john.doe@example.com",
            password_hash: "hashed_pw_123",
            promotion_code: null,
            my_promotion_code: "PROMO123",
            is_active: 1,
            is_blocked: 0,
            role: "admin", // assuming UserRole is a string enum or union
            created_at: "2024-01-01T10:00:00Z",
            last_login_at: "2024-09-01T12:00:00Z",
            login_fail_count: 0,
            terms_accepted: 1,
            recaptcha_score: 0.95,
          },
          {
            id: 2,
            uuid: "uuid-2222",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password_hash: "hashed_pw_456",
            promotion_code: "REF123",
            my_promotion_code: null,
            is_active: 1,
            is_blocked: 0,
            role: "user",
            created_at: "2024-02-15T14:30:00Z",
            last_login_at: null,
            login_fail_count: 1,
            terms_accepted: 1,
            recaptcha_score: null,
          },
        ],
        pagination: {
          page: payload.page ?? 1,
          pageSize: payload.pageSize ?? 10,
          totalCount: 2,
          totalPages: 1,
        },
      };

      return dummyData;
    }
  );
};

export default useUsersQuerySample;
