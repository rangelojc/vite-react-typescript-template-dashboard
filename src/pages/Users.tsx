import { User } from "@/api/dto/users";
import { USERS_QUERY_KEY } from "@/api/queries/useUsersQuery";
import useUsersQuerySample from "@/api/queries/useUsersQuerySample";
import BooleanBadge from "@/components/BooleanBadge";
import CustomHelmet from "@/components/CustomHelmet";
import { FormattedDateCell } from "@/components/FormattedDateCell";
import {
  ContentBox,
  ContentHeader,
  ContentTitle,
  PageHeader,
  Wrapper,
} from "@/components/LayoutWidgets";
import Pagination, { PaginationStatus } from "@/components/Pagination";
import { SearchInputWithFields } from "@/components/SearchInputWithFields";
import { Show } from "@/components/Show";
import TableSkeleton from "@/components/TableSkeleton";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import DataTableCrudActions from "@/features/DataTableCrudActions";
import ExcelExportButton from "@/features/ExcelExportButton";
import { MobileSidebarButton } from "@/features/Sidebar/Sidebar";
import UpdateUserDialog from "@/features/Users/UpdateUserDialog";
import useTableStates from "@/hooks/useTableStates";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Users = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const {
    page,
    setPage,
    search,
    handleSearchChange,
    sortField,
    sortOrder,
    setSortField,
    setSortOrder,
    searchField,
    setSearchField,
  } = useTableStates({
    defaultSortField: "email",
    defaultSearchField: "email",
  });

  const { data: rsp, isLoading } = useUsersQuerySample({
    pageSize: 20,
    page,
    searchField,
    search,
    sortBy: sortField,
    sortOrder,
  });

  const list = rsp?.data;
  const pagination = rsp?.pagination;
  const userRef = useRef<User>(null);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
  }, [search, page, sortField, sortOrder]);

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: t("ID"),
      },
      {
        accessorKey: "uuid",
        header: t("UUID"),
      },
      {
        accessorKey: "name",
        header: t("Name"),
      },
      {
        accessorKey: "email",
        header: t("Email"),
      },
      {
        accessorKey: "password_hash",
        header: t("Password Hash"),
        cell: () => <span>***********</span>,
      },
      {
        accessorKey: "role",
        header: t("Role"),
      },
      {
        accessorKey: "promotion_code",
        header: t("Promotion Code"),
        cell: ({ row }) =>
          !!row.getValue("promotion_code") ? (
            <Badge variant="secondary">{row.getValue("promotion_code")}</Badge>
          ) : (
            "-"
          ),
      },
      {
        accessorKey: "my_promotion_code",
        header: t("My Promotion Code"),
        cell: ({ row }) =>
          !!row.getValue("my_promotion_code") ? (
            <Badge variant="secondary">
              {row.getValue("my_promotion_code")}
            </Badge>
          ) : (
            "-"
          ),
      },
      {
        accessorKey: "is_active",
        header: t("Active"),
        cell: ({ row }) => <BooleanBadge value={row.getValue("is_active")} />,
      },
      {
        accessorKey: "is_blocked",
        header: t("Blocked"),
        cell: ({ row }) => <BooleanBadge value={row.getValue("is_blocked")} />,
      },
      {
        accessorKey: "last_login_at",
        header: "Last Login",
        cell: ({ row }) => (
          <FormattedDateCell date={row.getValue("last_login_at")} />
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => (
          <FormattedDateCell date={row.getValue("created_at")} />
        ),
      },
    ],
    [t]
  );

  return (
    <Wrapper>
      <CustomHelmet title={"Users"} />
      <PageHeader>
        <MobileSidebarButton />
        <ContentTitle text={"Users"} />
      </PageHeader>
      <ContentBox>
        <ContentHeader>
          <SearchInputWithFields
            onChange={handleSearchChange}
            searchFields={[{ value: "email", label: t("email") }]}
            searchField={searchField}
            setSearchField={setSearchField}
          />

          <ExcelExportButton data={list || []} category="users" />
        </ContentHeader>
        <Show when={!isLoading}>
          {() => (
            <>
              <PaginationStatus data={pagination} />
              <DataTable
                columns={columns}
                data={list || []}
                sortField={sortField}
                sortOrder={sortOrder}
                setSortField={setSortField}
                setSortOrder={setSortOrder}
                renderRowActionsIn="start"
                renderRowActions={(user) => (
                  <DataTableCrudActions
                    openUpdateModal={() => {
                      setShowUpdateModal(true);
                      userRef.current = user;
                    }}
                  />
                )}
              />

              <Show when={pagination}>
                {(pagination) => (
                  <Pagination
                    totalCount={pagination.totalCount}
                    pageSize={pagination.pageSize}
                    page={page}
                    setPage={setPage}
                  />
                )}
              </Show>
            </>
          )}
        </Show>

        <TableSkeleton show={isLoading} cols={columns.length} rows={3} />
      </ContentBox>
      <UpdateUserDialog
        open={showUpdateModal}
        setOpen={setShowUpdateModal}
        data={userRef.current}
      />
    </Wrapper>
  );
};

export default Users;
