import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/lovable/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/lovable/table";
import { ScrollArea } from "@/components/lovable/scroll-area";
import { Badge } from "@/components/lovable/badge";

interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableModalProps {
  title: string;
  data: any[];
  columns: TableColumn[];
  triggerText: string;
  maxHeight?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TableModal({
  title,
  data,
  columns,
  triggerText,
  maxHeight = "400px",
  open,
  setOpen,
}: TableModalProps) {
  const getValue = (obj: any, key: string) => {
    const keys = key.split(".");
    let value = obj;
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
  };

  const renderCellValue = (value: any, column: TableColumn, row: any) => {
    if (column.render) {
      return column.render(value, row);
    }

    if (typeof value === "object" && value !== null) {
      return <Badge variant="secondary">[Object]</Badge>;
    }

    if (typeof value === "number") {
      return value.toFixed(2);
    }

    return String(value || "-");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="bg-slate-300 max-w-4xl max-h-[80vh]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <ScrollArea style={{ maxHeight }}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className="font-medium">
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => {
                  const value = getValue(row, column.key);
                  return (
                    <TableCell key={column.key}>
                      {renderCellValue(value, column, row)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </DialogContent>
  </Dialog>
  );
}