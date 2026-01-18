import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exhibitData, ExhibitData } from "@/data/exhibitData";
import { FileSpreadsheet } from "lucide-react";

interface ExhibitTableProps {
  exhibitKey: string;
  className?: string;
}

const ExhibitTable = ({ exhibitKey, className = "" }: ExhibitTableProps) => {
  const data = exhibitData[exhibitKey];
  
  if (!data) {
    return null;
  }

  return (
    <div className={`bg-white rounded-xl border border-border/50 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">{data.title}</h4>
            {data.subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{data.subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
              {data.columns.map((col) => (
                <TableHead 
                  key={col.key}
                  className={`font-semibold text-foreground text-xs uppercase tracking-wide py-3 px-4 ${
                    col.align === 'right' ? 'text-right' : 
                    col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.rows.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex}
                className="hover:bg-primary/5 transition-colors"
              >
                {data.columns.map((col, colIndex) => (
                  <TableCell 
                    key={col.key}
                    className={`py-3 px-4 text-sm ${
                      col.align === 'right' ? 'text-right font-mono' : 
                      col.align === 'center' ? 'text-center' : 'text-left'
                    } ${colIndex === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
                  >
                    {row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footnote */}
      {data.footnote && (
        <div className="px-5 py-3 bg-slate-50/50 border-t border-border/30">
          <p className="text-xs text-muted-foreground italic">
            <span className="font-medium not-italic">Note:</span> {data.footnote}
          </p>
        </div>
      )}
    </div>
  );
};

export default ExhibitTable;

// Helper to check if an exhibit has table data
export const hasExhibitTableData = (exhibitKey: string): boolean => {
  return exhibitKey in exhibitData;
};
