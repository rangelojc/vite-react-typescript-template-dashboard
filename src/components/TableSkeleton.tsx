import { Show } from "@/components/Show";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableSkeleton = ({
  show,
  cols = 3,
  rows = 3,
}: {
  show: boolean;
  cols?: number;
  rows?: number;
}) => {
  return (
    <Show when={show}>
      {() => (
        <Table className="pointer-events-none">
          <TableHeader>
            <TableRow>
              {Array.from({ length: cols }).map((_, idx) => (
                <TableHead key={idx} className="min-w-[150px]">
                  <Skeleton className="w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, idx) => (
              <TableRow key={idx}>
                {Array.from({ length: cols }).map((_, idx) => (
                  <TableCell key={idx}>
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Show>
  );
};

export default TableSkeleton;
