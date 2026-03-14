"use client";

import { useTranslation } from "react-i18next";
import type { Cuenta } from "@/app/types/cuenta.types";

interface SelectorCuentaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  cuentas: Cuenta[];
}

export default function SelectorCuenta({
  label,
  value,
  onChange,
  cuentas,
}: SelectorCuentaProps) {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>

      <select
        value={value}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        <option value="">{t("transfer.selectAccount")}</option>

        {cuentas.map((cuenta) => (
          <option key={cuenta.id} value={cuenta.id}>
            {cuenta.nombreTitular} - {cuenta.numeroCuenta}
          </option>
        ))}
      </select>
    </label>
  );
}