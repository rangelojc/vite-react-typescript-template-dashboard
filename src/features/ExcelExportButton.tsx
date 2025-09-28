// components/ExportButton.tsx
import config from "@/app.json";
import { Button } from "@/components/ui/button"; // assuming you're using shadcn/ui or similar
import moment from "moment";
import { FaRegFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";

interface ExcelExportButtonProps<T> {
  data: T[];
  category?: string;
}

const ExcelExportButton = <T,>({
  data,
  category,
}: ExcelExportButtonProps<T>) => {
  const exportToExcel = (data: T[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(
      workbook,
      `${config["export-file-prefix"]}-${category}-${moment().format(
        "YYYYMMDDHHmm"
      )}.xlsx`
    );
  };

  return (
    <Button
      variant={"default"}
      onClick={() => exportToExcel(data)}
      className="rounded ml-auto"
      size="sm"
    >
      <FaRegFileExcel />
      <span>Excel</span>
    </Button>
  );
};

export default ExcelExportButton;
